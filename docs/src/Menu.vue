<template>
    <a-menu style="width: 100%" mode="inline" @click="handleClick" :openKeys="openKeys">
      <a-menu-item key="Installation">
        Installation
      </a-menu-item>

      <a-menu-item-group title="API" class="subheading"></a-menu-item-group>

      <a-menu-item v-for="child in apiItems" :key="child.key">
        {{child.title}}
      </a-menu-item>

      <a-menu-item-group title="EXAMPLES" class="subheading"></a-menu-item-group>
      <a-menu-item-group v-for="item in examples" :key="item.name">
        <template #title>
          {{item.name}}
        </template>
        
        <a-menu-item v-for="child in item.items" :key="child.key">
          {{child.title}}
        </a-menu-item>
    </a-menu-item-group>

    </a-menu>
</template>

<script>
export default {
    name: "Menu",
    data () {
      return {
        openKeys: ['Examples'],
        apiItems:  [
            {
              title: 'Dynamic Map Service',
              key: 'DynamicMapService'
            },
            {
              title: 'Tiled Map Service',
              key: 'TiledMapService'
            },
            {
              title: 'Vector Tile Service',
              key: 'VectorTileService'
            },
            {
              title: 'Vector Basemap Style',
              key: 'VectorBasemapStyle'
            }
        ],
        examples: [
          {
            name: 'Dynamic Map Service',
            items: [
              {
                title: 'Basic Dynamic Map Service',
                key: 'DynamicMapServiceBasic'
              },
              {
                title: 'Identify features on click',
                key: 'DynamicMapServiceIdentify'
              },
              {
                title: 'Filtering features using layerDefs',
                key: 'DynamicMapServiceLayerDefs'
              },
              {
                title: 'Using time parameters',
                key: 'DynamicMapServiceTime'
              }
            ]
          },
          {
            name: 'Tiled Map Service',
            items: [
              {
                title: 'Basic Tiled Map Service',
                key: 'TiledMapServiceBasic'
              }
            ]
          },
               {
            name: 'Vector Tile Service',
            items: [
              {
                title: 'Basic Vector Tile Service',
                key: 'VectorTileServiceBasic'
              },
              {
                title: 'Use styling from service',
                key: 'VectorTileServiceStyled'
              }
            ]
          },     
          {
            name: 'Vector Basemap Styles',
            items: [
              {
                title: 'Basic Vector Basemap',
                key: 'VectorStyleBasic'
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleClick (e) {
        this.$router.push({ name: e.key })
      },
      toggleExamples (e) {
        const i = this.openKeys.indexOf(e.key) 
        if (i > -1) this.openKeys.splice(i, 1)
        else this.openKeys.push(e.key)
      }
    }
}
</script>

<style>
#sidebar .subheading .ant-menu-item-group-title {
  font-weight: 700;
  padding-left: 14px;
  font-size: 0.8rem;
}

#sidebar .ant-menu-item-group-title {
  padding-left: 24px;
}
#sidebar .ant-menu-item-group-list .ant-menu-item {
  padding-left: 34px!important;
}
</style>