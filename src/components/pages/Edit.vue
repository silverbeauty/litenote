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
        <div class="drop-down">
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
        <button class="ql-link"></button>
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
        html_content: ""
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
      content: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.content = newVal
        }
      },
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
      moveHomePage: async function(){
          $('.curtain').removeClass('active')
          $('#quill-container').removeClass('open')
          const index = this.index
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
.header{
  display: flex;
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
    padding-left: 20px;
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
  right: 0px;

  .drop-down{
    position: relative;
    z-index: 3;
    right: 10px;
    top: 10px;

    .drop-down-link{
      width: 35px;
      display: block;
      height: 10px;
      margin: auto 12px;
      background-image: url('../../../public/images/icon-dots.png');
      background-size: cover;
      background-repeat: no-repeat;
    }

    .drop-item{
        list-style: none;
        font-size: 13px;
        width: 50px;
      }
  }

  .ios{
    width: 20px;
    height: 20px;
  }
}
</style>
