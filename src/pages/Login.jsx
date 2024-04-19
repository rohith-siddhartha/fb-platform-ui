import { Button, TextField, ThemeProvider } from "@mui/material";
import "@fontsource/roboto-mono";
import { darkTheme } from "../utility/themes";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import logo from './../assets/logo.png'
import logoS from './../assets/logo-s.png'

const iconStyle = {
        marginTop:"40px",
        marginBottom:"40px",
        width:"200px",
        height:"200px"
    }

function Login(){
    return (
        <div style={{display:"flex", flexDirection:"column", height:'100vh', width:'100%', justifyContent:'center', alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column", width:'50%', justifyContent:'center', alignItems:"center"}}>
                <div style={{ margin:'10px', alignItems:'flex-start', flexDirection:"column"}}>
                    <img src={logo} style={iconStyle} ></img>
                </div>
                <div style={{width:"100%", display:"flex", margin:'10px', alignItems:'center', flexDirection:"column"}}>
                    <LoginComponent/>
                </div>
            </div>
        </div>
    );
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function LoginComponent(){

    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = useState('');
    const [step, setStep] = React.useState("email");

    function validateMobile(){

        if(validateEmail(email)){
            console.log("errpr");
            return;
        }

        setStep("otp");

    }

    function getOtp() {
        axios.post(`${import.meta.env.VITE_BACKEND}/auth/otp`,{email:email},{withCredentials: true })
        .then(res => {
            setStep('otp');
        })
        .catch(error => {
            console.log(error);
        })
    }

    function loginUser(){

        axios.post(`${import.meta.env.VITE_BACKEND}/auth/login`,{
            email,
            otp
        },
        {withCredentials:true})
        .then(res => {
            navigate("/");
        })
        .catch(error => {
            console.log(error);
        })

    }

    return (
        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:'center'}}>
            <h1 style={{fontFamily:"Roboto Mono", fontSize:"2em", fontWeight:"bolder"}}>Login</h1>
            {/* <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"500"}}><b>Hi Mysore</b> | <span style={{cursor:"pointer", textDecoration:"underline", color:"blue"}}>not you?</span></h3> */}
            { step==="email" && <MobileValidation
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            getOtp={getOtp}
            /> }
            { step==="otp" && <AuthOneOTP otp={otp} setOtp={setOtp} login={loginUser} /> }
            <h3 style={{fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"500"}}>trouble logging in? <span style={{textDecoration:'underline'}}>contact our team</span> </h3>
        </div>
    );
}



function MobileValidation( {email, setEmail, getOtp} ){

    function setMobileWithValidation(event) {
        const mob = event.target.value;
        setEmail(mob);
    }

    return (
        <>
            <h3 style={{marginTop:'10px', marginBottom:'10px', fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Email</h3>
            <ThemeProvider theme={darkTheme}>
                <TextField sx={{width:"50%", marginBottom:"20px", marginTop:'10px'}} id="outlined-controlled" value={email} placeholder="Enter Email" onChange={setMobileWithValidation} />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" disabled={!validateEmail(email)}
                onClick={getOtp}>NEXT</Button>
            </ThemeProvider>
        </>
    );
}

function AuthOneOTP( {otp,setOtp,login} ){


    return (
        <>
            <h3 style={{marginTop:'10px', marginBottom:'10px', fontFamily:"Roboto Mono", fontSize:"1em", fontWeight:"600"}}>Enter the OTP</h3>
            <ThemeProvider theme={darkTheme}>
            <TextField sx={{width:"50%", marginBottom:"35px", marginTop:'10px'}} id="outlined-controlled" placeholder="Enter the OTP sent to your mobile" value={otp}
                onChange={(e)=>{setOtp(e.target.value)}}
            />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{width:"50%", marginBottom:"20px"}} variant="contained" size="large" color="primary" onClick={login}>Log In</Button>
            </ThemeProvider>
        </>
    );
}

export default Login;