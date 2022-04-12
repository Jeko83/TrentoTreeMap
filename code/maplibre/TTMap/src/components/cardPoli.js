import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import {
    getTreesWithinPoloSociale,
    getTotalInfoFromTrees,
    speciesFreq,
    mostCommonSpecies,
    composeChart
} from '../data/cardFunctions'
import BenefitGrid from './benefitGrid'
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'

export default function CardPoli(props) {
    var [treesPoli,setTreesPoli] = useState('')
    var [totalInfoTrees,setTotalInfoTrees] = useState(null);
    var [freq,setFreq] = useState('')
    var [commonSpecies,setcommonSpecies] = useState('')
    var [chart,setChart] = useState('')
    //console.log(getTreesWithinCircoscrizione(props.propTrees,props.name,props.propCircoscrizioni))

    // console.log(treesPoli)

    // console.log(totalInfoTrees)

    useEffect(() => {
        let treesInCirc = getTreesWithinPoloSociale(props.propTrees,props.name,props.propPoliSociali).features
        let totalInfo = getTotalInfoFromTrees(treesInCirc)

        let freq = speciesFreq(treesInCirc)
        let commonSpecies = mostCommonSpecies(freq)

        // console.log(freq)
        // console.log(commonSpecies)

        let chartData = []

        commonSpecies.map((specie) => {
            chartData.push({
                name : specie,
                amount : parseInt(freq[specie])
            })
        })
        
        setChart(composeChart(chartData,(((Object.keys(treesInCirc)).length)-1),Object.keys(freq).length))
        
        setFreq(freq)
        setcommonSpecies(commonSpecies)

        setTreesPoli(treesInCirc)
        setTotalInfoTrees(totalInfo)
    },[])

    return (
        // <ThemeProvider theme={theme}>
        <Box sx={{ minWidth: 10}} className="card">
            <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0'}}>
                <CardContent >
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                    >
                        <Grid item xs='auto'>
                            { props.drawerOpen ? 
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <BsFillArrowLeftSquareFill onClick={() => props.setDrawerOpen(false)} size={25}/>
                                </div> : null
                            }
                        </Grid>
                        <Grid item xs='auto'>
                            <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                                Polo
                            </Typography>
                            <Typography sx={{ fontSize: 25, textAlign : 'center', color: '#1fe54d', fontWeight: 'bold' }}>
                                {props.name}
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                                Alberi
                            </Typography>
                            <Typography sx={{ fontSize: 23, textAlign : 'center', fontWeight: 'bold' }}>
                                {treesPoli.length}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>    
            </Card>
            <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1}}>
                <CardContent >
                    {totalInfoTrees!=null ? <BenefitGrid totalInfo={totalInfoTrees}/> : null}
                </CardContent>    
            </Card>
            <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1}}>
                <CardContent >
                    {chart}
                </CardContent>    
            </Card>
        </Box>
    );
}