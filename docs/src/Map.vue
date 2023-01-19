<template>
    <div id="map"></div>
</template>

<script>
import { Map } from 'maplibre-gl/dist/maplibre-gl-unminified'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
    name: 'Map',
    props: ['latLon', 'zoom', 'basemap'],
    mounted () {
      const center = this.latLon ? this.latLon : [147.17507620575037, -32.617356560963294]
      const zoom = this.zoom ? this.zoom : 5
      const basemapUrl = this.basemap ? this.basemap : 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'

      const map = new Map({
        container: 'map',
        style: basemapUrl,
        center: center,
        zoom: zoom
      })

      map.on('load', () => {
        this.$emit('mapready', map)
      })
    }
}
</script>

<style>
#map {
    height: 400px;
}
</style>