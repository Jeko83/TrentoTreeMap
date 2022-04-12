import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as turf from "turf";
import Grid from '@mui/material/Grid';
import {
    getTotalInfoFromTrees,
    speciesFreq,
    mostCommonSpecies,
    getTreesWithinPoligono,
    composeChart
} from '../data/cardFunctions'
import BenefitGrid from './benefitGrid'
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'


const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "green"
        }
    }
});

export default function CardPoligono(props) {
    var [treesPoligono,setTreesPoligono] = useState('')
    var [totalInfoTrees,setTotalInfoTrees] = useState(null);
    var [freq,setFreq] = useState('')
    var [commonSpecies,setcommonSpecies] = useState('')
    var [chart,setChart] = useState('')

    // console.log(treesPoligono)

    // console.log(totalInfoTrees)

    useEffect(() => {
        let treesInPoligono = getTreesWithinPoligono(props.propTrees,props.info_poligono).features
        let totalInfo = getTotalInfoFromTrees(treesInPoligono)

        let freq = speciesFreq(treesInPoligono)
        let commonSpecies = mostCommonSpecies(freq)

        //console.log(freq)
        //console.log(commonSpecies)

        let chartData = []

        commonSpecies.map((specie) => {
            chartData.push({
                name : specie,
                amount : parseInt(freq[specie])
            })
        })
        
        setChart(composeChart(chartData,(((Object.keys(treesInPoligono)).length)-1),Object.keys(freq).length))
        
        setFreq(freq)
        setcommonSpecies(commonSpecies)
        //console.log(commonSpecies.length)
        setTreesPoligono(treesInPoligono)
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
                        <Grid item>
                            <Typography sx={{ fontSize: 25, textAlign : 'center', color: '#1fe54d', fontWeight: 'bold' }}>
                                Area individuata
                            </Typography>
                        </Grid>
                        <Grid item sx={{marginTop : 1}}>
                            <Grid
                                container
                                display='flex'
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                            >
                                <Grid item >
                                    <div style={{
                                        position: "relative",
                                        left: 0,
                                        top: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                                            Alberi
                                        </Typography>
                                        <Typography sx={{ fontSize: 23, textAlign : 'center', fontWeight: 'bold' }}>
                                            {treesPoligono.length}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem sx={{marginLeft : 1, marginRight : 1}}/>
                                <Grid item>
                                    <div style={{
                                        position: "relative",
                                        left: 0,
                                        top: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                                            Area
                                        </Typography>
                                        <Typography sx={{ fontSize: 22, textAlign : 'center', fontWeight: 'bold' }}>
                                            {Math.round(turf.area(props.info_poligono) * 100) / 100 + ' m²'}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>    
            </Card>
            {commonSpecies.length > 0 ?
                <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1}}>
                    <CardContent >
                        {totalInfoTrees!=null ? <BenefitGrid totalInfo={totalInfoTrees}/> : null}
                    </CardContent>    
                </Card>
            : null}
            {commonSpecies.length > 0 ?
                <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1}}>
                    <CardContent >
                        {chart}
                    </CardContent>    
                </Card>
            : null}
        </Box>
    );
}