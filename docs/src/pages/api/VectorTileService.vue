<template>
    <Default>
        <template v-slot:content>
            <h2>Vector Tile Service</h2>
            <p>For use when accessing <a href="https://developers.arcgis.com/rest/services-reference/vector-tile-service.htm">Esri Vector Tile services</a>.</p>
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
    name: 'VectorTileServiceAPI',
    computed: {
        constructorTable () {
            return md.render(`Argument | Type | Description
---------| ---- | -------------
id | string | An id to assign to the [Mapbox-gl source](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addsource) 
map | \`Map\` | A [Mapbox-gl map](https://docs.mapbox.com/mapbox-gl-js/api/map/) 
esriServiceOptions | object (see below) | A mandatory object containing options that will be passed when requesting the Esri MapService
vectorSrcOptions | object | An optional object that will be passed to the creation of the Mapbox-gl [vector source object](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector). Useful if you have any specific requirements.`)
        },
        esriOptionsTable () {
            return md.render(`Option | Type | Default | Description
-------| ---- | --------| -----------
url | string | | **Required** URL of the VectorTileService.`)
        }
    },
    components: {
        Default
    }
}

</script>


