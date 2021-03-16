import {cleanTrailingSlash, getServiceDetails} from './utils'

export class VectorTileService {

    constructor (sourceId, map, esriServiceOptions, vectorSrcOptions) {
        if (!esriServiceOptions.url) throw new Error('A url must be supplied as part of the esriServiceOptions object.')

        esriServiceOptions.url = cleanTrailingSlash(esriServiceOptions.url)

        this._sourceId = sourceId
        this._map = map

        this._defaultEsriOptions = {
            useDefaultStyle: true
        }

        this.vectorSrcOptions = vectorSrcOptions
        this.esriServiceOptions = esriServiceOptions

        this._serviceMetadata = null
        this._defaultStyleData = null

        this._createSource()

    }

    get options () {
        return {
            ...this._defaultEsriOptions,
            ...this.esriServiceOptions
        }
    }

    get _tileUrl () {
        if (this._serviceMetadata === null) return '/tile/{z}/{y}/{x}.pbf'
        return this._serviceMetadata.tiles[0]
    }

    get _source () {
        return {
            ...this.vectorSrcOptions,
            type: 'vector',
            tiles: [
                `${this.options.url}/${this._tileUrl}`
            ],
        }
    }

    _createSource () {
        this._map.addSource(this._sourceId, this._source)
    }

    get defaultStyle () {
        if (this._defaultStyleData === null) return {}
        return {
            type: this._defaultStyleData.type,
            source: this._sourceId,
            'source-layer': this._defaultStyleData['source-layer'],
            layout: this._defaultStyleData['layout'],
            paint: this._defaultStyleData['paint']
        }
    }

    get _styleUrl () {
        if (this._serviceMetadata === null) return 'resources/styles'
        return `${this.options.url}/${this._serviceMetadata.defaultStyles}`
    }

    getStyle () {
        if (this._defaultStyleData !== null) return Promise.resolve(this._defaultStyleData)
        return new Promise((resolve, reject) => {
            if (this._serviceMetadata !== null) {
                this.getMetadata()
                    .then(() => {
                        this._retrieveStyle()
                            .then(() => {
                                resolve(this._defaultStyleData)
                            })
                            .catch(error => reject(error))
                    })
                    .catch(error => reject(error))
            } else {
                this._retrieveStyle()
                    .then(() => {
                        resolve(this._defaultStyleData)
                    })
                    .catch(error => reject(error))
            }
        })
    }

    _retrieveStyle () {
        return new Promise((resolve, reject) => {
            fetch(`${this.options.url}/${this._styleUrl}`)
                .then(response => response.json())
                .then((data) => {
                    this._defaultStyleData = data.layers[0]
                    resolve()
                })
                .catch(error => reject(error))
        })
    }

    getMetadata () {
        if (this._serviceMetadata !== null) return Promise.resolve(this._serviceMetadata)
        return new Promise((resolve, reject) => {
            getServiceDetails(this.esriServiceOptions.url)
                .then((data) => {
                    this._serviceMetadata = data
                    resolve(this._serviceMetadata)
                })
                .catch(err => reject(err))
        })
    }
}
