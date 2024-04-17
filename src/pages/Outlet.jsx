import { Button, Grid, ThemeProvider } from "@mui/material";
import { darkTheme, img } from "../utility/themes";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import productLogo from "./../assets/product.png";
import analyticsLogo from "./../assets/analytics.png";
import organizationLogo from "./../assets/organize.png";
import { menuList } from "../utility/listsUtil";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { OutletMenu } from "./OutletMenu";
import { CreateOrder } from "./CreateOrder";
import { Orders } from "./Orders";

export function Outlet(){

    const {id} = useParams();
    const [outlet, setOutlet] = useState({});

    function getOutlet() {
        axios.get(`${import.meta.env.VITE_BACKEND}/outlets/${id}`,{ headers:{'Content-Type': 'multipart/form-data'}, withCredentials: true })
        .then(res => {
            setOutlet(res.data);        
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(
        getOutlet
        ,[id]);

    const outletItems = ['menu', 'orders', 'create order'];

    const [tab,setTab] = useState('menu');

    return (
        <div className="flex-column full-width page" style={{minHeight:'100vh', padding:"30px 5%"}}>
            <div className="flex-row align-center" style={{marginTop:'10px', marginBottom:'10px'}}>
                <img src={`${import.meta.env.VITE_BACKEND}/images/${outlet.logo}`} style={{border:"solid 0.5px", boxShadow:"0 0 2px 2px rgb(0 0 0 / 0.2", borderRadius:"4px", margin:"10px", objectFit:"fill", height:"60px"}} ></img>
                <h1 style={{margin:"auto 20px", fontSize:"20px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> {outlet.name} </h1>
                <div className="flex-row align-center">
                    <LocationOnIcon sx={{fontSize:"auto", textAlign:"center", margin:"0px 10px"}} />
                    <h1 style={{margin:"0px, auto auto auto", fontSize:"17px", fontFamily:"Roboto Mono", fontWeight:"normal"}}>{outlet.location}</h1>
                </div>
            </div>

            <div style={{ margin:'10px 0px', display:'flex', flexDirection:'row'}}>
            {
                outletItems.map((item,index)=>{
                    return (
                        <div
                            key={index}
                            style={{cursor:'pointer', margin:'0px 5px', padding:'3px 0px', backgroundColor:tab===item?'black':'white', display:'flex', flexDirection:'row', borderRadius:'7px', boxShadow:tab===item?"0 1px 2px rgb(0 0 0 / 0.2":"none", border:"solid 0px"}}
                            onClick={()=>{setTab(item)}}
                            >
                            <h1 style={{ color:tab===item?'white':'black', margin:"auto 20px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> {item} </h1>
                        </div>
                    );
                })
            }
            </div>
            { tab === 'menu' && <div style={{width:'100%', backgroundColor:'white', boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", border:"solid 0px", borderTopLeftRadius:0, borderRadius:"7px"}}>
                <OutletMenu />
            </div> }
            { tab === 'orders' && <div style={{width:'100%', backgroundColor:'white', boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", border:"solid 0px", borderTopLeftRadius:0, borderRadius:"7px"}}>
                <Orders />
            </div> }
            { tab === 'create order' && <div style={{width:'100%', backgroundColor:'white', boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", border:"solid 0px", borderTopLeftRadius:0, borderRadius:"7px"}}>
                <CreateOrder />
            </div> }
        </div>
    );

} 

function DashboardMenuCard({menuI}) {
    return (
        <div className="flex-column align-center" style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", margin:"10px", padding:"10px 5px", borderRadius:"10px", width:"240px", backgroundColor:"white"}}>
            <div className="flex-row align-center" style={{margin:"5px 0px"}}>
                <img src={menuI.img} style={{margin:"5px", objectFit:"fill", height:"60px"}} ></img>
                <h1 style={{margin:"auto 20px", fontSize:"19px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> {menuI.title} </h1>
            </div>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"80%", fontSize:"12px", margin:"5px 0px"}} variant="outlined" size="small"> Dashboard <ArrowForwardIcon sx={{margin:"0px 5px", fontSize:"16px"}} /> </Button>
            </ThemeProvider>
        </div>
    );
}