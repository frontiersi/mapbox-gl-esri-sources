<template>
  <Default>
      <template v-slot:content>
          <h2>Image Service</h2>
          <p>For use when accessing <a href="https://developers.arcgis.com/rest/services-reference/image-service.htm">image services</a>.</p>
          <h3>Constructor</h3>
          <div v-html="constructorTable"></div>

          <br/><br/>

          <h4>Esri Service Options</h4>
          <div v-html="esriOptionsTable"></div>

          <br/><br/>

          <h3>Methods</h3>
          <div v-html="methodsTable"></div>
      </template>
  </Default>

</template>

<script>
import { Remarkable } from 'remarkable'
var md = new Remarkable()

import Default from '../../layouts/default.vue'
export default {
  name: 'ImageServiceAPI',
  computed: {
      constructorTable () {
          return md.render(`Argument | Type | Description
---------| ---- | -------------
id | string | An id to assign to the [Mapbox-gl source](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addsource) 
map | \`Map\` | A [Mapbox-gl map](https://docs.mapbox.com/mapbox-gl-js/api/map/) 
esriServiceOptions | object (see below) | A mandatory object containing options that will be passed when requesting the Esri Image Service
rasterSourceOptions | object | An optional object that will be passed to the creation of the Mapbox-gl [raster source object](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster). Useful if you have any specific requirements.`)
      },
      esriOptionsTable () {
          return md.render(`Option | Type | Default | Description
-------| ---- | --------| -----------
url | string | | **Required** URL of the Image Service.
fetchOptions | object | |  A key value pair of options to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) method as the init property. This can be used to pass through Authorisation headers where required.
format | string | jpgpng | Output format of the image
from | Date | | A start date for a time-enabled layer
to | Date | | An end date for a time-enabled layer
mosaicRule | object | | A json object for the [mosiac rule](https://developers.arcgis.com/documentation/common-data-types/mosaic-rules.htm)
renderingRule | object | | A json object for the [rendering rule based on a raster function](https://developers.arcgis.com/documentation/common-data-types/raster-function-objects.htm)
getAttributionFromService | boolean | true | Retrieves the copyrightText field from the esri service and adds it as an attribution to the map `)
      },
      methodsTable () {
          return md.render(`Method  | Description
------- | -----------
getMetadata() | Returns a promise which when resolved returns the service metadata as a json object.
identify(latLon,returnGeometry) | Returns a promise which when resolved returns the features as an esri-json object. By default the geometry is not returned.
setDate(<Date> from, <Date> to) | Redraws the layer with he passed time range.
setMosaicRule(<object>mosaicRule) | Sets the mosaic rule parameter and redraws the layer.
setRenderingRule(<object>renderingRule) | Sets the rendering rule parameter and redraws the layer.
setAttributionFromService() | Sets the attribution on the map from the service metadata. This happens automatically if the \`getAttributionFromService\` option is true.`)
      }
  },
  components: {
      Default
  }
}

</script>
