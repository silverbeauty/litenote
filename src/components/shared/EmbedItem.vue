<template>
  <li class="embed-item">
    <div class="embed-header">
    <h3 class="embed-title">{{embed.title}}</h3>
    <div class="embed-icons">
      <img src="images/icon-quote.png" class="icon icon-quote" width="14px" data-icon="quote"  @click="moveQuotePage(note)"/>
      <img src="images/icon-link.png" class="icon icon-link" width="15px" data-icon="link"/>
      <img src="images/icon-embed.svg" class="icon icon-embed" width="30px" data-icon="embed"/>
    </div>
    </div>
    <div class="embed-content" v-html="embed.content"></div>
  </li>  
</template>
<script>
  export default {
    name: 'EmbedItem',
    data () {
      return {
         note: this.embed,
      }
    },
    props: {
      embed: {
       type: Object
      },
      moveQuotePage: { 
        type: Function 
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

  .embed-header{
    display: flex;
    justify-content: space-between;

    .embed-icons{
      display: flex;

      img{
        display: block;
        width: 15px;
        margin-top: auto;
        margin-bottom: auto;
      }
      .icon-quote{
          width: 14px; 
          height: 14px;
          margin-right: 10px;
      }
      .icon-link{
        height: 16px;
      }
      .icon-embed{
        width: 26px;
      }
    }
  }

  .embed-content{
    display: none;
  }
}
</style>