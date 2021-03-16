<template>
    <Example v-on:mapready="mapready">
        <template v-slot:content>
            <h4>Dynamic Map Service</h4>
        </template>
        <template v-slot:code>import {DynamicMapService} from 'mapbox-gl-esri-sources'
           
const dynamicSourceId = 'dynamic-source'

const esriOptions = {
    url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Administrative_Boundaries/MapServer',
    layers: [1]
}

const mapService = new DynamicMapService(dynamicSourceId, map, esriOptions)

map.addLayer({
    id: 'dynamic-layer',
    type: 'raster',
    source: dynamicSourceId
})</template>
    </Example>

</template>

<script>
import { DynamicMapService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
    name: 'DynamicMapServiceBasic',
    components: {
        Example
    },
    methods: {
        mapready (map) {
            new DynamicMapService('dynamic-source', map, {
                url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Administrative_Boundaries/MapServer',
                layers: [1]
            })

            map.addLayer({
                id: 'dynamic-layer',
                type: 'raster',
                source: 'dynamic-source'
            })
        }
    }
}

</script>


