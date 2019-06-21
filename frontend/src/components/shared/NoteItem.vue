<template>
  <li class="note-item">
    <h4 class="note-title">{{note.title}}</h4>
    <div class="note-content" v-html="note.content"></div>
  </li>  
</template>
<script>
  export default {
    name: 'NoteItem',
    data () {
      return {
      }
    },
    props: {
      note: {
       type: Object
     },
    },
  }
</script>
<style >

</style>