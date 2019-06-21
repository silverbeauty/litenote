const Note = require('../models/note');

const getAll = async(req, res) => {
    const data = await Note.find({});

    if (!data) {
      return res.status(401).json({
        status: false,
        error: 'Note doesn`t exist'
      })
    }
  
    res.send({
      status: true,
      data
    })
  }

  
const get = async(req, res) => {
  
  Note.findOne({_id: req.params.id}) .then(data => {
      res.send({
        status: true,
        data
      }) 
  })
  .catch(e => {
    return res.status(401).send({
      status: false,
      error: 'Note doesn`t exist'
    })
  });
}

const create = async(req, res) => {
    
  const note = new Note({
    ...req.body,
    updated_at: new Date(),
    created_at: new Date(),
  })
  
  note.save()
  .then(data => {
      res.send({
        status: true,
        data
      }) 
  })
  .catch(e => {
    return res.status(500).send({
      status: false,
      error: e
    })
  });
}

module.exports = {
    getAll,
    get,
    create,
}