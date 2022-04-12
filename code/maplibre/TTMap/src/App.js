import React, { useState, useEffect } from 'react';
import Map from './components/map.js';
import CardCitta from "./components/cardCitta";
import CardAlbero from "./components/cardAlbero";
import CardCirc from "./components/cardCirc";
import CardPoli from "./components/cardPoli";
import CardPoligono from "./components/cardPoligono"
import './App.css';
import { Button, Link } from "@mui/material";
import {
  fetchProps
} from "./data/mapFunctions"
import {Drawer } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import SweetAlert2 from 'react-sweetalert2';

import pointsWithinPolygon from '@turf/points-within-polygon'

import {BsFillArrowRightSquareFill} from 'react-icons/bs'
import {AiFillGithub} from 'react-icons/ai'
import {IoIosPeople} from 'react-icons/io'
import {FaTelegram} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'

import { CircleLoading } from 'react-loadingg';


function App() {
  const [cardInfo,setCardInfo] = useState({
    name : 'citta',
    item_name : null,
    item_info: null
  })

  const [data,setData] = useState({
    propTrees : null,
    propCircoscrizioni : null,
    propPoliSociali : null,
    totalInfoTrees : null
  })

  const [swalProps, setSwalProps] = useState({});
  const [drawerOpen,setDrawer] = useState(true)

  
  useEffect(()=>{
    //aspetto che vengano fetchati tutti i geojson necessari e li salvo nello stato (solo primo ciclo)
    fetchProps().then((data) =>{
      let tempTrees = data[0]
      let total = tempTrees.features.pop()

      let date = Date.now()

      data[1].features.map((item) => {
        item.properties.trees_within = pointsWithinPolygon(tempTrees,item).features.length
      })

      data[2].features.map((item) => {
        item.properties.trees_within = pointsWithinPolygon(tempTrees,item).features.length
      })

      let finishDate = Date.now()

      console.log('finished processing poli and circ data in ' + (finishDate - date)/1000 + ' seconds')

      // console.log(data[1])
      // console.log(data[2])
      console.log(total)


      setData({
        propTrees : data[0],
        propCircoscrizioni : data[1],
        propPoliSociali : data[2],
        totalInfoTrees : total.properties
      })
    })
  },[])

  //console.log(cardInfo)
  
  //fuinzione passata al componente figlio 'map', che cambia lo stato di app (questo component), che permette di capire quale layer si e' cliccato e le sue informazioni, e di conseguenza estrarne le informazioni. 
  function changeCardInfo(info) {
    setCardInfo(info)
  }

  const onClick = () => {
    setDrawer(!drawerOpen)
  }

  function showAbout(){
    setSwalProps({
      show: true,
      didClose: () => {
        setSwalProps({})
      }
    });
  }


  if(data.propTrees==null)
    return (
      <div style = {{textAlign: 'center', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}> 
        <CircleLoading />
        <Typography sx={{textAlign : 'center', fontSize: 17, marginTop: 10}} color="text.secondary">
          La pagina si sta caricando...
        </Typography>
      </div>
    )
  else return(
    <React.Fragment>
        <Drawer
          anchor='left'
          open={drawerOpen}
          // overflowY= 'scroll'
          sx = {{
            position: "relative",
            zIndex: 'initial',
            overflowY: 'auto',
            boxSizing: 'content-box',
            '& .MuiDrawer-paper' : {
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              backgroundColor: '#fff0',
              boxShadow: 'none',
              //height: 'auto',
            },
          }}
        >
          {data.propTrees==null ? null : 
            cardInfo.name=='citta' ? <CardCitta drawerOpen={drawerOpen} setDrawerOpen={setDrawer} propTrees={data.propTrees} totalInfo={data.totalInfoTrees}/> :
            cardInfo.name=='poli' ? <CardPoli drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_name} propTrees={data.propTrees} propPoliSociali={data.propPoliSociali}/> : 
            cardInfo.name=='circoscrizioni' ? <CardCirc drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_name} propTrees={data.propTrees} propCircoscrizioni={data.propCircoscrizioni}/> : 
            cardInfo.name=='albero' ? <CardAlbero drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_info.Name} propTree={cardInfo.item_info}/> : 
            cardInfo.name == 'poligono' ? <CardPoligono drawerOpen={drawerOpen} setDrawerOpen={setDrawer} info_poligono={cardInfo.item_info.features[0]} propTrees={data.propTrees}/> : null
          }
        </Drawer>
      {/* </div> */}
        {/* Al primo render non abbiamo i dati fetchati, quindi al primo ciclo ritorniamo null. */}
        {data.propTrees==null ? null : 
          <Map setDrawer={setDrawer} setCardInfo={changeCardInfo} propTrees={data.propTrees} propCircoscrizioni={data.propCircoscrizioni} propPoliSociali={data.propPoliSociali}/>
        }
        { drawerOpen ? null : 
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            margin: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <BsFillArrowRightSquareFill onClick={onClick} size={30}/>
            <Typography sx={{textAlign : 'center', fontSize: 17, fontWeight: 'bold'}} color="text.primary">
                Info
            </Typography>
          </div>
        }
        <Button variant="contained" onClick={showAbout} startIcon={<IoIosPeople />} 
          sx={{
            position: "absolute",
            backgroundColor:'#5dee70b8',
            "&:hover": {
                backgroundColor: "#5bd06aed",
            },
            right: 0,
            bottom: 0,
            margin: 1.5,
          }}
        >
          About
        </Button>
        <SweetAlert2 {...swalProps}>
            <Typography variant='h5'>
              Mappa degli alberi di Trento
            </Typography>
            <Divider flexItem sx={{marginTop : 1}}/>
            <Typography fontSize={14} marginTop={1}>
              La mappa presenta una parte degli alberi gestiti dal Comune di Trento.
            </Typography>
            <Typography fontSize={14} marginTop={1}>
              I dati appaiono verosimili rispetto a posizione, specie, altezza e circonferenza del tronco.
            </Typography>
            <Typography fontSize={14} marginTop={1}>
              Il calcolo dell' <b>Eco-Benefit</b> è stato svolto utilizzando la piattaforma
            </Typography>
            <Typography fontSize={16} fontWeight="bold">
              <Link target="_blank" href="https://www.itreetools.org/tools/i-tree-eco" underline="hover">
                i-Tree Eco
              </Link>
            </Typography>
            <Typography fontSize={14} marginTop={1}>
              Progetto realizzato da
            </Typography>
            <Typography fontSize={18} fontWeight="bold" color='#0bff2a'>
              Giacomo Catelan
            </Typography>
            <Typography fontSize={14}>
              con la supervisione di&nbsp;
                <Link target="_blank" href="https://twitter.com/napo" underline="hover">
                  Maurizio Napolitano
                </Link> 
                &nbsp;di FBK durante l'attività di internship coordinata dal professore Luca Turchet dell'&nbsp;
                <Link target="_blank" href="https://www.unitn.it/" underline="hover">
                  Univestità degli Studi di Trento
                </Link>
              .
            </Typography>
            {/* <Typography fontSize={14}>
              per lo stage formativo di
                <Link target="_blank" href="https://www.unitn.it/" underline="hover" color='green'>
                  <b> UniTN </b>
                </Link>
                presso
                <Link target="_blank" href="https://www.fbk.eu/it/" underline="hover" color='green'>
                  <b> Fondazione Bruno Kessler</b>
                </Link>
            </Typography> */}
            <Typography fontSize={14} marginTop={2}>
              Per dettagli e contatti:
            </Typography>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
            >
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
                              <AiFillGithub size={25}/>
                              <Typography sx={{textAlign : 'center', fontSize: 13 }} color="text.secondary">
                                  Github
                              </Typography>
                              <Typography sx={{ fontSize: 15, textAlign : 'center'}}>
                                <Link target="_blank" href="https://github.com/DigitalCommonsLab/trees_platform">
                                  Repository
                                </Link>
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
                              <FaTelegram size={25}/>
                              <Typography sx={{textAlign : 'center', fontSize: 13 }} color="text.secondary">
                                  Telegram
                              </Typography>
                              <Typography sx={{ fontSize: 16, textAlign : 'center'}}>
                                <Link target="_blank" href="https://telegram.me/jko_83">
                                  @jko_83
                                </Link>
                              </Typography>
                          </div>
                      </Grid>
                  </Grid>
              </Grid>
              <Divider flexItem sx={{marginTop : 1, marginRight : 10, marginLeft : 10}}/>
              <Grid item sx={{marginTop : 1}}>
                <div style={{
                    position: "relative",
                    left: 0,
                    top: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <MdEmail size={25}/>
                    <Typography sx={{textAlign : 'center', fontSize: 13 }} color="text.secondary">
                        E-Mail
                    </Typography>
                    <Typography sx={{ fontSize: 16, textAlign : 'center'}}>
                      <Link target="_blank" href="mailto:catelan.giacomo@gmail.com">
                        catelan.giacomo@gmail.com
                      </Link>
                    </Typography>
                </div>
              </Grid>
            </Grid>
          <Typography fontSize={14} marginTop={1}>
            This software is released under the MIT license.
          </Typography>
        </SweetAlert2>
    </React.Fragment>
  )
}

export default App;