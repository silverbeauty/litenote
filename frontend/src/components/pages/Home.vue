<template>
  <div class="mobile-container">
   <NoteItem v-for="(note, i) in notes" 
            :key="i" 
            :note="note"
      />   
  <div class="col text-right">   
    <button type="secondary" @click="moveCartPage()">Add</button>
  </div>
  </div> 
</template>

<script>
  import Api from '../../api/api'
  import NoteItem from '../shared/NoteItem'

  export default {
    name: 'Home',
    components: {
      NoteItem,
    },

    mounted: function() {
      // Get Merchant data from API.
      Api.getNoteList().then((data) => {
        console.log('response:', data);
         this.notes = data;
      }).catch((error) => {
        console.log("error: ", error);
      })
    },
    beforeDestroy () {
        clearInterval(this.interval)
    },
    methods: {
      moveCartPage: function() {
        this.$router.push({ name: 'add' });
      }
    },
    watch: {
    },
    data: () => ({
      notes: []
    })
  }
</script>
<style lang="scss">

</style>
