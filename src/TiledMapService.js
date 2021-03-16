import {cleanTrailingSlash, getServiceDetails, updateAttribution} from './utils'

export class TiledMapService {

    constructor (sourceId, map, esriServiceOptions, rasterSrcOptions) {
        if (!esriServiceOptions.url) throw new Error('A url must be supplied as part of the esriServiceOptions object.')

        esriServiceOptions.url = cleanTrailingSlash(esriServiceOptions.url)

        this._sourceId = sourceId
        this._map = map

        this.rasterSrcOptions = rasterSrcOptions
        this.esriServiceOptions = esriServiceOptions
        this._createSource()

        this._serviceMetadata = null
        if (esriServiceOptions.getAttributionFromService) this.setAttributionFromService()
    }

    get _source () {

        return {
            ...this.rasterSrcOptions,
            type: 'raster',
            tiles: [
                `${this.esriServiceOptions.url}/tile/{z}/{y}/{x}`
            ],
            tileSize: 256
        }
    }

    _createSource () {
        this._map.addSource(this._sourceId, this._source)
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

    getMetadata () {
        if (this._serviceMetadata !== null) return Promise.resolve()
        return new Promise((resolve, reject) => {
            getServiceDetails(this.esriServiceOptions.url)
                .then((data) => {
                    this._serviceMetadata = data
                    resolve(data)
                })
                .catch(err => reject(err))
        })
    }
}
