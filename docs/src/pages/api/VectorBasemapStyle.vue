<template>
    <Default>
        <template v-slot:content>
            <h2>Tiled Map Service</h2>
            <p>Esri has a range of Vector Basemap styles available. These require the use of an api key, head to <a href="https://developers.arcgis.com">https://developers.arcgis.com</a> to get a key on the free tier.</p>
            <h3>Constructor</h3>
            <div v-html="constructorTable"></div>
        </template>
    </Default>

</template>

<script>
import { Remarkable } from 'remarkable'
var md = new Remarkable()

import Default from '../../layouts/default.vue'
export default {
    name: 'VectorBasemapStyleAPI',
    computed: {
        constructorTable () {
            return md.render(`Argument | Type | Description
---------| ---- | -------------
styleName | string | The name of an Esri Style. Try 'ArcGIS:Streets', 'ArcGIS:LightGray', 'ArcGIS:DarkGray', 'ArcGIS:ColoredPencil', 'ArcGIS:ModernAntique', 'ArcGIS:Newspaper', 'ArcGIS:Nova', 'ArcGIS:Terrain', 'ArcGIS:Topographic'
apikey | string | A valid Esri API key`)
        }
    },
    components: {
        Default
    }
}

</script>


