<template>
    <Default>
        <template v-slot:content>
            <h2>Installation & Usage</h2>
            <p>This libary helps you create <code>sources</code> for use within mapbox-gl and maplibre-gl. It supports a range of raster and vector datasources provided by the Esri/ArcGIS ecosystem.</p>
            
            <br/>
            <h3>Using the NPM package</h3>
            <pre><code>npm install mapbox-gl-esri-sources</code></pre>

            <p>To create a layer source import the desired class from the package and use the new constructor, when you create the class your new <code>source</code> will be automatically added to the mapbox map.</p>
            <pre><code>import {TiledMapService} from 'mapbox-gl-esri-sources'

// Create the source
new TiledMapService('imagery-source', map, {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
})

// And then add it as a layer to your map
map.addLayer({
    id: 'imagery-layer',
    type: 'raster',
    source: 'imagery-source'
})</code></pre>


            <h3>Via a CDN</h3>
            <p>Load the package via a CDN service such as unpkg using a script tag in the head of your wpage.</p>
            <p><strong>eg</strong> src="https://unpkg.com/mapbox-gl-esri-sources/dist/mapbox-gl-esri-services"</p>
            <p>To create a layer source import the desired class from the package.</p>
            <pre><code>new mapboxglEsriSources.TiledMapService('imagery-source', map, {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
})

map.addLayer({
    id: 'imagery-layer',
    type: 'raster',
    source: 'imagery-source'
})</code></pre>

        </template>
    </Default>

</template>

<script>
import Default from './../layouts/default.vue'
export default {
    name: 'Installation',
    components: {
        Default
    }
}

</script>


