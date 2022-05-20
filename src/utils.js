export function cleanTrailingSlash (url) {
    return url.replace(/\/$/, '')
}

export function getServiceDetails (url) {
    return new Promise((resolve, reject) => {
        fetch(`${url}?f=json`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const POWERED_BY_ESRI_ATTRIBUTION_STRING = 'Powered by <a href="https://www.esri.com">Esri</a>'
// This requires hooking into some undocumented properties
export function updateAttribution (newAttribution, sourceId, map) {
    const attributionController = map._controls.find(c => '_attribHTML' in c)
    if (!attributionController) return

    const customAttribution = attributionController.options.customAttribution

    if (typeof customAttribution === 'string') {
        attributionController.options.customAttribution = `${customAttribution} | ${POWERED_BY_ESRI_ATTRIBUTION_STRING}`
    } else if (customAttribution === undefined) {
        attributionController.options.customAttribution = POWERED_BY_ESRI_ATTRIBUTION_STRING
    } else if (Array.isArray(customAttribution)) {
        if (customAttribution.indexOf(POWERED_BY_ESRI_ATTRIBUTION_STRING) === -1) {
            customAttribution.push(POWERED_BY_ESRI_ATTRIBUTION_STRING)
        }
    }

    map.style.sourceCaches[sourceId]._source.attribution = newAttribution
    attributionController._updateAttributions()
}
