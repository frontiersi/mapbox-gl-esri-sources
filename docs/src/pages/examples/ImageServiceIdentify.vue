<template>
  <Example :latLon="[-100, 40]" :zoom="3" v-on:mapready="mapready">
      <template v-slot:content>
          <h4>Identifying features from a Image Map Service</h4>
          <p>You can use the <code>.identify</code> method to retrieve information for a lat-lon.</p>
      </template>
      <template v-slot:code>import {ImageMapService} from 'mapbox-gl-esri-sources'

const imageService = new ImageMapService('image-source', map, {
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer',
})

map.addLayer({
    id: 'image-layer',
    type: 'raster',
    source: 'image-source'
})

map.on('click', function (e) {
  imageService.identify(e.lngLat)
  .then(json => {
    if (!json.value) return
    const content = `Pixel Value: ${json.value}`
    new Popup()
    .setLngLat(e.lngLat)
    .setHTML(content)
    .addTo(map)
  })
})
</template>
  </Example>

</template>

<script>
import { ImageService } from '../../../../src/main'
import { Popup } from 'maplibre-gl'

import Example from '../../layouts/example.vue'

export default {
  name: 'ImageMapServiceIdentify',
  components: {
      Example
  },
  methods: {
      mapready (map) {
          const imageService = new ImageService('image-source', map, {
              url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer',
          })

          map.addLayer({
              id: 'image-layer',
              type: 'raster',
              source: 'image-source'
          })

          map.on('click', function (e) {
            imageService.identify(e.lngLat)
              .then(json => {
                  if (!json.value) return
                  const content = `Pixel Value: ${json.value}`
                  new Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(content)
                  .addTo(map)
              })
          })
      }
  }
}

</script>


