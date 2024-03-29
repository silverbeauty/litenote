import { API_URL } from '../config/config'
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCaGIG-nz4RrM-J0lwJT02VSXxa_iCe5y0",
  authDomain: "litenote-75f9e.firebaseapp.com",
  databaseURL: "https://litenote-75f9e.firebaseio.com",
  projectId: "litenote-75f9e",
  storageBucket: "litenote-75f9e.appspot.com",
  messagingSenderId: "685400408161",
  appId: "1:685400408161:web:b2bc64954c84c4d9"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})

firebase.firestore().enablePersistence()
  .catch(function(err) {
    console.log('err', err)
      if (err.code == 'failed-precondition') {
      } else if (err.code == 'unimplemented') {
      }
  })
firebase.firestore().disableNetwork().then()

const Api = {

  install (Vue, options) {
    this.store = 1
  },
  
  getNote (index) {
    firebase.firestore().disableNetwork()
    let db = firebase.firestore();
    return new Promise((resolve, reject) =>{
      db.collection("notes").doc(index).get().then(function(snapshot){
        const note = snapshot.data()
        note['index'] = snapshot.id
        resolve(note)      
      })
    })
  },

  getNoteList () {
    let db = firebase.firestore();
    let data = []
    return new Promise((resolve, reject) =>{
      db.collection("notes").orderBy('updated_at', 'desc')
      .get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
          const note = doc.data()
          note['index'] = doc.id
          data.push(note);
        });
        resolve(data)
      })
    })
  },

  updateNote (index, data){
    let db = firebase.firestore();
    db.collection("notes").doc(index).update({
      ...data,
      updated_at: new Date()
    });
  },

  addNote (data) {
    let db = firebase.firestore();
    let newCityRef = db.collection("notes").doc();
    let id = newCityRef.id;
    newCityRef.set(data);
    return id;
  },

  removeNote(index){
    let db = firebase.firestore();
    db.collection("cities").doc(index).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  },

  getEmbedList(){
    let db = firebase.firestore();
    let data = []
    return new Promise((resolve, reject) =>{
      db.collection("embed").orderBy('created_at', 'desc')
      .get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
          const note = doc.data()
          note['index'] = doc.id
          data.push(note);
        });
        resolve(data)
      })
    })
  },

  createEmbed(title, note_id){
    let db = firebase.firestore();
    let embedRef = db.collection("embed").doc();
    let embedId = embedRef.id;

    embedRef.set({
        title: title,
        note_id: note_id,
        created_at: new Date()
    });

    db.collection("notes").where("title", "==", title).get().then(function(snapshot) {
      if (snapshot.docs.length > 0) {
        let references = snapshot.docs[0].data().references
        references.push({
          type: 'embed',
          ref: embedId
        })
        
        db.collection("notes").doc(snapshot.docs[0].id).update({
          content: snapshot.docs[0].data().content + `<div class="embed-ref" emb-ref="${embedId}"></div>`,
          references: references,
          updated_at: new Date()
        });
      } else{
        db.collection("notes").add({
          content: `<div class="embed-ref" emb-ref="${embedId}"></div>`,
          title: title,
          references: [{
            type: 'embed',
            ref: embedId
          }],
          created_at: new Date(),
          updated_at: new Date()
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
          console.error("Error adding document: ", error);
        });
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });  
    return embedId;
  },

  updateEmbed(index, content) {
    let db = firebase.firestore();
    db.collection("embed").doc(index).update({
      content: content
    });
  },

  getEmbed (index) {
    firebase.firestore().disableNetwork()
    let db = firebase.firestore();
    return new Promise((resolve, reject) =>{
      db.collection("embed").doc(index).get().then(function(snapshot){
        resolve(snapshot.data())      
      })
    })
  },

  _url (path) {
    return `${API_URL}/${path}`
  },

  _headers () {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },

  _responseData (response, transformer) {
    let data = response.data

    if (transformer !== undefined) {
      data = transformer(data)
    }

    return Promise.resolve(data)
  },

  _responseError (error) {
    let e = new Error()
    e.errors = error.response.errors

    return Promise.reject(e)
  }

}

export default Api
