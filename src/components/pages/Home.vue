<template>
  <div class="container-wrapper home-page">
    <div class="search-bar">
      <input type="text" class="search-input bg-lightGray" v-model="search_key" placeholder="Search" />
      <img src="images/icon-notebook.svg" class="notebook-icon">
    </div>
    <div class="note-container">
    <NoteItem v-for="(note, i) in notes" 
              :key="i" 
              :note="note"
              @click.native="moveEditPage(i)"
        />   
      </div>
  <div class="right-corner">   
    <button type="secondary" class="circle-btn bg-lightGreen" @click="moveAddPage()">+</button>
  </div>
  <div class="tab-bar bottom">   
    <img src="images/tab-home.svg" class="tabItem active" data-tab="home" />
    <img src="images/tab-today.svg" class="tabItem" data-tab="today" />
    <img src="images/tab-calendar.svg" class="tabItem" data-tab="calendar" />
    <img src="images/tab-stream.svg" class="tabItem" data-tab="stream" />
  </div>
  </div> 
</template>

<script>
  import Api from '../../api/api'
  import NoteItem from '../shared/NoteItem'

  export default {
    name: 'HomePage',
    components: {
      NoteItem,
    },
    mounted: function() { 
      Api.getNoteList().then((notes)=>{
        this.notes = notes;
      })
      this.mobileCheck()
    },
    beforeDestroy () {
        clearInterval(this.interval)
    },
    methods: {
      moveAddPage: function() {
        this.$router.push({ name: 'add' });
      },
      moveEditPage: function(key) {
        const content = this.notes[key]
       
        if(this.search_option == 0){
          this.$router.push({ name: 'edit', params: {'content': content} });
        }else{
          const search_key = this.search_key
          this.$router.push({ name: 'search', params: {'content': content, 'search_key': search_key} })
        }
      },
      mobileCheck: function(){
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        this.$store.state.note.is_mobile = check;
      }
    },
    watch: {      
        search_key: function(val, old) {
          if(this.search_option == 0){
            document.querySelectorAll(".note-item .note-title").forEach(element =>{
              if($(element).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                $(element).html( $(element).text().replace(new RegExp(val, 'g'), '<span style="text-decoration: underline">'+val+'</span>') )
               $(element.parentNode).addClass("searched")
                $(element.parentNode).removeClass("filtered")
              }else{
               $(element.parentNode).addClass("filtered")
               $(element.parentNode).removeClass("searched")
              }
            })
            $(".search-total").remove()
            $(".search-note").remove()
             if(val != ""){
            $(".container-wrapper").append(`<div class="search-note"><img src="images/icon-search.png"/><span>Search notes for "${val}"</span></div>`)
             $(".search-note").bind("click", ()=>{
              let total_found = 0
              this.search_option = 1
              $(".search-total").remove()
              $(".note-item").addClass("filtered")
              $(".note-item").removeClass("searched")
               document.querySelectorAll(".note-item .note-title").forEach(element =>{
                  $(element).html( $(element).text().replace(new RegExp(null, 'g'), '<span style="text-decoration: underline">'+val+'</span>') )
               })
              for(let i =0; i< document.querySelectorAll(".note-item").length; i ++){
                let note_item = document.querySelectorAll(".note-item")[i]
                for(let j =0; j< note_item.querySelectorAll("div").length; j++){
                  if($(note_item.querySelectorAll("div")[j]).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                    total_found +=1
                    $(note_item.querySelectorAll("div")[j].parentNode).removeClass("filtered")
                    $(note_item.querySelectorAll("div")[j].parentNode).addClass("searched")
                    break;
                  }
                }
              }
             $( `<p class="search-total">Searching... ${total_found} notes found</p>` ).insertAfter( $( ".search-bar" ) );
            })
          }
          }else{
              document.querySelectorAll(".note-item div").forEach(element =>{
              if($(element).text().toLowerCase().indexOf(val.toLowerCase())>-1){
               $(element.parentNode).addClass("searched")
                $(element.parentNode).removeClass("filtered")
              }else{
               $(element.parentNode).addClass("filtered")
               $(element.parentNode).removeClass("searched")
              }
            })
            $(".search-total").remove()
            $(".search-note").remove()
            if(val != ""){
                $(".container-wrapper").append(`<div class="search-note"><img src="images/icon-search.png"/><span>Search notes for "${val}"</span></div>`)
                $(".search-note").bind("click", ()=>{
                  this.search_option = 1
                  $(".note-item").addClass("filtered")
                  $(".note-item").removeClass("searched")
                  $(".search-total").remove()
                  for(let i =0; document.querySelectorAll(".note-item div").length; i ++){
                    if($(document.querySelectorAll(".note-item div")[i]).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                      $( document.querySelectorAll(".note-item div")[i].parentNode).removeClass("filtered")
                      $(document.querySelectorAll(".note-item div")[i].parentNode).addClass("searched")
                      break
                    }
                  }
                })
              }
            }
        }
    },
    data: () => ({
      notes: [],
      search_key: "",
      search_option: 0,
    })
  }
</script>
<style lang="scss">
  .home-page{
    padding: 15px;

    .note-container{
      margin-top: 15px;
      
      .note-item{
        background-color: white;
        min-height: 135px;

        .note-content{
          max-height: 90px;
          overflow: hidden;
        }
      }
    }
    .right-corner{
      bottom: 60px;
    }
    .note-title{
      font-size: 20px;
    }
  }
  .tab-bar.bottom{
    background-color: white;
    border-top: 1px solid #DFDFDF;
  }
  .tabItem{
    opacity: 0.2;
    zoom: 1.1;
  }
  .tabItem.active{
    opacity: 1;
  }
  .search-bar{  
    display: flex;
    justify-content: space-around;
  }
  .search-input{
    border: 0;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    width: calc(100% - 30px);

    img{
      margin-left: 5px;
    }
  }
  .search-input:focus{
    outline: none;
  }
  .notebook-icon{
    position: relative;
    opacity: 0.5;
  }
  .filtered{
    display: none;
  }
  .searched{
    display: block;

    h3.title{
      color: #7e7e7e;
    }
  }
  .search-note{
    display: flex;
    padding-top: 10px;
    cursor: pointer;

    img{
      width: 30px;
      margin-right: 15px;
    }
    span{
      color: #7e7e7e;
      font-size: 20px;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .search-total{
    text-align: center;
    margin: 7px;
    color: #7e7e7e;
  }
</style>
