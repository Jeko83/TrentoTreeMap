import React from "react";
import * as turf from "turf";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import pointsWithinPolygon from '@turf/points-within-polygon'
import {DefaultTooltipContent} from 'recharts/lib/component/DefaultTooltipContent';
import Typography from '@mui/material/Typography';


const searchURL = 'https://it.wikipedia.org/wiki/'

//ritorna una featurecollection con tutti gli alberi all' interno del poligono che passiamo, con anche i dati del poligono stesso.
export function getTreesWithinCircoscrizione(trees,name,circoscrizioni){
    let area = circoscrizioni.features.filter(item => item.properties.nome == name)
    //console.log(trees)

    //rimuovo l'ultimo element in quanto rappresenta il totale di tutti i dati degli alberi e non e' prettamente un punto.
    //trees.features.pop()

    //console.log(area[0])
    
    return pointsWithinPolygon(trees,area[0])
}

export function getTreesWithinPoloSociale(trees,name,polo){
    let area = polo.features.filter(item => item.properties.nome_quart == name)
    
    //rimuovo l'ultimo element in quanto rappresenta il totale di tutti i dati degli alberi e non e' prettamente un punto.
    //trees.features.pop()

    return pointsWithinPolygon(trees,area[0])
}

export function getTreesWithinPoligono(trees,coord_poligono){
    // console.log(trees)
    // console.log(coord_poligono)
    // console.log(pointsWithinPolygon(trees,coord_poligono))
    return pointsWithinPolygon(trees,coord_poligono)
}

export function getTotalInfoFromTrees(trees){
    let total = {
        "Replacement Value (eur)": 0.0,
        "Carbon Storage (kg)": 0.0,
        "Carbon Storage (eur)": 0.0,
        "Gross Carbon Sequestration (kg/yr)": 0.0,
        "Gross Carbon Sequestration (eur/yr)": 0.0,
        "Avoided Runoff (mcube/yr)": 0.0,
        "Avoided Runoff (eur/yr)": 0.0,
        "Pollution Removal (g/yr)": 0.0,
        "Pollution Removal (eur/yr)": 0.0,
        "Total Annual Benefits (eur/yr)": 0.0,
        "Oxygen Production (kg/yr)": 0.0,
        "Canopy Cover (m2)": 0.0,
        "Leaf Area (m2)": 0.0,
        "Leaf Biomass (kg)": 0.0,
    }
    trees.map((item) => {
        let key = 0
        for (key in total){
            total[key] += parseFloat(item.properties[key])
        }
    })

    return total
    //console.log(total)
}

export function speciesFreq(data) {
    var freq = {};
    data.map((e) => {
        if(freq[e.properties.Name] == undefined){
            freq[e.properties.Name] = 1
        } else {
            freq[e.properties.Name] += 1
        }
    })
    // console.log(freq['Celtis australis'])
    // console.log(freq['Aesculus hippocastanum'])
    // console.log(freq['Carpinus betulus'])
    //console.log(freq)
    return freq;
}

export function mostCommonSpecies(species) {
    let sorted = Object.keys(species).sort((a, b) => species[b] - species[a]);
    let sliced = sorted.slice(0, 5);
    return sliced
}

export function openWindow(e) {
    window.open(searchURL + e.activeLabel.split(' ').join('_'))
}

const CustomTooltip = importData => {
    // payload[0] doesn't exist when tooltip isn't visible
    if (importData.payload[0] != null) {
        //console.log(importData)
        // mutating props directly is against react's conventions
        // so we create a new payload with the name and value fields set to what we want
        const newPayload = [
            {
                value: importData.payload[0].payload.amount + ' di ' + importData.num,
            },
        ];
      // we render the default, but with our overridden payload
      return <DefaultTooltipContent {...importData} payload={newPayload} />;
    }
    // we just render the default
    return <DefaultTooltipContent {...importData} />;
};

export function composeChart(data,totalNum,speciesNum){
    let num = 0;
    let max = 0
    data.map((item) => {
        num += item.amount
        if(item.amount > max)
            max = item.amount
    })
    return (
        <React.Fragment>
            <Typography sx={{textAlign : 'center', fontSize: 18, fontWeight: 'bold'}} color="text.primary">
                Specie più presenti
            </Typography>
            <ResponsiveContainer width='100%' height={235}>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{
                        top: 3,
                        right: 10,
                        left: 35,
                        bottom: 0
                    }}
                    onClick={openWindow}
                >
                    <YAxis type="category" dataKey="name" wrapperStyle={{whiteSpace:"break-spaces"}}/>
                    <XAxis type="number" allowDecimals={false}/>
                    <Tooltip content={<CustomTooltip num={totalNum}/>}/>
                    <Bar dataKey="amount" fill="#1fa141" barSize={26}>
                    {data.map((entry, index) => {
                        //console.log(entry.amount/max)
                        return (
                            <Cell cursor="pointer" fillOpacity={
                                (entry.amount/max) > 0.2 ? (entry.amount/max) : 0.2
                            } fill={'#82ca9d'} key={`cell-${index}`} />
                        )
                    })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Typography sx={{textAlign : 'center', fontSize: 13 }} color="text.secondary">
                su un totale di <b>{speciesNum}</b> specie
            </Typography>
        </React.Fragment>
    )
}

