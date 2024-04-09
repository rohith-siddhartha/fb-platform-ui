import { Button, TextField, ThemeProvider } from "@mui/material";
import "@fontsource/roboto-mono";
import { darkTheme } from "../utility/themes";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

function Login(){
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <div style={{backgroundColor:"black", height:"100%", width:"50%"}}>
                hey
            </div>
            <div style={{width:"50%", display:"flex", alignItems:"center", flexDirection:"column"}}>
                <LoginComponent/>
            </div>
        </div>
    );
}

function LoginComponent(){

    const navigate = useNavigate();

    const [mobile, setMobile] = React.useState("");

    const [step, setStep] = React.useState("mobile");


    function setMob(m){
        setMobile(m);
    }

    function validateMobile(){

        if(mobile.length!==10){
            console.log("errpr");
            return;
        }

        setStep("a");

    }

    function loginUser(){

        axios.post(`http://localhost:8080/auth/login`,{
            mobile
        },
        {withCredentials:true})
        .then(data => {
            console.log(data);
            navigate("/");
        })
        .catch(error => {
            console.log(error);
        })

    }

    return (
        <div style={{width:"100%", marginTop:"20%", display:"flex", flexDirection:"column"}}>
            <h1 style={{fontFamily:"Roboto Mono", fontSize:"2em", fontWeight:"bolder"}}>Login</h1>
            {/* <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"500"}}><b>Hi Mysore</b> | <span style={{cursor:"pointer", textDecoration:"underline", color:"blue"}}>not you?</span></h3> */}
            { step==="mobile" && <MobileValidation
            login={loginUser}
            mobile={mobile}
            setMobile={setMob}
            /> }
            { step==="a" && <AuthOneOTP loginUser={loginUser} /> }
            { step==="b" && <AuthPASSorOTP/> }
            { step==="c" && <AuthPASSandOTP/> }
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"500"}}>trouble logging in? <Link to="/customer-care"> contact our team </Link> </h3>
        </div>
    );
}



function MobileValidation( {mobile, setMobile, login} ){

    function setMobileWithValidation(event) {
        const mob = event.target.value;
        if(mob.length>10) return;
        setMobile(mob);
    }

    function validateMobile(mobileNumber) {
        const mobileNumberRegex = /^[0-9]{10}$/;
        return mobileNumberRegex.test(mobileNumber);
    }

    return (
        <>
            <h3 style={{marginTop:'10px', marginBottom:'10px', fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Mobile Number</h3>
            <ThemeProvider theme={darkTheme}>
                <TextField sx={{width:"50%", marginBottom:"20px", marginTop:'10px'}} id="outlined-controlled" defaultValue={mobile} value={mobile} placeholder="Enter your mobile number" onChange={setMobileWithValidation} />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" disabled={!validateMobile(mobile)} onClick={()=>{login()}}>NEXT</Button>
            </ThemeProvider>
        </>
    );
}

function AuthPASSorOTP(){


    return (
        <>
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Enter password</h3>
            <TextField sx={{width:"50%", marginBottom:"5px"}} id="outlined-controlled" placeholder="Enter your password" />
            <h3 style={{cursor:"pointer", fontFamily:"Roboto Mono",  textDecoration:"underline", color:"blue", marginBottom:"30px", fontSize:"1em", fontWeight:"600"}}>login with OTP</h3>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" onClick={()=>{validateMobile();}}>Log In</Button>
            </ThemeProvider>
        </>
    );
}

function AuthOneOTP( {loginUser} ){


    return (
        <>
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Enter the OTP</h3>
            <TextField sx={{width:"50%", marginBottom:"35px"}} id="outlined-controlled" placeholder="Enter the OTP sent to your mobile" />
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" onClick={()=>{loginUser();}}>Log In</Button>
            </ThemeProvider>
        </>
    );
}

function AuthPASSandOTP(){


    return (
        <>
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Enter password</h3>
            <TextField sx={{width:"50%", marginBottom:"15px"}} id="outlined-controlled" placeholder="Enter your password" />
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Enter the OTP</h3>
            <TextField sx={{width:"50%", marginBottom:"35px"}} id="outlined-controlled" placeholder="Enter the OTP sent to your mobile" />
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" onClick={()=>{validateMobile();}}>Log In</Button>
            </ThemeProvider>
        </>
    );
}

export default Login;