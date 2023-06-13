import {cleanTrailingSlash, getServiceDetails, updateAttribution} from './utils'

export class ImageService {

    constructor (sourceId, map, esriServiceOptions, rasterSrcOptions) {
        if (!esriServiceOptions.url) throw new Error('A url must be supplied as part of the esriServiceOptions object.')

        esriServiceOptions.url = cleanTrailingSlash(esriServiceOptions.url)

        this._sourceId = sourceId
        this._map = map

        this._defaultEsriOptions = {
            format: 'jpgpng',
            dpi: 96,
            getAttributionFromService: true
        }

        this.rasterSrcOptions = rasterSrcOptions
        this.esriServiceOptions = esriServiceOptions
        this._createSource()

        this._serviceMetadata = null

        if (this.options.getAttributionFromService) this.setAttributionFromService()
    }

    get options () {
        return {
            ...this._defaultEsriOptions,
            ...this.esriServiceOptions
        }
    }

    get _time () {
        if (!this.options.to) return false
        let from = this.options.from
        let to = this.options.to
        if (from instanceof Date) from = from.valueOf()
        if (to instanceof Date) to = to.valueOf()

        return `${from},${to}`
    }

    get _source () {
        const tileSize = this.rasterSrcOptions ? this.rasterSrcOptions.tileSize ? this.rasterSrcOptions.tileSize : 256 : 256
        // These are the bare minimum parameters
        const params = new URLSearchParams({
            bboxSR: 3857,
            imageSR: 3857,
            format: this.options.format,
            size: [tileSize, tileSize],
            f: 'image'
        })

        // These are optional params
        if (this._time) params.append('time', this._time)
        if (this.options.mosaicRule) params.append('mosaicRule', JSON.stringify(this.options.mosaicRule))
        if (this.options.renderingRule) params.append('renderingRule', JSON.stringify(this.options.renderingRule))

        return {
            type: 'raster',
            tiles: [
                `${this.options.url}/exportImage?bbox={bbox-epsg-3857}&${params.toString()}`
            ],
            tileSize,
            ...this.rasterSrcOptions
        }
    }

    _createSource () {
        this._map.addSource(this._sourceId, this._source)
    }

    // This requires hooking into some undocumented methods
    _updateSource () {
        const src = this._map.getSource(this._sourceId)
        src.tiles[0] = this._source.tiles[0]
        src._options = this._source

        // Old MapboxGL and MaplibreGL
        if (this._map.style.sourceCaches) {
            this._map.style.sourceCaches[this._sourceId].clearTiles()
            this._map.style.sourceCaches[this._sourceId].update(this._map.transform)
        } else if (this._map.style._otherSourceCaches) {
            this._map.style.sourceCaches[this._sourceId].clearTiles()
            this._map.style.sourceCaches[this._sourceId].update(this._map.transform)
        }
    }

    setDate (from, to) {
        this.esriServiceOptions.from = from
        this.esriServiceOptions.to = to
        this._updateSource()
    }

    setRenderingRule (rule) {
        this.esriServiceOptions.renderingRule = rule
        this._updateSource()
    }

    setMosiacRule (rule) {
        this.esriServiceOptions.mosaicRule = rule
        this._updateSource()
    }

    setAttributionFromService () {
        if (this._serviceMetadata) updateAttribution(this._serviceMetadata.copyrightText, this._sourceId, this._map)
        else {
            this.getMetadata()
                .then(() => {
                    updateAttribution(this._serviceMetadata.copyrightText, this._sourceId, this._map)
                })
        }
    }

    getMetadata() {
        if (this._serviceMetadata !== null) return Promise.resolve(this._serviceMetadata)
        return new Promise((resolve, reject) => {
            getServiceDetails(this.esriServiceOptions.url, this.esriServiceOptions.fetchOptions)
                .then((data) => {
                    this._serviceMetadata = data
                    resolve(this._serviceMetadata)
                })
                .catch(err => reject(err))
        })
    }

    identify (lnglat, returnGeometry) {
        const canvas = this._map.getCanvas()
        const bounds = this._map.getBounds().toArray()
        returnGeometry = returnGeometry ? returnGeometry : false
        const params = new URLSearchParams({
            sr: 4326,
            geometryType: 'esriGeometryPoint',
            geometry: JSON.stringify({
                x: lnglat.lng,
                y: lnglat.lat,
                spatialReference: {
                    wkid: 4326
                }
            }),
            tolerance: 3,
            returnGeometry,
            imageDisplay: `${canvas.width},${canvas.height},96`,
            mapExtent: `${bounds[0][0]},${bounds[0][1]},${bounds[1][0]},${bounds[1][1]}`,
            layers: this._layersStr,
            layerDefs: this._layerDefs,
            time: this._time,
            f: 'json'
        })

        return new Promise((resolve, reject) => {
            fetch(`${this.esriServiceOptions.url}/identify?${params.toString()}`, this.esriServiceOptions.fetchOptions)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
}
