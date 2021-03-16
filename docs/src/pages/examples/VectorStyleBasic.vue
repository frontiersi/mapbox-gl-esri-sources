<template>
    <Example :basemap="basemap">
        <template v-slot:content>
            <h4>Vector Basemap Style</h4>
            <p>Using the ArcGIS:Topographic basemap style</p>
        </template>
        <template v-slot:code>import {VectorBasemapStyle} from 'mapbox-gl-esri-sources'

const basemap = new VectorBasemapStyle('ArcGIS:Topographic', '...some-api-key...')

const map = new Map({
    container: 'map',
    style: basemap.styleUrl,
    center: [147.17507620575037, -32.617356560963294],
})</template>
    </Example>
</template>

<script>
import { VectorBasemapStyle } from '../../../../src/main'

import Example from '../../layouts/example.vue'

export default {
    name: 'TiledMapServiceBasic',
    components: {
        Example
    },
    data () {
        return {
            basemap: ''
        }
    },
    created () {
      const basemap = new VectorBasemapStyle('ArcGIS:Topographic', 'AAPK5ffb50e21eb74c30906de50313840551EAPWpjYMBjYejuCCP1meweljfWKCnhoaJ38J0Yifqn6oQ7ZOPpUfW6QIKmR5vNDR')
      this.basemap = basemap.styleUrl
    }
}
</script>


