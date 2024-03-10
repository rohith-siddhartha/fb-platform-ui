import { Button, Grid, ThemeProvider } from "@mui/material";
import { darkTheme, img } from "../utility/themes";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import productLogo from "./../assets/product.png";
import analyticsLogo from "./../assets/analytics.png";
import organizationLogo from "./../assets/organize.png";
import { menuList } from "../utility/listsUtil";

export function Outlet(){

    return (
        <div className="flex-column full-width page" style={{padding:"30px 5%"}}>
            <div className="flex-row align-center" style={{}}>
                <img src={img} style={{border:"solid 0.5px", boxShadow:"0 0 2px 2px rgb(0 0 0 / 0.2", borderRadius:"4px", margin:"10px", objectFit:"fill", height:"60px"}} ></img>
                <h1 style={{margin:"auto 20px", fontSize:"20px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> KishanLal General Stores Mahadevpuram </h1>
                <div className="flex-row align-center">
                    <LocationOnIcon sx={{fontSize:"auto", textAlign:"center", margin:"0px 10px"}} />
                    <h1 style={{margin:"0px, auto auto auto", fontSize:"17px", fontFamily:"Roboto Mono", fontWeight:"normal"}}>Mumbai bandra</h1>
                </div>
            </div>
            <div>
                <hr style={{height:"2px", backgroundColor:"black", border:"none"}}></hr>
            </div>
            <div className="flex-row wrap" style={{overflow:""}}>
                {
                    menuList.map((menuI,index) => {
                        return <DashboardMenuCard menuI={menuI} key={index} />
                    })
                }
            </div>
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