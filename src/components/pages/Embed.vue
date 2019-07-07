<template>
  <div class="page-wrapper">
    <div class="curtain">
    </div>
    <div class="embed-page-container slide-effect">
    <div class="title">
        <h3>Link / Embed / Quote</h3>
    </div>
    <div class="search-bar">
      <input type="text" class="search-input bg-lightGray" v-model="search_key" placeholder="Search" />
      <img src="images/icon-notebook.svg" class="embedbook-icon">
    </div>
    <div class="embed-container">
    <EmbedItem v-for="(embed, i) in embed_items" 
              :key="i" 
              :embed="embed"
              @click.native="moveEditPage(i)"
        />   
      </div>
  <div class="right-corner">   
    <button type="secondary" class="circle-btn bg-lightGreen" @click="moveAddPage()">+</button>
  </div>
  <div class="tab-bar bottom">   
    <img src="images/tab-home.svg" class="tabItem active" data-tab="home" />
    <img src="images/tab-today.svg" class="tabItem" data-tab="today" />
    <img src="images/tab-calendar.svg" class="tabItem" data-tab="calendar" />
    <img src="images/tab-stream.svg" class="tabItem" data-tab="stream" />
  </div>
  </div> 
  </div>
</template>

<script>
  import Api from '../../api/api'
  import EmbedItem from '../shared/EmbedItem'

  export default {
    name: 'EmbedPage',
    components: {
      EmbedItem,
    },
    mounted: function() { 
     $('.curtain').addClass('active')
     $('.embed-page-container').addClass('open');
     
      Api.getEmbedList().then((embed)=>{
        this.embed_items = embed;
      })
    },
    beforeDestroy () {
        clearInterval(this.interval)
    },
    methods: {
      moveAddPage: function() {
        this.$router.push({ name: 'add' });
      },
      moveEditPage: function(key) {
        const content = this.embed_items[key]
        const index = this.embed_items[key]['index']
       
        if(this.search_option == 0){
          this.$router.push({ name: 'edit', params: {'content': content, 'index': index} });
        }else{
          const search_key = this.search_key
          this.$router.push({ name: 'search', params: {'content': content, 'search_key': search_key} })
        }
      },
    },
    watch: {      
        search_key: function(val, old) {
          if(this.search_option == 0){
            document.querySelectorAll(".embed-item .embed-title").forEach(element =>{
              if($(element).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                $(element).html( $(element).text().replace(new RegExp(val, 'g'), '<span style="text-decoration: underline">'+val+'</span>') )
               $(element.parentNode).addClass("searched")
                $(element.parentNode).removeClass("filtered")
              }else{
               $(element.parentNode).addClass("filtered")
               $(element.parentNode).removeClass("searched")
              }
            })
            $(".search-total").remove()
            $(".search-embed").remove()
             if(val != ""){
            $(".container-wrapper").append(`<div class="search-embed"><img src="images/icon-search.png"/><span>Search embeds for "${val}"</span></div>`)
             $(".search-embed").bind("click", ()=>{
              let total_found = 0
              this.search_option = 1
              $(".search-total").remove()
              $(".embed-item").addClass("filtered")
              $(".embed-item").removeClass("searched")
               document.querySelectorAll(".embed-item .embed-title").forEach(element =>{
                  $(element).html( $(element).text().replace(new RegExp(null, 'g'), '<span style="text-decoration: underline">'+val+'</span>') )
               })
              for(let i =0; i< document.querySelectorAll(".embed-item").length; i ++){
                let embed_item = document.querySelectorAll(".embed-item")[i]
                for(let j =0; j< embed_item.querySelectorAll("div").length; j++){
                  if($(embed_item.querySelectorAll("div")[j]).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                    total_found +=1
                    $(embed_item.querySelectorAll("div")[j].parentNode).removeClass("filtered")
                    $(embed_item.querySelectorAll("div")[j].parentNode).addClass("searched")
                    break;
                  }
                }
              }
             $( `<p class="search-total">Searching... ${total_found} embeds found</p>` ).insertAfter( $( ".search-bar" ) );
            })
          }
          }else{
              document.querySelectorAll(".embed-item div").forEach(element =>{
              if($(element).text().toLowerCase().indexOf(val.toLowerCase())>-1){
               $(element.parentNode).addClass("searched")
                $(element.parentNode).removeClass("filtered")
              }else{
               $(element.parentNode).addClass("filtered")
               $(element.parentNode).removeClass("searched")
              }
            })
            $(".search-total").remove()
            $(".search-embed").remove()
            if(val != ""){
                $(".container-wrapper").append(`<div class="search-embed"><img src="images/icon-search.png"/><span>Search embeds for "${val}"</span></div>`)
                $(".search-embed").bind("click", ()=>{
                  this.search_option = 1
                  $(".embed-item").addClass("filtered")
                  $(".embed-item").removeClass("searched")
                  $(".search-total").remove()
                  for(let i =0; document.querySelectorAll(".embed-item div").length; i ++){
                    if($(document.querySelectorAll(".embed-item div")[i]).text().toLowerCase().indexOf(val.toLowerCase())>-1){
                      $(document.querySelectorAll(".embed-item div")[i].parentNode).removeClass("filtered")
                      $(document.querySelectorAll(".embed-item div")[i].parentNode).addClass("searched")
                      break
                    }
                  }
                })
              }
            }
        }
    },
    data: () => ({
      embed_items: [],
      search_key: "",
      search_option: 0,
    })
  }
</script>
<style lang="scss">
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

  .embed-page-container{
    padding: 15px;

    .title{
        padding: 10px;

        h3{
            font-size: 20px;
            text-align: center;
        }
    }
    .embed-container{
      margin-top: 15px;
    }
    .right-corner{
      bottom: 60px;
    }
    .embed-title{
      font-size: 20px;
      color: #8e8e8e;
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
  .embedbook-icon{
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
  .search-embed{
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
