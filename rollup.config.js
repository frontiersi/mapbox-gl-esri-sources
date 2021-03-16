import {terser} from 'rollup-plugin-terser'

const output = (file, format, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'mapboxglEsriSources',
        file,
        format
    },
    plugins
})

export default [
    output('./dist/mapbox-gl-esri-sources.js', 'umd', []),
    output('./dist/mapbox-gl-esri-sources.min.js', 'umd', [
        terser()
    ]),
    output('./dist/mapbox-gl-esri-sources.esm.js', 'esm', [])
]
