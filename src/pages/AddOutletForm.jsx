import { Button, Dialog, OutlinedInput } from '@mui/material';
import { darkTheme } from '../utility/themes';
import { ThemeProvider } from '@emotion/react';
import { createContext, useContext, useReducer, useRef } from 'react';
import axios from 'axios';

const updateActions = {
    NAME:'name',
    LOCATION:'location',
    IMAGE:'image'
}

const formContext = createContext();

export function AddOutletForm({open, closeForm, edit, editProduct}) {

    function updateForm(state, update) {

        switch(update.type) {
            case updateActions.NAME:
                return {...state, name:update.value};
            case updateActions.LOCATION:
                return {...state, location:update.value};
            case updateActions.IMAGE:
                return {...state, image:update.value};
            default:
                return state;
        }

    }

    const [formDetails, dispatch] = useReducer(updateForm, edit?editProduct:{
        name:'',
        location:'',
        image:null
    });

    function validateForm() {
        return formDetails.name !== ''
            && formDetails.location !== ''
    }

    function addOutlet() {
        const formData = new FormData();
        [formDetails.image].map(image => {
            formData.append('images', image);
        })
        formData.append('outlet', JSON.stringify(formDetails));
        axios.post(`${import.meta.env.VITE_BACKEND}/outlets/`,formData,{ headers:{'Content-Type': 'multipart/form-data'}, withCredentials: true })
        .then(res => {
            closeForm();           
        })
        .catch(error => {
            console.log(error);
            closeForm();
        })
    }

    return (
        <Dialog
        open={open}
        onClose={closeForm}
        maxWidth="lg"
        >
            <div style={{padding:"20px"}}>
                <div style={{
                        margin:"10px auto"
                    }}>
                    <h1 
                        style={{
                            margin:"auto 5px 5px 5px",
                            fontSize:"22px",
                            fontFamily:"Roboto Mono",
                            fontWeight:"bold"
                            }}
                    >
                        Add Outlet
                    </h1>
                </div>
                <formContext.Provider value={[formDetails, dispatch]}>
                <div
                    className='flex-row'
                    style={{
                        margin:"10px auto"
                    }}
                >

                <div
                    className='flex-col'
                    style={{
                        margin:"10px 10px",
                        width:"400px"
                    }}
                >
                    <NameField />
                    <LocationField />
                    
                </div>

                <div
                    className='flex-col'
                    style={{
                        margin:"10px 10px",
                        width:"300px"
                    }}
                >

                    <ImageDisplay />

                </div>

                </div>
                </formContext.Provider>
                <div
                    style={{
                        display:'flex',
                        margin:"10px auto"
                    }}
                >
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{height:"35px", marginTop:"10px", marginBottom:"10px", marginLeft:"auto", marginRight:"10px", fontSize:"16px"}} variant="contained" size="medium" color="primary"
                            disabled={!validateForm()}
                            onClick={()=>{addOutlet()}}
                        >Add</Button>
                    </ThemeProvider>
                </div>
            </div>
        </Dialog>
    );

}

function NameField() {

    const [formDetails,dispatch] = useContext(formContext);

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
        <h3 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}} > Outlet Name <span style={{color:'red'}}>*</span> </h3>
        <ThemeProvider theme={darkTheme}>
        <OutlinedInput
            sx={{
                height:"50px",
                width:"100%"
            }}
            value={formDetails.name}
            placeholder='outlet name'
            onChange={(e)=>{
                dispatch({
                    type:updateActions.NAME,
                    value:e.target.value
                })
            }}
        />
        </ThemeProvider>
        </div>
    );
}

function LocationField() {

    const [formDetails,dispatch] = useContext(formContext);

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
        <h3 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}} > Location <span style={{color:'red'}}>*</span> </h3>
        <ThemeProvider theme={darkTheme}>
        <OutlinedInput
            sx={{
                height:"50px",
                width:"100%"
            }}
            value={formDetails.location}
            placeholder='location'
            onChange={(e)=>{
                dispatch({
                    type:updateActions.LOCATION,
                    value:e.target.value
                })
            }}
        />
        </ThemeProvider>
        </div>
    );
}

function ImageDisplay() {

    const [formDetails,dispatch] = useContext(formContext);
    const fileInputRef = useRef(null);

    function handleUploadClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        const selectedFiles = files.filter(file => allowedTypes.includes(file.type));
        
        if(selectedFiles.length>0) dispatch({
            type:updateActions.IMAGE,
            value:selectedFiles[0]
        })
    }

    return (
        <>
        <div className='flex-col' style={{height:'100%'}}>
        <h3 style={{margin:'5px 0px', fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold", textAlign:'center'}} > Logo </h3>
        {
          formDetails.image &&  <ImageCard img={formDetails.image} />
        }
        { formDetails.image===null && <div
                className='flex-row'
                onClick={handleUploadClick}
                style={{width:'100%', height:'100%', justifyContent:'center'}}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".jpeg,.jpg,.png,.mp4"
                    multiple
                    onChange={handleFileChange}
                />
                <div
                    className='flex-row'
                    style={{
                        borderRadius:"5px",
                        cursor:"pointer",
                        border:"2px",
                        borderStyle:"solid",
                        borderColor:"black",
                        backgroundColor:"rgb(49, 104, 216,0.18)",
                        height:"120px",
                        width:"120px",
                        margin:"5px",
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <h1 style={{fontSize:'48px'}}>+</h1>
                </div>
        </div> }

        </div>
        </>
    );
}

function ImageCard({img}) {
    return (
        <div className='flex-row' style={{width:'100%', height:'100%', justifyContent:'center'}}>
            {img &&
                (
                    <img
                    src={URL.createObjectURL(img)}
                    style={{
                        borderRadius:"5px",
                        border:"2px",
                        borderStyle:"solid",
                        borderColor:"black",
                        backgroundColor:"red",
                        height:"120px",
                        width:"120px",
                        margin:"5px",
                        objectFit:"cover"
                    }}
                    ></img>
                )
            }
            {!img &&
                (
                    <div
                    style={{
                        borderRadius:"5px",
                        border:"2px",
                        borderStyle:"solid",
                        borderColor:"white",
                        backgroundColor:"white",
                        height:"120px",
                        width:"120px",
                        margin:"5px",
                    }}
                    ></div>
                )
            }
        </div>
        
    );
}