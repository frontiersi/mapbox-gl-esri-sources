<template>
  <a-row id="app">
      <a-col :span="6" id="sidebar">
        <a-row>
          <h2>mapbox-gl-esri-sources</h2>
        </a-row>
        <a-row>
            <Menu/>
        </a-row>
        <a-row id="logoHolder">
          <p>BUILT BY</p>
          <a href="https://frontiersi.com.au/" target="_blank"><img src="frontiersi-logo.png" class="logo"/></a>
        </a-row>
      </a-col>
      <a-col :span="18" id="contentArea">
        <router-view></router-view>
      </a-col>
  </a-row>
</template>

<script>
import Menu from './Menu.vue'
import Map from './Map.vue'

export default {
    name: 'App',
    components: {
      Menu,
      Map
    }
}

</script>

<style>

  html, body {
    height: 100%;
  }

  #app {
    background: white;
  }
 #contentArea {
   padding: 40px 60px;
   min-height: 100vh;
 }

#sidebar {
  padding: 40px 0px 40px 20px;
  background: #f7f7f7;
}

#sidebar .ant-menu {
  background: transparent;
}

#sidebar .ant-menu-inline {
  border-right: transparent;
}
 pre {
   padding: 20px;
   background: #fbfbfb;
   border: 4px solid #f1f1f1;
 }

h2, h3 {
   margin-top: 10px;
 }
#logoHolder {
  margin-top: 40px;
  font-weight: 700;
  font-size: 0.7rem;
  padding-left: 30px;
}
 .logo {
   width: 60%;
 }
</style>
