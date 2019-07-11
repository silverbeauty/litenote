<template>
    <div class="container-wrapper paddingbottom70">
    <vue-editor
      v-model="note.content"
      use-markdown-shortcuts
      quote="quote"
      :selectQuote="selectQuote"
    >
    </vue-editor>
    </div>
</template>

<script>
  export default {
    name: 'QuotePage',
    data () {
      return {
        note: this.content,
      }
    },
    props: {
        content: {
          default: {},
          type: Object
        },
        quote: {
          default: true,
          type: Boolean
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

    methods: {
        selectQuote: function(selected_content){
            $('.curtain').removeClass('active')
            $('#quill-container').removeClass('open')


            setTimeout(()=>{
              const params = {'content': this.$store.state.note.note, 'selected_content': selected_content }
              this.$router.push({ name: 'edit' , params: params});
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