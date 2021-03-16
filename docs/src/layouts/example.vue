<template>
    <div>
        <a-row>
          <Map
          :latLon="latLon"
          :zoom="zoom"
          :basemap="basemap"
          v-on:mapready="mapready"
          />
        </a-row>
        <a-row class="exampleContent">
          <slot name="content"></slot>
          <pre><code><slot name="code"></slot></code></pre>
        </a-row>
    </div>
</template>

<script>
import Map from '../Map.vue'

export default {
    name: 'ExampleLayout',
    props: ['latLon', 'zoom', 'basemap'],
    components: {
      Map
    },
    methods: {
      mapready (map) {
        this.$emit('mapready', map)
      }
    }
}

</script>

<style>
.exampleContent {
  padding-top: 30px;
}
</style>