<template>
    <div class="container-wrapper paddingbottom70">
    <div class="header">
      <div class="title">
        <input v-model="note.title" ref="title" disabled/>
      </div>
    </div>
    <div class="tab" v-show="note.has_tabs">
      <a class="tab-links"
              v-for="(tab, i) in note.tabs"   
              :key="i" 
              @click="switchTab(i)"
              >
              {{tab.title}}
      </a>
    </div>
    <vue-editor
      v-model="html_content"
      use-markdown-shortcuts
    >
    </vue-editor>
      <button class="circle-btn right-corner" @click="moveHomePage()">×</button>
    </div>
</template>

<script>
  export default {
    name: 'SearchPage',
    data () {
      return {
        note: this.content,
        html_content: ""
      }
    },
    props: {
        content: {
          default: {},
          type: Object
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
    mounted: function() {
      if(this.search_key != ""){
        if(this.note.has_tab){
          this.note.tabs[0].content = this.note.tabs[0].content.replace(new RegExp(this.search_key, 'gi'), (match) => {
              return '<span class="search-key">'+match+'</span>'})
          this.html_content = this.note.tabs[0].content
        }else{
          this.note.content = this.note.content.replace(new RegExp(this.search_key, 'gi'), (match) => {
              return '<span class="search-key">'+match+'</span>'})
            this.html_content = this.note.content
        }
        
      }
    },
    methods: {
      moveHomePage: function(){
        $('.curtain').removeClass('active')
        $('#quill-container').removeClass('open')
        setTimeout(()=>{
          const params = {'search': this.search_key}
          this.$router.push({ name: 'home', params: params });
        }, 300)
      },
    switchTab: function(index){
      this.selected_tab = index
      this.note.tabs[index].content = this.note.tabs[index].content.replace(new RegExp(this.search_key, 'gi'), (match) => {
              return '<span class="search-key">'+match+'</span>'})
      this.html_content = this.note.tabs[index].content
      $(".tab .tab-links").removeClass("active")
      document.querySelectorAll(".tab .tab-links")[this.selected_tab].classList.add("active")
    },
    }
  }
</script>

<style lang="scss">
#my-toolbar{
  white-space: nowrap;

    .icon{
      margin: 0px 2px;
    }
  }
  .ql-toolbar{
    display: none;
  }
  .search-bar{  
    display: flex;
    justify-content: space-around;
  }
  .search-key{
    background-color:#a7f0e0;
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