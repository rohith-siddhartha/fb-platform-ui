import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Checkbox, Dialog, DialogContent, InputAdornment, MenuItem, OutlinedInput, Paper, Popover, Popper, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { darkTheme, userTheme } from '../../utility/themes';
import { ThemeProvider } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { Textarea } from '@mui/joy';
import { Categories } from './Categories';
import { Tags } from './Tags';
import { AddProductForm } from './AddProductForm';
import { ProductCard } from './ProductCard';
import { CheckBox } from '@mui/icons-material';
import axios from 'axios';

export function ProductDashBoard() {

    return (
        <div className='flex-row page' style={{width:"100%"}}>
            <div className="flex-col align-center" style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", margin:"2%", padding:"10px 10px", borderRadius:"5px", width:"75%", backgroundColor:"white"}}>
                <Products/>
            </div>
            <div className='flex-col' style={{margin:"1% 2% 0% 0%", padding:"10px 5px", width:"25%"}}>
                <Categories/>
                <Tags/>
            </div>
        </div>
    );
    
}

function Products() {

    const categories = ['apple', 'ball'];

    const products = ['vat', 'cat'];

    const [openCategories, setOpenCategories] = useState(false);
    const [openTags, setOpenTags] = useState(false);
    const [edit, setEdit] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [editProduct, setEditProduct] = useState(null);

    const [openAddProductForm, setOpenAddProductForm] = useState(false);

    function openForm(editForm) {
        if(editForm) setEdit(true);
        setOpenAddProductForm(true);
    }

    function closeForm() {
        setEdit(false);
        setEditProduct(null);
        setOpenAddProductForm(false);
    }

    const handleClickCategories = (event) => {
        setAnchorEl2(event.currentTarget);
        setOpenCategories(true);
    };

    const handleClickTags = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenTags(true);
    };

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    const handleCloseTags = () => {
        setOpenTags(false);
    };

    return (
        <div>
            <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 5px", fontSize:"24px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Products </h1>
                        </div>
                        <div className='flex-row' style={{marginLeft:"auto"}}>
                        <ThemeProvider theme={darkTheme}>
                            <Button 
                                sx={{height:"35px", margin:"auto 10px"}}
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={openForm}
                                >
                                    add +
                            </Button>
                        </ThemeProvider>
                        <AddProductForm open={openAddProductForm} edit={edit} editProduct={editProduct} closeForm={closeForm} />
                        </div>
                </div>
                <div className='flex-row' style={{padding:"10px 0px", margin:"10px 0px"}}>
                    <OutlinedInput
                        sx={{height:"50px"}}
                    />
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{height:"35px", margin:"auto 10px", fontSize:"16px"}} variant="contained" size="small" color="primary" >search</Button>
                    </ThemeProvider>
                    <div style={{margin:"auto 10px"}}>
                            <div className='flex-row' onClick={(e) => {handleClickCategories(e)}}>
                                <h1 style={{margin:"auto 0px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Categories </h1>
                                <div style={{borderRadius:"5px", padding:"auto 0px", margin:"auto 0px"}}>
                                    <ArrowDropDownIcon fontSize="large"/>
                                </div>
                            </div>
                        <SelectCategory open={openCategories} anchorEl={anchorEl2} handleClose={handleCloseCategories} />
                    </div>
                    <div style={{margin:"auto 10px"}}>
                        <div className='flex-row' onClick={(e) => {handleClickTags(e)}} style={{margin:"0px 10px"}}>
                                <h1 style={{margin:"auto 0px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Tags </h1>
                                <div style={{borderRadius:"5px", padding:"auto 0px", margin:"auto 0px"}}>
                                    <ArrowDropDownIcon fontSize="large"/>
                                </div>
                        </div>
                        <SelectTags open={openTags} anchorEl={anchorEl} handleClose={handleCloseTags} />
                    </div>
                </div>
                <div>
                    {products.map(p => {
                        return (
                            <ProductCard product={{}} />
                        );
                    })}
                </div>
        </div>
    );
}

function SelectCategory({open, anchorEl, handleClose}) {

    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    function getCategories(){

        axios.get(`http://localhost:8080/categories`,{ withCredentials: true })
        .then(res => {
            setCategories(res.data);            
        })
        .catch(error => {
            console.log(error);
        })

    }

    useEffect(
        getCategories,
        []
    )

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <Paper>
            <DialogContent style={{padding:"0px"}}>
                <div className="scrollable-div">
                    {categories.map((cate,index) => {
                        return (
                            <div className={cate===category?'bg-blue':'hover:bg-blue'} style={{padding:"5px"}} key={index}
                                onClick={()=>setCategory(cate)}
                            >
                                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{cate.name}</h1>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
            </Paper>
        </Popover>
    );
}

function SelectTags({open, anchorEl, handleClose}) {

    const [tags,setTags] = useState([]);
    const [values, setValues] = useState(new Set());

    console.log(values);

    const addValue = (value) => {
        setValues((prevValues) => new Set([...prevValues, value]));
    };

    const removeValue = (value) => {
        setValues((prevValues) => {
        const newValues = new Set(prevValues);
        newValues.delete(value);
        return newValues;
        });
    };

    function getTags(){

        axios.get(`http://localhost:8080/tags`,{ withCredentials: true })
        .then(res => {
            setTags(res.data);            
        })
        .catch(error => {
            console.log(error);
        })

    }

    useEffect(
        getTags,
        []
    )

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <Paper>
            <DialogContent style={{padding:"0px"}}>
                <div>
                    {tags.map((tag,index) => {
                        return (
                            <SelectTag tag={tag} key={index} addValue={addValue} removeValue={removeValue} />
                        );
                    })}
                </div>
            </DialogContent>
            </Paper>
        </Popover>
    );
}

function SelectTag({tag, addValue, removeValue}) {

    const [checked, setChecked] = useState(false);

    const addTag = (e) => {
        setChecked(e.target.checked)
        if(e.target.checked) addValue(tag);
        if(!e.target.checked) removeValue(tag);
    }

    return (
        <div style={{display:'flex', flexDirection:'row', padding:"5px"}}>
            <h1 style={{margin:"7px 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{tag.name}</h1>
            <ThemeProvider theme={darkTheme}>
                <Checkbox 
                
                checked={checked}
                onChange={addTag}
                inputProps={{ 'aria-label': 'controlled' }}
                size='small'
                sx={{marginLeft:'auto'}}

                />
            </ThemeProvider>
        </div>
    );

}