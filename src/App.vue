<template >
  <v-app >
    <v-main>
        <!-- <app-navbar/> -->
        <router-view />
    </v-main>
  </v-app>
</template>

<script>

  // import navbar from '../src/components/navbar.vue'

export default {
  name: "App",
  data (){
    return{
    } 
  },
  // components:{
  //   'app-navbar':navbar,
  // }
};
</script>
