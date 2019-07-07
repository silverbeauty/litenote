<template>
  <li class="embed-item">
    <h3 class="embed-title">{{embed.title}}</h3>
    <div class="embed-content" v-html="embed.content"></div>
  </li>  
</template>
<script>
  export default {
    name: 'EmbedItem',
    data () {
      return {
      }
    },
    props: {
      embed: {
       type: Object
     },
    }
  }
</script>
<style lang="scss">
.embed-item{
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 5px;
  max-height: 100px;
  overflow-y: hidden;
  cursor: pointer;
  user-select: none;

  .embed-content{
    display: none;
  }
}
</style>