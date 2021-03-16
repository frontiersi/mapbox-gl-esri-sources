<template>
    <Example v-on:mapready="mapready">
        <template v-slot:content>
            <a-button type="primary" v-on:click="toggleFilter">{{btnText}}</a-button>
            <br/><br/>
            <h4>Using LayerDefs to filter features with a Dynamic Map Service</h4>
            <p>Display of a Dynamic Map Service can be filtered by attributes within the data but setting a where style query.</p>
            <p><strong>Note:</strong> The esri query syntax is very sensitive to single vs double quotation marks. Field names use single quotation marks, and values use double quotation marks for strings. For more information check out <a href="http://webhelp.esri.com/arcgisdesktop/9.3/index.cfm?TopicName=About_building_an_SQL_expression">this reference</a>.</p>
        </template>
        <template v-slot:code>import {DynamicMapService} from 'mapbox-gl-esri-sources'

const dynamicSourceId = 'dynamic-source'

const esriOptions = {
    url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Administrative_Boundaries/MapServer',
    layers: [1],
    layerDefs: {1: `"councilname"='LACHLAN SHIRE COUNCIL'`}
}

const mapService = new DynamicMapService(dynamicSourceId, map, esriOptions)

map.addLayer({
    id: 'dynamic-layer',
    type: 'raster',
    source: dynamicSourceId
})

// Sample function to clear an existing filter
function clearFilter () {
    mapService.setLayerDefs({})
}

// Sample function to set a new filter
function setFilter () {
    mapService.setLayerDefs({1: `"councilname"='LACHLAN SHIRE COUNCIL'`})
}
</template>
    </Example>

</template>

<script>
import { DynamicMapService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

export default {
    name: 'DynamicMapServiceLayerDefs',
    components: {
        Example
    },
    data () {
        return {
            filtered: true
        }
    },
    computed: {
        btnText () {
            return this.filtered ? 'Clear Filter' : 'Set Filter'
        }
    },
    methods: {
        toggleFilter () {
            if (this.filtered) {
                this.dynamicService.setLayerDefs({})
            } else {
                this.dynamicService.setLayerDefs({1: "councilname='LACHLAN SHIRE COUNCIL'"})
            }
            this.filtered = !this.filtered
        },
        mapready (map) {
            this.dynamicService = new DynamicMapService('dynamic-source', map, {
                url: 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Administrative_Boundaries/MapServer',
                layers: [1],
                layerDefs: {1: `"councilname"='LACHLAN SHIRE COUNCIL'`}
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


