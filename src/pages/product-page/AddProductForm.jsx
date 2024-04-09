import { Button, Dialog, MenuItem, OutlinedInput, Select } from '@mui/material';
import { darkTheme } from '../../utility/themes';
import { ThemeProvider } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Textarea } from '@mui/joy';
import { createContext, useContext, useReducer, useRef, useState } from 'react';
import { UOM } from '../../utility/listsUtil';

const updateActions = {
    NAME:'name',
    DECRIPTION:'description',
    IMAGE_ADD:'image_add',
    IMAGE_REMOVE:'image_add',
    UOM:'uom',
    PPU:'ppu'
}

const formContext = createContext();

export function AddProductForm({open, closeForm, edit, editProduct}) {

    function updateForm(state, update) {

        switch(update.type) {
            case updateActions.NAME:
                return {...state, name:update.value};
            case updateActions.DECRIPTION:
                return {...state, description:update.value};
            case updateActions.IMAGE_ADD:
                return {...state, images:[...state.images, ...update.value]};
            case updateActions.IMAGE_REMOVE:
                {
                    let images = state.images;
                    images.splice(update.value,1);
                    return {...state, images:images}
                }
            case updateActions.UOM:
                return {...state, UOM:update.value};
            case updateActions.PPU:
                return {...state, PPU:update.value};
            default:
                return state;
        }

    }

    const [formDetails, dispatch] = useReducer(updateForm, edit?editProduct:{
        name:'',
        description:'',
        images:[],
        UOM:'number',
        PPU:''
    });

    function validateForm() {
        return formDetails.name !== ''
            && formDetails.UOM !== ''
            && formDetails.PPU !== ''
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
                        Add Product
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
                    <DescriptionField />
                    <Images />
                    
                </div>

                <div
                    className='flex-col'
                    style={{
                        margin:"10px 10px",
                        width:"300px"
                    }}
                >

                    {/* <Variants /> */}

                    {/* <div
                        className='flex-col'
                        style={{
                            margin:"10px auto",
                            width:"100%"
                        }}
                    >
                        <h3
                        style={{
                            margin:"auto 5px 5px 5px",
                            fontSize:"18px",
                            fontFamily:"Roboto Mono",
                            fontWeight:"bold"
                        }}
                        >
                            unit of measure 
                        </h3>
                        <ThemeProvider theme={darkTheme}>
                            <Select
                                value={1}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    height:"50px",
                                    width:"100%"
                                }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </ThemeProvider>
                    </div> */}

                    <SelectUOM />

                    {/* <div
                        className='flex-col'
                        style={{
                            margin:"10px auto"
                        }}
                    >
                        <h3
                        style={{
                            margin:"auto 5px 5px 5px",
                            fontSize:"18px",
                            fontFamily:"Roboto Mono",
                            fontWeight:"bold"
                        }}
                        >
                            price per unit 
                        </h3>
                        <ThemeProvider theme={darkTheme}>
                            <OutlinedInput
                                sx={{height:"50px", width:"100%"}}
                                placeholder='name'
                            />
                        </ThemeProvider>
                    </div> */}

                    <SelectPPU />

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
                            onClick={() => {console.log(formDetails)}}
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
        <h3 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}} > Name <span style={{color:'red'}}>*</span> </h3>
        <ThemeProvider theme={darkTheme}>
        <OutlinedInput
            sx={{
                height:"50px",
                width:"100%"
            }}
            value={formDetails.name}
            placeholder='name'
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

function DescriptionField() {

    const [formDetails,dispatch] = useContext(formContext);

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
        <h3 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}} > Description </h3>
        {/* <ThemeProvider theme={darkTheme}> */}
            <Textarea
                placeholder="description…"
                minRows={3}
                value={formDetails.description}
                style={{borderColor:"black"}}
                onChange={(e) => {
                    dispatch({
                        type:updateActions.DECRIPTION,
                        value:e.target.value
                    })
                }}
            />
        {/* </ThemeProvider> */}
        </div>
    );
}

function Images() {

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
        <h3 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}} > Images </h3>
        <div className='flex-row'>
            <ImageDisplay />
        </div>
        </div>
    );

}

function ImageDisplay() {

    const [formDetails,dispatch] = useContext(formContext);
    const [start, setStart] = useState(0);
    const fileInputRef = useRef(null);

    function handleUploadClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        const selectedFiles = files.filter(file => allowedTypes.includes(file.type));
        
        dispatch({
            type:updateActions.IMAGE_ADD,
            value:selectedFiles
        })
        console.log('Selected files:', selectedFiles);
    }

    function slideLeft() {
        if(start > 0) {
            setStart(start-1);
        }
    }

    function slideRight() {
        if(start < formDetails.images.length-1) {
            setStart(start+1);
        }
    }

    function displayImages(){
        var images = [];
        for(let i=start;i<start+3;i++){
           if(i<formDetails.images.length) images.push(<ImageCard img={formDetails.images[i]} />);    
        }
        if(images.length===1){
            images.push(<ImageCard img={null} />);
        }
        return images;
    }

    return (
        <>
        <div className='flex-row'>
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
            }}
            onClick={slideLeft}
        >
        <KeyboardArrowLeftIcon />
        </div>
        {
            displayImages()
        }
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
            }}
            onClick={slideRight}
        >
        <KeyboardArrowRightIcon />
        </div>

        <div
                className='flex-row'
                onClick={handleUploadClick}
                style={{cursor:"pointer"}}
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
                        border:"2px",
                        borderStyle:"solid",
                        borderColor:"black",
                        backgroundColor:"rgb(49, 104, 216,0.18)",
                        height:"80px",
                        width:"70px",
                        margin:"5px",
                    }}
                >
                    <div style={{margin:"auto auto"}}>
                    <h1 style={{fontSize:"40px", padding:"0px", margin:"0px"}}>+</h1>
                    </div>
                </div>
        </div>

        </div>
        </>
    );
}

function ImageCard({img}) {
    return (
        <div>
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
                        height:"80px",
                        width:"70px",
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
                        height:"80px",
                        width:"70px",
                        margin:"5px",
                    }}
                    ></div>
                )
            }
        </div>
        
    );
}

function Variants() {
    return (
                    <div
                        className='flex-col'
                        style={{
                            margin:"10px auto"
                        }}
                    >
                        <h3
                        style={{
                            margin:"auto 5px 5px 5px",
                            fontSize:"18px",
                            fontFamily:"Roboto Mono",
                            fontWeight:"bold"
                        }}
                        >
                            Variants 
                        </h3>
                        <VariantCard />
                        <VariantCard />
                    </div>
    );
}

function VariantCard() {

    const [formDetails,dispatch] = useContext(formContext);

    const [editMode, setEditMode] = useState(false);

    function onEditMode() {
        setEditMode(true);
    }

    function offEditMode() {
        setEditMode(false);
    }

    return(
        <div className='flex-row'
            style={{
                margin:"10px auto",
                padding:"10px auto"
            }}
        >
                        <div
                            className='flex-col'
                            style={{
                                margin:"0px",
                                backgroundColor:"rgb(49, 104, 216,0.18)",
                                borderRadius:"5px",
                                width:"80%",
                                padding:"10px"
                            }}
                        >
                            <div
                                className='flex-row'
                            >
                                {
                                    editMode && (
                                        <ThemeProvider theme={darkTheme}>
                                        <OutlinedInput
                                            sx={{
                                                margin:"2px 5px",
                                                height:"35px",
                                                backgroundColor:"white",
                                                fontSize:"16px",
                                                fontFamily:"Roboto Mono",
                                                fontWeight:"bold",
                                                borderColor:"black",
                                                borderStyle:"solid",
                                                border:"0px"
                                            }}
                                            value={'hello'}
                                            placeholder='name'
                                            onChange={(e)=>{
                                                dispatch({
                                                    type:updateActions.NAME,
                                                    value:e.target.value
                                                })
                                            }}
                                        />
                                        </ThemeProvider>
                                    )
                                }
                                {
                                    !editMode && (
                                        <h3
                                            style={{
                                                margin:"auto 5px 5px 5px",
                                                fontSize:"18px",
                                                fontFamily:"Roboto Mono",
                                                fontWeight:"bold"
                                            }}
                                        >
                                            changer c
                                        </h3>
                                    )
                                }
                                {
                                    editMode && (
                                        <ThemeProvider theme={darkTheme}>
                                        <OutlinedInput
                                            sx={{
                                                margin:"2px 5px 2px auto",
                                                height:"35px",
                                                backgroundColor:"white",
                                                borderColor:"black",
                                                borderStyle:"solid",
                                                border:"0px",
                                                fontSize:"16px",
                                                fontFamily:"Roboto Mono",
                                                fontWeight:"bold",
                                                width:"120px"
                                            }}
                                            value={'hello'}
                                            placeholder='name'
                                            onChange={(e)=>{
                                                dispatch({
                                                    type:updateActions.NAME,
                                                    value:e.target.value
                                                })
                                            }}
                                        />
                                        </ThemeProvider>
                                    )
                                }
                                {
                                    !editMode && (
                                        <h3
                                            style={{
                                                margin:"auto 5px 5px auto",
                                                fontSize:"18px",
                                                fontFamily:"Roboto Mono",
                                                fontWeight:"bold"
                                            }}
                                        >
                                            1235
                                        </h3>
                                    )
                                }
                            </div>
                        </div>
                        <div className='flex-row' 
                            style={{margin:"0px 5px"}}
                        >
                        <div className='hover:bg-blue'
                            style={{borderRadius:"5px", padding:"2px 5px", margin:"auto 5px"}}
                            onClick={onEditMode}
                        >
                            <EditIcon fontSize="small"/>
                        </div>
                        <div className='hover:bg-red' style={{borderRadius:"5px", padding:"2px 5px", margin:"auto 5px"}}>
                            <DeleteIcon fontSize="small"/>
                        </div>
                        </div>
        </div>
    );
}

function SelectUOM() {

    const [formDetails,dispatch] = useContext(formContext);

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto",
                width:"100%"
            }}
        >
            <h3
            style={{
                margin:"auto 5px 5px 5px",
                fontSize:"18px",
                fontFamily:"Roboto Mono",
                fontWeight:"bold"
            }}
            >
                unit of measure <span style={{color:'red'}}>*</span>
            </h3>
            <ThemeProvider theme={darkTheme}>
                <Select
                    value={formDetails.UOM}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        height:"50px",
                        width:"100%"
                    }}
                    onChange={(e) => {
                        dispatch({
                            type:updateActions.UOM,
                            value:e.target.value
                        })
                    }}
                >
                {
                    UOM.map((uom, index) => {
                        return <MenuItem value={uom} key={index}>{uom}</MenuItem>
                    })
                }
                </Select>
            </ThemeProvider>
        </div>
    );

}

function SelectPPU() {

    const [formDetails,dispatch] = useContext(formContext);

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
            <h3
            style={{
                margin:"auto 5px 5px 5px",
                fontSize:"18px",
                fontFamily:"Roboto Mono",
                fontWeight:"bold"
            }}
            >
                price per unit <span style={{color:'red'}}>*</span>
            </h3>
            <ThemeProvider theme={darkTheme}>
                <OutlinedInput
                    sx={{height:"50px", width:"100%"}}
                    placeholder='price per unit'
                    value={formDetails.PPU}
                    type='number'
                    onChange={(e) => {
                        dispatch({
                            type:updateActions.PPU,
                            value:e.target.value
                        })
                    }}
                />
            </ThemeProvider>
        </div>
    );

}