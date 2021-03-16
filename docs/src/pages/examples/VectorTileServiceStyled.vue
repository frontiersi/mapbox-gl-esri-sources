<template>
    <Example :latLon="[-118.7738, 34.0250]" :zoom="14" v-on:mapready="mapready">
        <template v-slot:content>
            <h4>Vector Tile Service</h4>
            <p>A vector tile service can provide a default style using the <code>.getStyle</code> method which makes it easier to construct the layer options. This requires the use a promise to retrieve the default style from the service.</p>
        </template>
        <template v-slot:code>import {VectorTileService} from 'mapbox-gl-esri-sources'

const vectorTileSourceId = 'vector-tile-service'

const vtService = new VectorTileService(vectorTileSourceId, map, {
    url: 'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer'
})

vtService.getStyle()
.then(() => {
    map.addLayer({
        id: 'vector-tile-layer',
        ...vtService.defaultStyle
    })          
})</template>
    </Example>
</template>

<script>
import { VectorTileService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
    name: 'VectorTileServiceStyled',
    components: {
        Example
    },
    methods: {
        mapready (map) {
            const vtService = new VectorTileService('vector-tile-source', map, {
                url: 'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer'
            })

            vtService.getStyle()
                .then(() => {
                    map.addLayer({
                        ...vtService.defaultStyle,
                        id: 'vector-tile-layer'
                    })          
                })
        }
    }
}
</script>


