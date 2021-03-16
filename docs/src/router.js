import VueRouter from 'vue-router'

import Installation from './pages/Installation.vue'

import DynamicMapService from './pages/api/DynamicMapService.vue'
import TiledMapService from './pages/api/TiledMapService.vue'
import VectorTileService from './pages/api/VectorTileService.vue'
import VectorBasemapStyle from './pages/api/VectorBasemapStyle.vue'

import Example from './pages/examples/Example.vue'
import DynamicMapServiceBasic from './pages/examples/DynamicMapServiceBasic.vue'
import DynamicMapServiceIdentify from './pages/examples/DynamicMapServiceIdentify.vue'
import DynamicMapServiceLayerDefs from './pages/examples/DynamicMapServiceLayerDefs.vue'
import DynamicMapServiceTime from './pages/examples/DynamicMapServiceTime.vue'
import TiledMapServiceBasic from './pages/examples/TiledMapServiceBasic.vue'
import VectorTileServiceBasic from './pages/examples/VectorTileServiceBasic.vue'
import VectorTileServiceStyled from './pages/examples/VectorTileServiceStyled.vue'
import VectorStyleBasic from './pages/examples/VectorStyleBasic.vue'

const routes = [
    {
        path: '/',
        redirect: {
            name: 'Installation'
        }
    },
    {
        name: 'Installation',
        path: '/installation',
        component: Installation
    },
    {
        name: 'DynamicMapService',
        path: '/dynamic-map-service',
        component: DynamicMapService
    },
    {
        name: 'TiledMapService',
        path: '/tiled-map-service',
        component: TiledMapService
    },
    {
        name: 'VectorTileService',
        path: '/vector-tile-service',
        component: VectorTileService
    },
    {
        name: 'VectorBasemapStyle',
        path: '/vector-basemap-style',
        component: VectorBasemapStyle
    },
    {
        path: '/examples/',
        component: Example,
        children: [
            {
                name: 'DynamicMapServiceBasic',
                path: 'dynamic-map-service-basic',
                component: DynamicMapServiceBasic
            },
            {
                name: 'DynamicMapServiceIdentify',
                path: 'dynamic-map-service-identify',
                component: DynamicMapServiceIdentify
            },
            {
                name: 'DynamicMapServiceLayerDefs',
                path: 'dynamic-map-service-defs',
                component: DynamicMapServiceLayerDefs
            },
            {
                name: 'DynamicMapServiceTime',
                path: 'dynamic-map-service-time',
                component: DynamicMapServiceTime
            },
            {
                name: 'TiledMapServiceBasic',
                path: 'tiled-map-service',
                component: TiledMapServiceBasic
            },
            {
                name: 'VectorTileServiceBasic',
                path: 'vector-tile-service',
                component: VectorTileServiceBasic
            },
            {
                name: 'VectorTileServiceStyled',
                path: 'vector-tile-service-style',
                component: VectorTileServiceStyled
            },
            {
                name: 'VectorStyleBasic',
                path: 'vector-style-basic',
                component: VectorStyleBasic
            },
        ]
    }
]

export default new VueRouter({
    routes
})
