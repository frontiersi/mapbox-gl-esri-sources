<template>
    <Example v-on:mapready="mapready">
        <template v-slot:content>
            <h4>Tiled Map Service</h4>
        </template>
        <template v-slot:code>import {TiledMapService} from 'mapbox-gl-esri-sources'
            
const tiledSourceId = 'imagery-source'

const tiledSource = new TiledMapService(tiledSourceId, map, {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
})

map.addLayer({
    id: 'imagery-layer',
    type: 'raster',
    source: tiledSourceId
})</template>
    </Example>
</template>

<script>
import { TiledMapService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
    name: 'TiledMapServiceBasic',
    components: {
        Example
    },
    methods: {
        mapready (map) {
            new TiledMapService('imagery-source', map, {
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
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


