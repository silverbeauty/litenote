<template>
    <div class="container-wrapper paddingbottom70">
    <vue-editor
      v-model="note.content"
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
      }
    },
    props: {
        content: {
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

    mounted: function() {
      if(this.search_key != ""){
        this.note.content = $(".ql-editor").html().replace(new RegExp(this.search_key, 'i'), '<span class="search-key">'+this.search_key+'</span>')
      }
    },

    methods: {
        moveHomePage: function(){
        $('.curtain').removeClass('active')
        $('#quill-container').removeClass('open')
        setTimeout(()=>{
            this.$router.push({ name: 'home' });
        }, 300)
        }
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
</style>