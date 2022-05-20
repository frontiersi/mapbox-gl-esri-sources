<template>
    <Default>
        <template v-slot:content>
            <h2>Tiled Map Service</h2>
            <p>For use when accessing <a href="https://developers.arcgis.com/rest/services-reference/map-service.htm">tiled map services</a>.</p>
            <p>To check if your service is tiled head to the MapServer url and check if "Single Fused Map Cache" is true, if false then you'll need to use a Dynamic Service.</p>
            <h3>Constructor</h3>
            <div v-html="constructorTable"></div>
            <br/><br/>
            <h4>Esri Service Options</h4>
            <div v-html="esriOptionsTable"></div>
        </template>
    </Default>

</template>

<script>
import { Remarkable } from 'remarkable'
var md = new Remarkable()

import Default from '../../layouts/default.vue'
export default {
    name: 'TiledMapServiceAPI',
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
url | string | | **Required** URL of the TiledMapService.
fetchOptions | object | |  A key value pair of options to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) method as the init property. This can be used to pass through Authorisation headers where required.
`)
        }
    },
    components: {
        Default
    }
}

</script>
