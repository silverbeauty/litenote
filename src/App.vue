<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  mounted: function() { 
    let notes = localStorage.getItem('notes')
    if(notes ==null){
      notes = []
      localStorage.setItem('notes', JSON.stringify(notes))
      } 
    },
}
</script>