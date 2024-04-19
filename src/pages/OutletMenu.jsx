import { Button, DialogContent, Paper, Popover, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { darkTheme } from "../utility/themes";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useParams } from "react-router-dom";


const filterOptions = {
    IN_MENU:'in_menu',
    NOT_IN_MENU:'not_in_menu'
}

export function OutletMenu() {

    const [products, setProducts] = useState([]);
    const [openCategories, setOpenCategories] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const {id} = useParams();
    const [filter, setFilter] = useState(filterOptions.IN_MENU);
    const [trigger, setTrigger]= useState(true);
    const navigate = useNavigate();

    const handleClickCategories = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenCategories(true);
    };

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    const getProducts = async ()=>{

        axios.get(`${import.meta.env.VITE_BACKEND}/menu/${ filter===filterOptions.NOT_IN_MENU?'notinmenu/':''}${id}`,{withCredentials: true })
        .then(res => {
            setProducts(res.data.products); 
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
    },[filter,trigger]);

    return (
        <div className='flex-row' style={{minHeight:'100vh', width:"100%", zIndex:0}}>
            <div className='flex-col' style={{margin:'20px', width:'60%'}}>
                <div className='flex-row'>
                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>show items</h1>
                    <div className='flex-row' onClick={(e) => {handleClickCategories(e)}}>
                        <h1 style={{margin:"auto 0px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> {filter} </h1>
                        <div style={{borderRadius:"5px", padding:"auto 0px", margin:"auto 0px"}}>
                            <ArrowDropDownIcon fontSize="large"/>
                        </div>
                    </div>
                    <SelectFilter open={openCategories} anchorEl={anchorEl} handleClose={handleCloseCategories} setFilter={setFilter} />
                </div>
                {
                    products.map((product,index)=>{
                        return (
                            <ProductCard product={product} filter={filter} trigger={trigger} setTrigger={setTrigger} key={index} />
                        );
                    })
                }
            </div>
            <div className='flex-col'>
                {/* <Categories /> */}
            </div>
        </div>
    );
    
}

export function ProductCard( {product, trigger, filter, setTrigger} ) {

    const {id} = useParams();

    const navigate = useNavigate();

    const addProductToMenu = async ()=>{
        axios.post(`${import.meta.env.VITE_BACKEND}/menu/product/add/${id}`,{productId:product._id},{withCredentials: true })
        .then(res => {
            setTrigger(!trigger); 
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    const removeProductToMenu = async ()=>{
        axios.post(`${import.meta.env.VITE_BACKEND}/menu/product/remove/${id}`,{productId:product._id},{withCredentials: true })
        .then(res => {
            setTrigger(!trigger); 
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    return (
        <div className='flex-row page' style={{padding:"10px 10px", margin:"5px 0px", borderRadius:"5px"}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{product.name}</h1>
            </div>
            {
                filter===filterOptions.IN_MENU &&
                <div className='flex-row ml-auto' style={{alignItems:'center'}}>
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{fontSize:"12px", margin:"5px 0px"}} variant="contained" size="small"
                            onClick={removeProductToMenu}
                        > Remove From Menu </Button>
                    </ThemeProvider>
                </div>
            }
            {
                filter===filterOptions.NOT_IN_MENU &&
                <div className='flex-row ml-auto' style={{alignItems:'center'}}>
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{fontSize:"12px", margin:"5px 0px"}} variant="contained" size="small"
                            onClick={addProductToMenu}
                        > Add To Menu </Button>
                    </ThemeProvider>
                </div>
            }
        </div>
    );
}

function SelectFilter({open, anchorEl, handleClose, setFilter}) {

    const filter = [filterOptions.IN_MENU, filterOptions.NOT_IN_MENU];

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
                    {filter.map((cate,index) => {
                        return (
                            <div className='hover:bg-blue' style={{padding:"5px"}} key={index}
                                onClick={()=>{setFilter(cate);handleClose()}}
                            >
                                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{cate}</h1>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
            </Paper>
        </Popover>
    );
}

export function Categories() {

    const [categories,setCategories] = useState([]);

    const [view, setView] = useState(true);

    const [add, setAdd] = useState(false);

    const navigate = useNavigate();

    function getView() {
        return view?'block':'none';
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
        getCategories,[]
    )

    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", padding:"10px 5px", margin:"30px 0px 20px 0px", borderRadius:"5px", width:"100%", backgroundColor:"white"}}>
                    <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 10px", fontSize:"22px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Categories </h1>
                            <div style={{borderRadius:"5px", padding:"0px 0px", margin:"0px 0px"}}>
                                <ArrowDropDownIcon fontSize="large"/>
                            </div>
                        </div>
                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 10px 0px auto"}}
                            onClick={() => {if(!view) setView(true); setAdd(true)}}
                        >
                            <h1 style={{margin:"0px 5px", fontSize:"22px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> + </h1>
                        </div>
                    </div>
                <div style={{display:getView(), margin:"auto 5px", paddingTop:"5px", borderStyle:"solid"}}>
                    {
                        categories.map((category,index) => {
                            return (
                                <Tile category={category} key={index} />
                            );
                        })
                    }
                </div>
                </div>
    );
}

function Tile({category}) {

    return (
        <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
            <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category.name}</h1>
        </div>
    );

}