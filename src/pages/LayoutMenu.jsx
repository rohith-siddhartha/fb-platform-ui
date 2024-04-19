import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from './../assets/logo.png'
import logoS from './../assets/logo-s.png'
import user from './../assets/profile.png'
import { Button, ThemeProvider } from "@mui/material";
import { darkTheme } from "../utility/themes";
import { getIcon } from "../utility/icons";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";


function LayoutMenu(){

    const matches = useMediaQuery('(min-width:1100px)');

    const [userOptions, setUserOptions] = React.useState(false);

    function getMenuWidth(){
        return matches?"160px":"80px";
    }

    const iconStyle = {
        marginTop:matches?"40px":"40px",
        marginBottom:matches?"40px":"40px",
        width:matches?"120px":"60px",
        height:matches?"120px":"60px"
    }

    return (
        <div style={{position:'relative', height:"100vh", display:"flex", alignItems:"center", flexDirection:"column", backgroundColor:"white", width:getMenuWidth(), boxShadow:"4px 0px 8px -4px rgb(49, 104, 216,1)"}}>
            <img src={matches?logo:logoS} style={iconStyle} ></img>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                <Item name={"Outlets"}/>
                <Item name={"Products"}/>
                <Item name={"Analytics"}/>
            </div>
            <div style={{width:"100%", marginTop:"auto", justifyContent:"space-evenly", display:"flex", flexDirection:"row"}}>
                <img src={user} onMouseEnter={()=>{setUserOptions(true)}} onMouseLeave={()=>{setUserOptions(false)}} style={{marginLeft:"auto", marginRight:"auto", marginBottom:"20px", cursor:"pointer", width:matches?"60px":"40px", height:matches?"60px":"40px"}} ></img>
                { userOptions && <GetUserOptions setUserOptions={setUserOptions} /> }
            </div>       
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"79%", marginTop:"10px", marginBottom:"20px"}} variant="contained" size="medium" color="primary" >{getIcon("support")} {matches?"Support":""}</Button>
            </ThemeProvider>
        </div>
    );
}


function GetUserOptions({setUserOptions}){

    const matches = useMediaQuery('(min-width:1100px)');

    const navigate = useNavigate();

    function logout() {
        axios.post(`${import.meta.env.VITE_BACKEND}/user/logout`,{},{withCredentials: true })
        .then(res => {
            navigate('/login');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div onMouseEnter={()=>{setUserOptions(true)}} onMouseLeave={()=>{setUserOptions(false)}} style={{position:"fixed", boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)", left:matches?"100px":"60px", bottom:"80px", zIndex:1, backgroundColor:"white", display:"flex", flexDirection:"column", alignItems:"center", borderRadius:"6px", width:"120px"}}>
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{width:"100px", marginTop:"10px", fontSize:"12px", marginBottom:"0px"}} variant="contained" size="medium" color="primary" >profile</Button>
                    </ThemeProvider>
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{width:"100px", marginTop:"10px", fontSize:"12px", marginBottom:"10px"}} variant="contained" size="medium" color="primary"
                            onClick={logout}
                         >log out</Button>
                    </ThemeProvider>
        </div>
    );
}

function Item({name}){

    const navigate  = useNavigate();
    const location = useLocation();
    const matches = useMediaQuery('(min-width:1100px)');

    function isActive(){
        // if(("/"+name.toLowerCase()).startsWith(location.pathname)){
        //     return "#ebebeb";
        // }
        if(location.pathname.includes(name.toLowerCase())){
            return "#ebebeb";
        }
        console.log(location.pathname);
    }

    return (
        <div className="item" onClick={ () => {navigate(name.toLowerCase())}} style={{cursor:"pointer", width:"100%", margin:"3px 0px", textAlign:"center", backgroundColor:isActive(), height:"40px", justifyContent:matches?"normal":"space-evenly", display:"flex", flexDirection:"row", alignItems:"center"}}>
            {getIcon(name.toLowerCase())}
            { matches && <h3 style={{fontFamily:"Roboto Mono", fontSize:"15px", fontWeight:"bolder", margin:"0px 0px"}}>{name}</h3>}
        </div>
    );
}

export default LayoutMenu;