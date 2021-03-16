<template>
    <Example :latLon="[-118.7738, 34.0250]" :zoom="14" v-on:mapready="mapready">
        <template v-slot:content>
            <h4>Vector Tile Service</h4>
            <p>You can simply retrieve Esri vector tiles and then setup the layer styling yourself, this does require a little more knowledge of the layers within the tiles and how you'd like to style them.</p>
        </template>
        <template v-slot:code>import {VectorTileService} from 'mapbox-gl-esri-sources'

const vectorTileSourceId = 'vector-tile-service'

const vtService = new VectorTileService(vectorTileSourceId, map, {
    url: 'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer'
})

map.addLayer({
    id: 'vector-tile-layer-unstyled',
    source: vectorTileSourceId,
    layout: {},
    paint: {
        'fill-color': "rgba(243,12,76,0.8)",
        'fill-outline-color': 'white'
    },
    'source-layer': "Santa_Monica_Mountains_Parcels",
    'type': "fill"
})</template>
    </Example>
</template>

<script>
import { VectorTileService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
    name: 'VectorTileServiceBasic',
    components: {
        Example
    },
    methods: {
        mapready (map) {
            new VectorTileService('vector-tile-source', map, {
                url: 'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer'
            })
            
            map.addLayer({
                id: 'vector-tile-layer-unstyled',
                layout: {},
                paint: {
                    'fill-color': 'rgba(243,12,76,0.8)',
                    'fill-outline-color': 'white'
                },
                'source-layer': 'Santa_Monica_Mountains_Parcels',
                source: 'vector-tile-source',
                type: 'fill',
            })

        }
    }
}
</script>


