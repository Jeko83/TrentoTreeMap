import * as polylabel from "polylabel";
import * as turf from "turf";

async function fetchJson(url){
    //console.log("Fetching trees json")
    const response = await fetch(url);
    return response.json();
};

export async function fetchProps() {
    console.log("Fetching props")
    let propTrees = await fetchJson(window.location.origin + "/geo_data_trees.geojson")
    let propCircoscrizioni = await fetchJson(window.location.origin + "/circoscrizioni.json")
    let propPoliSociali = await fetchJson(window.location.origin + "/poli_sociali.json")
    return [propTrees,propCircoscrizioni,propPoliSociali]
}

// calcolo il punto ottimale per mettere il testo contenente il nome del 'poligono'
// il testo e' determinato dal campo 'nome' o 'nome_quart' a seconda di che geojson sta analizzando
export function processLabelsFeatures(geojson){
    let coordinatesLabels = {
        'type': 'FeatureCollection',
        'features': []
    }
    geojson.features.map((item) => {
        let tempFeature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': []
            },
            'properties': {
                'title': ''
            }
        }
        let coord = item.geometry.coordinates;
        //let p = polylabel(coord,0.2)
        let p = polylabel(coord,0.0035)
        //console.log(p)
        let coordArray = [p[0],p[1]];
        tempFeature.geometry.coordinates = coordArray
        if(item.properties.nome != undefined)
            tempFeature.properties.title = item.properties.nome
        else
            tempFeature.properties.title = item.properties.nome_quart
        coordinatesLabels.features.push(tempFeature)
    })
    return coordinatesLabels
    //propCircoscrizioni.features.filter(item => item.properties.nome == e.features[0].properties.nome)
}

export function getFullItemFromCircoscrizioni(geojson,name){ 
    return geojson.features.filter(item => item.properties.nome == name)[0]
}

export function getFullItemFromPoloSociale(geojson,name){ 
    return geojson.features.filter(item =>item.properties.nome_quart == name)[0]
}