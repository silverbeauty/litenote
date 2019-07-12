<template>

  <div class="page-wrapper paddingbottom70">
    <div class="curtain">
    </div>
    <div class="add-page-container slide-effect">
    <div class="header">
      <div class="title">
        <input v-model="note.title" ref="title" autofocus/>
      </div>
      <div class="tab-bar">
        <div class="drop-down"  @click="dropToggle()" 
            v-click-outside="dropHidden">
          <div class="drop-down-link">
          </div>
          <ul class="drop-items" v-show="drop_menu">
              <li class="drop-item" @click="addTab()">Add</li>
              <li class="drop-item" @click="collapseTab()">Collapse</li>
              <li class="drop-item" @click="expandTab()">Expand</li>
              <li class="drop-item" @click="summary()">Summary</li>
              <li class="drop-item" @click="toggle()">Toggle</li>
            </ul>
        </div>
        <div class="info-bar">
          <img src="images/icon-ios.png" class="icon ios" />
        </div> 
      </div>
    </div>
    <div class="tab" v-show="note.has_tabs">
      <a class="tab-links"
              v-for="(tab, i) in note.tabs"   
              :key="i" 
              @click="switchTab(i)"
               v-longclick="() => renameTab(i)"
              >
              {{tab.title}}
      </a>
    </div>
    <vue-editor
      v-model="content"
      use-markdown-shortcuts
      :editor-options="editorOptions"
    >
      <div id="my-toolbar" slot="toolbar">
        <button class="ql-image"></button>
        <button class="ql-fav">
           <img src="images/icon-star.svg" class="icon" data-icon="favorite" />
        </button>
        <button class="ql-caps">
           <img src="images/icon-caps.svg" class="icon" data-icon="caps" />
        </button>
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="+1"></button>
        <button class="ql-highlight">
          <img src="images/icon-highlight.svg" class="icon" data="hightlight" />
        </button>
        <button class="ql-line">
          <img src="images/icon-line.svg" class="icon" data="line" />
        </button>
        <button class="ql-embed" @click="moveEmbedPage()">
           <img src="images/icon-embed.svg" class="icon" data="embed" />
        </button>
        <button class="ql-color color-red" value="#f4001e"></button>
        <button class="ql-color color-yellow" value="#f5bb23"></button>
        <button class="ql-color color-green" value="#50e3c2"></button>
      </div>
    </vue-editor>
    <button class="circle-btn right-corner" @click="moveHomePage()">×</button>
    </div>
  </div>
</template>
<script>
import Api from "../../api/api";
export default {
  name: 'AddPage',
  data() {
    return {
      editorOptions: {
        modules: {
          toolbar: "#my-toolbar"
        },
        
      },
      note: {
        content: "",
        title: "",
        has_tabs: false,
        tabs: []
      },
      content: "",
      selected_tab: 0,
      drop_menu: false
    };
  },


  async mounted(){
     $('.curtain').addClass('active')
     $('.add-page-container').addClass('open');
     this.$refs.title.focus();
     this.$store.state.note.note_id =  Api.addNote({
          title: "",
          content: ""
        })
  },


  methods: {
    handleTextChange(obj) {
      console.log("TCL: handleTextChange -> obj", obj);
    },

    moveHomePage: function(){
      $('.curtain').removeClass('active')
      $('.add-page-container').removeClass('open')
      const content = $(".ql-editor").html()
      if(this.note.has_tabs){
        this.note.tabs[this.selected_tab].content = content
        for(let i =0; i< this.note.tabs.length; i ++){
          this.note.content += this.note.tabs[i].title
          this.note.content += this.note.tabs[i].content
        }
      }else{
        this.note.content = content
      }
       if(this.note.title !=""){
        Api.updateNote(this.$store.state.note.note_id, this.note)
      }else{
        Api.removeNote(this.$store.state.note.note_id)
      }
      setTimeout(()=>{
        this.$router.push({ name: 'home' });
      }, 300)
    },

    moveEmbedPage: function(){
        this.html_content = ""
        $('.curtain').removeClass('active')
        $('#quill-container').removeClass('open')
        
        this.event.$emit('ops')
        this.$store.state.note.note = this.note
        setTimeout(()=>{
          this.$router.push({ name: 'embed' });
        }, 300)
    },

    addTab: function(){
      if(this.note.has_tabs == false){
        const content = $(".ql-editor").html()
        this.note.tabs.push({
          title: "untitled",
          content: content
        })
      }
      this.note.has_tabs = true
      this.note.tabs.push({
        title: "untitled",
        content: ""
      })
       this.selected_tab +=1
      this.content = ""
      setTimeout(()=>{
         $(".tab .tab-links").removeClass("active")
        document.querySelectorAll(".tab .tab-links")[this.selected_tab].classList.add("active")
      }, 10)
    },

    switchTab: function(index){
      const content = $(".ql-editor").html()
      this.note.tabs[this.selected_tab].content = content
      this.selected_tab = index
      this.content = this.note.tabs[index].content
      $(".tab .tab-links").removeClass("active")
      this.drop_menu = false
      document.querySelectorAll(".tab .tab-links")[this.selected_tab].classList.add("active")
    },

    renameTab: function(index){
      const content = $(".ql-editor").html()
      this.note.tabs[this.selected_tab].content = content
      this.selected_tab = index
      $(".tab .tab-links").removeClass("active")
      this.drop_menu = false
      document.querySelectorAll(".tab .tab-links")[this.selected_tab].classList.add("active")
      document.querySelectorAll(".tab-links")[index].setAttribute("contenteditable",  "true")

      $( ".tab-links" ).bind( "blur", (e)=>{
         e.preventDefault()
         this.note.tabs[this.selected_tab].title = e.currentTarget.innerText
         $(".tab-links" ).removeAttr("contenteditable")
       })
    },
    collapseTab: function(){
      this.drop_menu = false
    },
    expandTab: function(){
      this.drop_menu = false
    },
    summary: function(){
      this.drop_menu = false
    },
    toggle: function(){
      this.drop_menu = false
    },
    dropToggle: function(){
      this.drop_menu = !this.drop_menu
    },
    dropHidden: function(){
      this.drop_menu = false
    }
  }
};
</script>

<style lang="scss">
.header{
  display: flex;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 8px 8px 0px 0px;
}
.slide-effect{
    height: calc(100% - 12px);
    width: 100%;
    position: fixed;
    bottom: -100%;
    left: 0px;
    background-color: white;
    border-radius: 10px 10px 0 0;
    -webkit-transition: all 0.3s;
}
.slide-effect.open{
    bottom: 0%;
    left: 0px;
}
.curtain {
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: all 0.3s;
}
.curtain.active {
    background-color: rgba(0, 0, 0, 0.7);
    -webkit-transition: all 0.3s;
}

.title{
  input{
    padding-left: 25px;
    padding-top: 10px;
    font-size: 20px!important;
    font-weight: 500;
  }

  input:focus{
    outline: none;
  }
}

#my-toolbar{
  white-space: nowrap;

  .icon{
    margin: 0px 2px;
  }
}
.tab-bar{
  position: absolute;
  display: flex;
  right: 10px;

  .drop-down{
    position: relative;
    z-index: 3;
    right: 10px;
    top: 10px;

    .info-bar{
      height: 30px;
      margin-top: 5px;
    }

    .drop-down-link{
      width: 35px;
      display: block;
      height: 10px;
      margin: auto;
      background-image: url('../../../public/images/icon-dots.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .drop-item{
        list-style: none;
        font-size: 13px;
        width: 50px;
        cursor: pointer;
       user-select: none;
      }
  }

  .ios{
    margin-top: 5px;
    width: 20px;
    height: 15px;
  }
}
.drop-items{
  background: white;
  padding: 10px;
  box-shadow: 0px 0px 2px grey;
  border-radius: 5px;
  position: absolute;
}
.tab{
  display: flex;
  height: 37px;
  overflow-x: auto;
  border: 1px solid #eeeeee;

  .tab-links{
    display: block;
    flex: 1;
    min-width: 150px;
    height: 100%;
    background-color: #f2f2f2;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #b9b9b9;
  }
  .tab-links.active{
    background-color: white;
    color: #4f4f4f;
  }
}
</style>
