<template>
    <Default>
        <template v-slot:content>
            <h2>Dynamic Map Service</h2>
            <p>For use when accessing <a href="https://developers.arcgis.com/rest/services-reference/map-service.htm">dynamic map services</a>.</p>
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
    name: 'DynamicMapServiceAPI',
    computed: {
        constructorTable () {
            return md.render(`Argument | Type | Description
---------| ---- | -------------
id | string | An id to assign to the [Mapbox-gl source](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addsource) 
map | \`Map\` | A [Mapbox-gl map](https://docs.mapbox.com/mapbox-gl-js/api/map/) 
esriServiceOptions | object (see below) | A mandatory object containing options that will be passed when requesting the Esri MapService
rasterSourceOptions | object | An optional object that will be passed to the creation of the Mapbox-gl [raster source object](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster). Useful if you have any specific requirements.`)
        },
        esriOptionsTable () {
            return md.render(`Option | Type | Default | Description
-------| ---- | --------| -----------
url | string | | **Required** URL of the MapService. **Note** Map Service urls do not end in a number (use the layers option below).
fetchOptions | object | |  A key value pair of options to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) method as the init property.
layers | array<string> | | An array of layer id's to restrict which layers to show from the service (eg [1, 2, 3]).
format | string | png24 | Output format of the image
transparent | boolean | true | Allow the server to produce transparent images
layerDefs | object | | SQL filters to define what features will be included in the image rendered by the service. An object is used with keys that map each query to its respective layer. eg \`{ 3: "STATE_NAME='Kansas'", 9: "POP2007>25000" }\`
from | Date | | A start date for a time-enabled layer
to | Date | | An end date for a time-enabled layer
getAttributionFromService | boolean | true | Retrieves the copyrightText field from the esri service and adds it as an attribution to the map `)
        },
        methodsTable () {
            return md.render(`Method  | Description
------- | -----------
getMetadata() | Returns a promise which when resolved returns the service metadata as a json object.
identify(latLon,returnGeometry) | Returns a promise which when resolved returns the features as an esri-json object. By default the geometry is not returned.
setLayerDefs(obj) | Redraws the layer with the new layer definitions. Corresponds to the option above on the Esri Service Options.
setLayers(array<string>) | Redraws the layer to show the passed array of layer ids.
setDate(<Date> from, <Date> to) | Redraws the layer with he passed time range.
setAttributionFromService() | Sets the attribution on the map from the service metadata. This happens automatically if the \`getAttributionFromService\` option is true.`)
        }
    },
    components: {
        Default
    }
}

</script>
