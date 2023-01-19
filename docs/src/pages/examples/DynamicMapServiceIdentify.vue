<template>
    <Example v-on:mapready="mapready">
        <template v-slot:content>
            <h4>Identifying features from a Dynamic Map Service</h4>
            <p>You can use the <code>.identify</code> method to retrieve information for a lat-lon.</p>
            <p>The returned data is in the esri-json format which, if required, can be converted to GeoJSON using the <a href="https://www.npmjs.com/package/@terraformer/arcgis">@terraformer/arcgis package</a>.</p>
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
})

map.on('click', function (e) {
    mapService.identify(e.lngLat)
    .then(json => {
        if (json.results.length === 0) return
        const r = json.results[0]
        new Popup()
            .setLngLat(e.lngLat)
            .setHTML(r.attributes.councilname)
            .addTo(map)
    })
})
</template>
    </Example>

</template>

<script>
import { DynamicMapService } from '../../../../src/main'
import { Popup } from 'maplibre-gl'

import Example from '../../layouts/example.vue'

export default {
    name: 'DynamicMapServiceIdentify',
    components: {
        Example
    },
    methods: {
        mapready (map) {
            const mapService = new DynamicMapService('dynamic-source', map, {
                url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Administrative_Boundaries/MapServer',
                layers: [1]
            })

            map.addLayer({
                id: 'dynamic-layer',
                type: 'raster',
                source: 'dynamic-source'
            })

            map.on('click', function (e) {
                mapService.identify(e.lngLat)
                .then(json => {
                    if (json.results.length === 0) return
                    const r = json.results[0]
                    new Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(r.attributes.councilname)
                    .addTo(map)
                })
            })
        }
    }
}

</script>


