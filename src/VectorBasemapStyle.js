export class VectorBasemapStyle {

    constructor (styleName, apikey) {
        if (!apikey) throw new Error('An Esri API Key must be supplied to consume vector basemap styles')

        if (!styleName) styleName = 'ArcGIS:Streets'
        this.styleName = styleName
        this._apikey = apikey
    }

    get styleUrl () {
        return `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${this.styleName}?type=style&apiKey=${this._apikey}`
    }

    setStyle (styleName) {
        this.styleName = styleName
    }

}
