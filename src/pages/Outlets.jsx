import { Grid, useMediaQuery } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { img } from "../utility/themes";


function Outlets(){

    const matches = useMediaQuery('(min-width:1100px)');
    
    return (
        <div className="flex-column page full-width">
            <div style={{margin:"0% 5%", marginTop:"4%"}}>
                <h1 style={{fontFamily:"Roboto Mono", fontSize:"2.3em", fontWeight:"800"}}>Outlets</h1>
            </div>
            <hr style={{width:"80%", margin:"0% 5%", height:"2px"}}></hr>
            {/* <div style={{width:"100%", marginLeft:"5%", display:"flex", flexDirection:"row"}}> */}
                <Grid sx={{width:matches?"80%":"90%", margin:"1% 5%"}} container spacing={2}>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                    <Grid sx={{width:"100%"}} md={6}>
                        <OutletComponent />
                    </Grid>
                </Grid>
            {/* </div> */}
        </div>
    );

}


function OutletComponent(){
    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", border:"solid 0px", borderRadius:"7px", width:"90%", minHeight:"auto", backgroundColor:"white", margin:"4% 0%", padding:"3%", flexDirection:"column", display:"flex"}}>
                <div style={{height:"60%", width:"100%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <img src={img} style={{border:"solid 0.5px", boxShadow:"0 0 2px 2px rgb(0 0 0 / 0.2", borderRadius:"4px", margin:"3%", objectFit:"fill", height:"100px"}} ></img>
                    <div style={{height:"100%", flexDirection:"column", display:"flex", margin:"3% 6%"}}>
                        <LocationOnIcon sx={{fontSize:"42px", margin:"auto auto 0px auto"}} />
                        <h1 style={{margin:"0px, auto auto auto", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"normal"}}>Mumbai bandra</h1>
                    </div>
                </div>
                <div style={{height:"40%", width:"100%", display:"flex", flexDirection:"row"}}>
                    <h1 style={{fontFamily:"Roboto Mono", fontSize:"1.25em", fontWeight:"800", margin:"auto auto auto 4%"}}>KishanLal General Stores Mahadevpuram</h1>
                </div>
        </div>
    );
}

export default Outlets;

