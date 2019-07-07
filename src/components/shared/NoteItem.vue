<template>
  <li class="note-item">
    <h3 class="note-title">{{note.title}}</h3>
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
<style lang="scss">
.note-item{
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 5px;
  max-height: 100px;
  overflow-y: hidden;
  cursor: pointer;
  user-select: none;
}
</style>