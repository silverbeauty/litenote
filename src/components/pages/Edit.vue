<template>

  <div class="page-wrapper paddingbottom70">
    <div class="curtain">
    </div>
    <div class="add-page-container slide-effect">
    <div class="header">
      <div class="title">
        <input v-model="note.title"/>
      </div>
      <div class="tab-bar">
        <div class="drop-down" v-show="drop_menu">
          <div class="drop-down-link">
          </div>
          <ul class="drop-items">
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
      v-model="html_content"
      use-markdown-shortcuts
      :editor-options="editorOptions"
      :updateContent="updateContent"
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
    name: 'EditPage',
    data () {
      return {
         editorOptions: {
            modules: {
            toolbar: "#my-toolbar"
            }
        },
        note: this.content,
        ref_id: this.index,
        html_content: "",
        selected_tab: 0,
        drop_menu: false
      }
    },  
    props: {
        content: {
          default: {},
          type: Object
        },
        index: {
            default: "",
            type: String
        },
        search_key: {
          default: "",
          type: String
        }
    },
    watch: {
      note: function (newVal) {
        this.$emit('input', newVal)
      },
      ref_id: function(newVal) {
        this.$emit('input', newVal)
      },
      content: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.content = newVal
        }
      },
      index: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.index = newVal
        }
      }
    },
    async mounted(){
     $('.curtain').addClass('active')
     $('.add-page-container').addClass('open')
    
     if(typeof this.note.references !='undefined'){ 
      for(let i =0; i<this.note.references.length; i ++){
          if(this.note.references[i].type = 'embed'){ 
            const embed = await Api.getEmbed(this.note.references[i].ref)
            this.note.content = this.note.content.replace(new RegExp(`<div class="embed-ref" emb-ref="${this.note.references[i].ref}"></div>`), 
                `${embed.content}`) 
          }
        }
     }
     this.html_content = this.note.content
    },
    methods: {
      updateContent(data) {
        this.note = data.content
        this.ref_id = data.index
        this.html_content = data.content.content  
      },
      moveHomePage: async function(){
          $('.curtain').removeClass('active')
          $('#quill-container').removeClass('open')
          const index = this.ref_id
          let content = $(".ql-editor").html()
          if(typeof this.note.references !='undefined'){
            for(let i =0; i<this.note.references.length; i ++){
              if(this.note.references[i].type = 'embed'){
              const embed = await Api.getEmbed(this.note.references[i].ref)
              content = content.replace(new RegExp(embed.content), `<div class="embed-ref" emb-ref="${this.note.references[i].ref}"></div>`) 
            }
           }
          }
          this.note.content = content
          Api.updateNote(index, this.note)
          setTimeout(()=>{
            this.$router.push({ name: 'home' });
          }, 300)
      },

      moveEmbedPage: function(){
        this.html_content = ""
        $('.curtain').removeClass('active')
        $('#quill-container').removeClass('open')
        setTimeout(()=>{
          this.$router.push({ name: 'embed' });
        }, 300)
      },

      addTab: function(){
          this.note.has_tabs = true
          this.note.tabs.push({
            title: "untitled",
            content: ""
          })
        },
      switchTab: function(index){
        const content = $(".ql-editor").html()
        this.note.tabs[this.selected_tab].content = content
        this.selected_tab = index
        this.content = this.note.tabs[index].content
      },
      renameTab: function(index){
        document.querySelectorAll(".tab-links")[index].setAttribute("contenteditable",  "true");
        $( ".tab-links" ).bind( "blur", (e)=>{
          this.note.tabs[index].title = e.currentTarget.innerText
          $(".tab-links" ).removeAttr("contenteditable")
        })
      },
      collapseTab: function(){

      },
      expandTab: function(){

      },
      summary: function(){

      },
      toggle: function(){

      }
    }
  }
</script>

<style lang="scss">
  .home-page{
    padding: 15px;

    .note-container{
      margin-top: 15px;
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
