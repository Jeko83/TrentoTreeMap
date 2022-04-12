import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import BenefitGrid from './benefitGrid'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
import {BsTreeFill} from 'react-icons/bs'
import {MdNaturePeople} from 'react-icons/md'
import {AiOutlineColumnWidth} from 'react-icons/ai'
import {GiThreeLeaves} from 'react-icons/gi'
import {BiArea} from 'react-icons/bi'
import {SiOxygen} from 'react-icons/si'
import {RiScalesFill} from 'react-icons/ri'
import '../App.css';

const searchURL = 'https://it.wikipedia.org/wiki/'

export default function CardAlbero(props) {

    var [treesInfo,setTreesInfo] = useState(null)

    useEffect(() =>{
        let key=0
        for (key in props.propTree){
            if(parseFloat(props.propTree[key]))
                props.propTree[key] = parseFloat(props.propTree[key])
        }
        setTreesInfo(props.propTree)
        //console.log(props.propTree)
    },[props.propTree])

    if(treesInfo != null)
        return (
            <Box sx={{ minWidth: 10}} className="card">
                <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0'}}>
                    <CardContent >
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignSelf="center"
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
                                <Typography sx={{textAlign : 'center', fontSize: 17 }} color="text.secondary">
                                    Albero
                                </Typography>
                                <Typography sx={{ fontSize: 25, textAlign : 'center', fontWeight: 'bold' }}>
                                    <Link target="_blank" href={searchURL + treesInfo.Name.split(' ').join('_')} sx={{color: '#1fe54d'}} underline="hover">
                                        {treesInfo.Name}
                                    </Link>
                                </Typography>
                                <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                                    ID : {treesInfo['Tree ID']}
                                </Typography>
                            </Grid>
                            <Grid item sx={{marginTop : 2}}>
                                <Grid
                                    container
                                    display='flex'
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
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
                                            <MdNaturePeople size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Altezza
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['Height (m)'] + ' m'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem sx={{marginLeft : 1, marginRight : 1}}/>
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
                                            <AiOutlineColumnWidth size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Diam. tronco
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['DBH (cm)'] + ' cm'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem sx={{marginLeft : 1, marginRight : 1}}/>
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
                                            <BsTreeFill size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Diam. chioma
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['Crown Width (m)'] + ' m'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>  
                            <Grid item sx={{marginTop : 2}}>
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
                                            <RiScalesFill size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Peso foglie
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['Leaf Biomass (kg)'] + ' kg'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem sx={{marginLeft : 1, marginRight : 1}}/>
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
                                            <BiArea size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Area foglie
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['Leaf Area (m2)'] + ' m²'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem sx={{marginLeft : 1, marginRight : 1}}/>
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
                                            <SiOxygen size={25}/>
                                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                                Prod. Ossigeno
                                            </Typography>
                                            <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                                {treesInfo['Oxygen Production (kg/yr)'] + ' kg/anno'}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>   
                            </Grid>
                        </Grid>
                    </CardContent>    
                </Card>
                <Card variant="outlined" sx={{borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1}}>
                    <CardContent >
                        <BenefitGrid totalInfo={treesInfo} albero={1}/>
                    </CardContent>    
                </Card>
            </Box>
        );
    else return (<div></div>)
}