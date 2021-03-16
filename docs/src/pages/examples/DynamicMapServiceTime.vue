<template>
    <Example :latLon="[-35, 25]" :zoom="2" v-on:mapready="mapready">
        <template v-slot:content>
            Date's shown: {{dateMin}} - {{dateMax}}
            <a-slider id="test" @change="dateChanged" :min="min" :max="max" :step="oneDay" :tipFormatter="formatDate"/>
            <br/><br/>

            <h4>Using time on a Dynamic Map Service</h4>
            <p>For a time-enabled Dynamic Map Service you can adjust the dates shown using the setDate method.</p>
            <p>Information on the date range available can also be retrieved using the getMetadata method.</p>

        </template>
        <template v-slot:code>import {DynamicMapService} from 'mapbox-gl-esri-sources'

const dynamicSourceId = 'dynamic-source-time'

const esriOptions = {
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer',
    layers: [0],
    from: 965354400000, // Accepts a unix timestamp or a js date
    to: 965959200000    // Accepts a unix timestamp or a js date
}

const mapServiceTime = new DynamicMapService(dynamicSourceId, map, esriOptions)

map.addLayer({
    id: 'dynamic-layer',
    type: 'raster',
    source: dynamicSourceId
})

// Sample function for getting time info from the service metadata
function getTimeInfoFromService () {
    mapServiceTime.getMetadata()
    .then(metadata => {
        console.log(metadata.timeInfo)
    })
}

// Sample function for adjusting the dates displayed on the map
function changeDate (newDateAsUnixString)
    const date = new Date(newDateAsUnixString)
    const oneWeekLater = new Date(date.getTime())
    oneWeekLater.setDate(date.getDate() + 7)
    mapServiceTime.setDate(date, oneWeekLater) // Accepts unix timestamps or a js dates
})
</template>
    </Example>

</template>

<script>
import { DynamicMapService } from '../../../../src/main'
import Example from '../../layouts/example.vue'

const startUnix = 965354400000 // Aug 2000
// add some dodgyness to keep the slider happy with its steps
const endUnix = 972244800000 + 21600000   // Oct 2000

const oneDay = 24 * 60 * 60 * 1000
export default {
    name: 'DynamicMapServiceTime',
    components: {
        Example
    },
    data () {
        return {
            min: startUnix,
            max: endUnix,
            oneDay: oneDay,
            dateMin: new Date(965354400000).toLocaleDateString(),
            dateMax: new Date(965959200000).toLocaleDateString()
        }
    },
    methods: {
        mapready (map) {
            this.mapServiceTime = new DynamicMapService('dynamic-source-time', map, {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer',
                layers: [0],
                from: 965354400000,
                to: 965959200000
            })

            map.addLayer({
                id: 'dynamic-layer',
                type: 'raster',
                source: 'dynamic-source-time'
            })
        },
        formatDate (v) {
            return new Date(v).toLocaleDateString()
        },
        dateChanged (e) {
            const date = new Date(e)
            const oneWeekLater = new Date(date.getTime())
            oneWeekLater.setDate(date.getDate() + 7)

            this.dateMin = date.toLocaleDateString()
            this.dateMax = oneWeekLater.toLocaleDateString()
            this.mapServiceTime.setDate(date, oneWeekLater)
        }
    }
}

</script>


