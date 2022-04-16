import React , { useRef, useEffect, useState } from 'react';
import '../App.css';
import Pulse from 'react-reveal/Pulse';
import CountUp from 'react-countup';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import {FaCloudversify} from 'react-icons/fa'
import {GiRaining} from 'react-icons/gi'
import {AiFillCar} from 'react-icons/ai'

export default function BenefitGrid(props) {

    const format = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')

    return (
        <Grid
            container
            display='flex'
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid item xs='auto'>
                <Pulse>
                    <Typography sx={{ fontSize: 25, textAlign : 'center', fontWeight: 'bold'}}>
                        <CountUp
                            end={props.totalInfo['Total Annual Benefits (eur/yr)']}
                            duration={1}
                            suffix="€"
                        />
                    </Typography>
                </Pulse>
                <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                    risparmiati in un <b>anno</b>
                </Typography>
            </Grid>
            <Divider orientation="horizontal" flexItem/>
            <Grid item>
                <Typography sx={{textAlign : 'center', fontSize: 15 }} color="text.secondary">
                    Derivati da:
                </Typography>
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
                            <AiFillCar size={30}/>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                Inquinamento rimosso
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 17, fontWeight: "bold"}} color="text.secondary">
                                {format((props.totalInfo['Pollution Removal (g/yr)']/1000.0).toFixed(2)) + ' kg'}
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                {format(props.totalInfo['Pollution Removal (eur/yr)'].toFixed(2)) + '€'}
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
                            <FaCloudversify size={30}/>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                CO2 assorbita
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 17, fontWeight: "bold"}} color="text.secondary">
                                {format(props.totalInfo['Gross Carbon Sequestration (kg/yr)'].toFixed(2)) + ' kg'}
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                {format(props.totalInfo['Gross Carbon Sequestration (eur/yr)'].toFixed(2)) + '€'}
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
                            <GiRaining size={30}/>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                Acqua assorbita
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 17, fontWeight: "bold"}} color="text.secondary">
                                {format((props.totalInfo['Avoided Runoff (mcube/yr)']*1000.0).toFixed(2)) + ' kg'}
                            </Typography>
                            <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                {format(props.totalInfo['Avoided Runoff (eur/yr)'].toFixed(2)) + '€'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            {!props.name ? null :
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
                                <FaCloudversify size={30}/>
                                <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                    Inquinamento rimosso
                                </Typography>
                                <Typography sx={{textAlign : 'center', fontSize: 16, fontWeight: "bold"}} color="text.secondary">
                                    {format((props.totalInfo['Pollution Removal (g/yr)']/1000.0).toFixed(2)) + ' chili'}
                                </Typography>
                                <Typography sx={{textAlign : 'center', fontSize: 14}} color="text.secondary">
                                    {format(props.totalInfo['Pollution Removal (eur/yr)'].toFixed(2)) + '€'}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            }        
        </Grid>
    )
}