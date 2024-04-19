import { Button, Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { darkTheme, img } from "../utility/themes";
import { useEffect, useState } from "react";
import { AddOutletForm } from "./AddOutletForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Outlets(){

    const matches = useMediaQuery('(min-width:1100px)');

    const navigate = useNavigate();

    const [openAddOutletForm, setOpenAddOutletForm] = useState(false);
    const [trigger, triggerReload] = useState(true);

    function openForm() {
        setOpenAddOutletForm(true);
    }

    function closeForm() {
        setOpenAddOutletForm(false);
    }

    const [outlets, setOutlets] = useState([]);

    function getOutlets() {
        axios.get(`${import.meta.env.VITE_BACKEND}/outlets/`,{ headers:{'Content-Type': 'multipart/form-data'}, withCredentials: true })
        .then(res => {
            setOutlets(res.data);        
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    useEffect(
        getOutlets,
        [trigger]
    )
    
    return (
        <div className="flex-column page full-width" style={{minHeight:'100vh'}}>
            <div style={{margin:"0% 5%", marginTop:"4%", display:'flex', flexDirection:'row'}}>
                <h1 style={{fontFamily:"Roboto Mono", fontSize:"2.3em", fontWeight:"800"}}>Outlets</h1>
                <ThemeProvider theme={darkTheme}>
                    <Button 
                        sx={{height:"35px", margin:"auto 15% auto auto"}}
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={openForm}
                        >
                            create Outlet
                    </Button>
                </ThemeProvider>
            </div>
            <AddOutletForm open={openAddOutletForm} closeForm={closeForm} trigger={trigger} triggerReload={triggerReload}  />
            <hr style={{width:"80%", margin:"0% 5%", height:"2px"}}></hr>
            {/* <div style={{width:"100%", marginLeft:"5%", display:"flex", flexDirection:"row"}}> */}
                <Grid sx={{width:matches?"80%":"90%", margin:"1% 5%"}} container spacing={2}>
                    {outlets.map((outlet,index)=>{
                        return (
                            <Grid sx={{width:"100%"}} md={6} key={index}>
                                <OutletComponent outlet={outlet} />
                            </Grid>
                        );
                    })}
                </Grid>
                {outlets.length===0 && 
                    <h1 style={{margin:'0px auto', fontFamily:"Roboto Mono", fontSize:"1.3em", fontWeight:"800"}}>Create your first Outlet to get started</h1>
                }
            {/* </div> */}
        </div>
    );

}


function OutletComponent({outlet}){

    const navigate = useNavigate();

    function navigateToOutlet() {
        navigate(`/outlets/${outlet._id}`);
    }

    return (
        <div style={{cursor:'pointer', boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", border:"solid 0px", borderRadius:"7px", width:"90%", minHeight:"auto", backgroundColor:"white", margin:"4% 0%", padding:"3%", flexDirection:"column", display:"flex"}} onClick={navigateToOutlet}>
                <div style={{height:"60%", width:"100%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <img src={`${import.meta.env.VITE_BACKEND}/images/${outlet.logo}`} style={{border:"solid 0.5px", boxShadow:"0 0 2px 2px rgb(0 0 0 / 0.2", borderRadius:"4px", margin:"3%", objectFit:"fill", height:"100px"}} ></img>
                    <div style={{height:"100%", flexDirection:"column", display:"flex", margin:"3% 6%"}}>
                        <LocationOnIcon sx={{fontSize:"42px", margin:"auto auto 0px auto"}} />
                        <h1 style={{margin:"0px, auto auto auto", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"normal"}}>{outlet.location}</h1>
                    </div>
                </div>
                <div style={{height:"40%", width:"100%", display:"flex", flexDirection:"row"}}>
                    <h1 style={{fontFamily:"Roboto Mono", fontSize:"1.25em", fontWeight:"800", margin:"auto auto auto 4%"}}>{outlet.name}</h1>
                </div>
        </div>
    );
}

export default Outlets;

