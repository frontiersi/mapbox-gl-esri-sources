<template>
  <Example :latLon="[-100, 40]" :zoom="3" v-on:mapready="mapready">
      <template v-slot:content>
          <h4>Image Map Service</h4>
      </template>
      <template v-slot:code>import {ImageService} from 'mapbox-gl-esri-sources'
          
const imageSourceId = 'imagery-source'

const imageService = new ImageService(imageSourceId, map, {
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer'
})

map.addLayer({
  id: 'imagery-layer',
  type: 'raster',
  source: imageSourceId
})</template>
  </Example>
</template>

<script>
import { ImageService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
  name: 'ImageServiceBasic',
  components: {
      Example
  },
  methods: {
      mapready (map) {
          new ImageService('imagery-source', map, {
              url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer'
          })
      
          map.addLayer({
              id: 'imagery-layer',
              type: 'raster',
              source: 'imagery-source'
          })
      }
  }
}
</script>


