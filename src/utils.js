export function cleanTrailingSlash (url) {
    return url.replace(/\/$/, '')
}

export function getServiceDetails (url, fetchOptions = {}) {
    return new Promise((resolve, reject) => {
        fetch(`${url}?f=json`, fetchOptions)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

// This requires hooking into some undocumented properties
export function updateAttribution (newAttribution, sourceId, map) {
    map.style.sourceCaches[sourceId]._source.attribution = newAttribution
    map._controls[0]._updateAttributions()
}
