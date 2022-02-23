<template>
  <v-card class="overflow-hidden">
    <v-app-bar height="150"
      style="overflow: hidden;  position: fixed;"
      absolute
      color="rgb(65, 105, 225)"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    ><template>
      
    </template>
      <template v-slot:img="{ props }" >
        
        <v-img
          width="100%"
          height="100%"
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgb(255, 127, 81)"
        ></v-img>
      </template>
      
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-app-bar-title class="text-h5">
        PORTAL DE FACTURACIÓN RFV</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-6"  max-height="900">
    </v-sheet>
    
  </v-card>
</template>

<script>
</script>
