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
import { createContext, useEffect, useReducer, useState } from 'react';
import { Textarea } from '@mui/joy';
import { Categories } from './Categories';
import { Tags } from './Tags';
import { AddProductForm } from './AddProductForm';
import { ProductCard } from './ProductCard';
import { CheckBox } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const filterActions = {
    SEARCH_KEY:'search_key',
    CATEGORY:'category',
    ADD_TAG:'add_tag',
    REMOVE_TAG:'remove_tag'
}

export function ProductDashBoard() {

    return (
        <div className='flex-row page' style={{minHeight:'100vh', width:"100%", zIndex:0}}>
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

const productContext = createContext();

function Products() {

    const [products, setProducts] = useState([]);

    function filterReducer(state, update) {

        switch(update.type) {
            case filterActions.SEARCH_KEY:
                return {...state, searchKey:update.value};
            case filterActions.CATEGORY:
                return {...state, category:update.value};
            case filterActions.ADD_TAG:
                return {...state, tags:[...state.tags, update.value]};
            case filterActions.REMOVE_TAG:
                {
                    let tags = state.tags;
                    tags = tags.filter((tag) => tags.indexOf(tag)!==tags.indexOf(update.value));
                    return {...state, tags:tags}
                }
            default:
                return state;
        }

    }

    const [filter, dispatch] = useReducer(filterReducer, {
        category:null,
        tags:[],
        searchKey:''
    });


    const [edit, setEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const [openAddProductForm, setOpenAddProductForm] = useState(false);

    function openForm(editForm) {
        if(editForm) setEdit(true);
        setOpenAddProductForm(true);
    }

    const [trigger, triggerReload] = useState(true);

    const navigate = useNavigate();

    function closeForm() {
        setEdit(false);
        setEditProduct(null);
        setOpenAddProductForm(false);
    }

    const getProducts = async ()=>{
        axios.post(`${import.meta.env.VITE_BACKEND}/products/all`,filter,{withCredentials: true })
        .then(res => {
            setProducts(res.data); 
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
    },[trigger]);

    return (
        <div style={{zIndex:-1}}>
            <productContext.Provider value={[filter, dispatch]}>
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
                        <AddProductForm open={openAddProductForm} edit={edit} editProduct={editProduct} closeForm={closeForm} trigger={trigger} triggerReload={triggerReload} />
                        </div>
                </div>
                <Filters getProducts={getProducts} />
                <div>
                    {products.map((product,index) => {
                        return (
                            <ProductCard product={product} key={index} />
                        );
                    })}
                    {products.length===0 &&
                        <h1 style={{margin:"10px auto", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Add your first product to get started </h1>
                    }
                </div>
            </productContext.Provider>
        </div>
    );
}

function Filters({getProducts}) {

    const [openCategories, setOpenCategories] = useState(false);
    const [openTags, setOpenTags] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [filter,dispatch] = useContext(productContext);
    

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
        <div className='flex-row' style={{padding:"10px 0px", margin:"10px 0px"}}>
            <ThemeProvider theme={darkTheme}>
            <OutlinedInput
                onChange={(event)=>{dispatch({
                    type:filterActions.SEARCH_KEY,
                    value:event.target.value
                })}}
                placeholder='search'
                value={filter.searchKey}
                sx={{height:"50px"}}
            />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
                <Button sx={{height:"35px", margin:"auto 10px", fontSize:"16px"}} variant="contained" size="small" color="primary" onClick={getProducts} >search</Button>
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
    );
}

function SelectCategory({open, anchorEl, handleClose}) {

    const [categories, setCategories] = useState([]);

    const [filter,dispatch] = useContext(productContext);


    const navigate = useNavigate();

    function setCategory(category) {
        dispatch({
            type:filterActions.CATEGORY,
            value:category._id
        })
    }

    function getCategories(){

        axios.get(`${import.meta.env.VITE_BACKEND}/categories`,{ withCredentials: true })
        .then(res => {
            setCategories(res.data);            
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
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
                            <div className={( filter.category && cate._id===filter.category)?'bg-blue':'hover:bg-blue'} style={{padding:"5px"}} key={index}
                                onClick={()=>{setCategory(cate);handleClose()}}
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
    const [filter,dispatch] = useContext(productContext);
    const navigate = useNavigate();

    function addTag(tag) {
        dispatch({
            type:filterActions.ADD_TAG,
            value:tag._id
        })
    }

    function removeTag(tag) {
        dispatch({
            type:filterActions.REMOVE_TAG,
            value:tag._id
        })
    }

    function getTags(){

        axios.get(`${import.meta.env.VITE_BACKEND}/tags`,{ withCredentials: true })
        .then(res => {
            setTags(res.data);            
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
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
                            <SelectTag tag={tag} key={index} addValue={addTag} removeValue={removeTag} />
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