import { Button, DialogContent, OutlinedInput, Paper, Popover, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { darkTheme } from "../utility/themes";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate, useParams } from "react-router-dom";
import { priceUnitMapping } from "../utility/listsUtil";
import { Category } from "@mui/icons-material";


const filterOptions = {
    IN_MENU:'in_menu',
    NOT_IN_MENU:'not_in_menu'
}

export function CreateOrder() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const {id} = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState({
        products:[],
        customerName:'',
        outletId:id
    });

    const getProducts = async ()=>{

        axios.get(`${import.meta.env.VITE_BACKEND}/menu/${id}`,{withCredentials: true })
        .then(res => {
            setProducts(res.data.products);
            setCategories(res.data.categories);
            setTags(res.data.tags);
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    const createOrder = async ()=>{

        axios.post(`${import.meta.env.VITE_BACKEND}/orders`,{...order, timestamp:Date.now()},{withCredentials: true })
        .then(res => {
            setOrder({
                products:[],
                customerName:'',
                outletId:id
            });
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
    },[]);

    function calculateTotal() {
        var sum=0;
        order.products.forEach(product => {
            sum += product.price * product.quantity;
        });
        return sum;
    }

    return (
        <div className='flex-row' style={{minHeight:'100vh', width:"100%", zIndex:0}}>
            <div className='flex-col' style={{margin:'20px', width:'60%'}}>
                <div className='flex-row' style={{margin:"20px 0px"}}>
                    {
                        tags.map((tag,index)=>{
                            return (
                                <div style={{cursor:'pointer',   margin:'0px 5px', borderRadius:5, borderStyle:'solid', borderColor:'black', borderWidth:1, backgroundColor:selectedTags.includes(tag)?'#08d450':'white'}} key={index}
                                    onClick={()=>{
                                        if(!selectedTags.includes(tag)){
                                            setSelectedTags([...selectedTags, tag])
                                        }else { 
                                            const updatedTags = selectedTags.filter(tagX => tagX !== tag);
                                            setSelectedTags(updatedTags);
                                        } 
                                    }
                                    }
                                >
                                    <h1 style={{margin:"3px 6px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{tag.name}</h1>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    categories.map((category,index)=>{
                        return (
                            <CategoryProducts category={category} order={order} setOrder={setOrder} selectedTags={selectedTags} products={products} key={index} />
                        );
                    })
                }
            </div>
            <div className='flex-col' style={{margin:'20px', width:'30%'}}>
                {/* {order.products.map(p => {
                    return <h1 style={{color:'black'}}>{p.productId}{p.quantity}</h1>
                })}
                <h1>hello + {order.products.length}</h1> */}
                <div className='flex-col page' style={{padding:'20px', borderRadius:5, width:'100%'}}>
                    <h1 style={{margin:"auto 5px 0px 5px", fontSize:"24px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>Order</h1>
                    <div className='flex-col' style={{padding:'10px 0px', margin:'10px 0px', borderTop:order.products.length===0?0:1, borderBottom:order.products.length===0?0:1, borderStyle:'solid', borderColor:'black'}}>
                        {
                            order.products.map((product, index) => {
                                return (
                                    <div className='flex-row' key={index} style={{}}>
                                        <h1 style={{maxWidth:'120px', margin:"5px 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{product.name}{' - '}</h1>
                                        <h1 style={{margin:"5px 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{product.quantity} <span style={{fontSize:'14px'}}>x {product.price}</span></h1>
                                        <h1 style={{margin:"5px 5px 0px auto", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'Rs.'}{product.quantity * product.price}</h1>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {order.products.length===0 && <div className='flex-row'>
                        <h1 style={{margin:"5px 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>Add Prodcuts</h1>
                    </div>}
                    {order.products.length>0 && <div className='flex-row'>
                        <h1 style={{margin:"5px 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>Total</h1>
                        <h1 style={{margin:"5px 5px 0px auto", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'Rs.'}{calculateTotal()}</h1>
                    </div>}
                </div>
                <NameField order={order} setOrder={setOrder} />
                <div style={{width:'100%', margin:'20px 0px'}}>
                    <ThemeProvider theme={darkTheme}>
                        <Button 
                            sx={{height:"35px", width:'100%'}}
                            variant="contained"
                            size="medium"
                            color="primary"
                            onClick={createOrder}
                            >
                                create order
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
    
}

function CategoryProducts({products, category, order, setOrder, selectedTags}) {

    function hasCommonElement(array1, array2) {
        if(array1.length===0) return true;
        return array1.some(item1 => array2.some(item2 => item1._id === item2._id));
    }

    const [view, setView] = useState(true);

    return (
        <div className='flex-col' style={{cursor:'pointer', marginBottom:'20px', paddingBottom:'20px', width:'100%', borderBottom:1, borderStyle:'solid'}}>
            <div style={{display:'flex', flexDirection:'row'}} onClick={()=>{setView(!view)}}>
                <h1 style={{margin:"auto 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category.name}</h1>
                <ExpandLessIcon size="large" sx={{marginRight:'5px', marginLeft:'auto', fontSize:'24px', color:'black'}} />
            </div>
            <div>
            {   view &&
                products.map((product,index)=>{
                    if(category._id===product.category._id && hasCommonElement(selectedTags,product.tags)){ return <ProductCard product={product} order={order} setOrder={setOrder} key={index} />}
                    return null;
                })
            }
            </div>
        </div>
    );
}

function NameField({order, setOrder}) {

    return (
        <div
            className='flex-col'
            style={{
                margin:"10px auto"
            }}
        >
        <ThemeProvider theme={darkTheme}>
        <OutlinedInput
            sx={{
                height:"50px",
                width:"100%"
            }}
            value={order.customerName}
            placeholder='customer name'
            onChange={(e)=>{
                setOrder({...order, customerName:e.target.value})
            }}
        />
        </ThemeProvider>
        </div>
    );
}


export function ProductCard( {product, order, setOrder} ) {

    function checkIfOrderHasAProduct() {

        for(let i=0;i<order.products.length;i++){
            if(order.products[i].productId===product._id){
                return true;
            }
        }

        return false;

    }

    function getIndexIfOrderHasAProduct() {

        for(let i=0;i<order.products.length;i++){
            if(order.products[i].productId===product._id){
                return i;
            }
        }

    }

    function increase() {
        const updatedOrder = { ...order };
        const index = getIndexIfOrderHasAProduct();
    
        if (index !== undefined) {
            updatedOrder.products[index].quantity += 1;
        } else {
            updatedOrder.products.push({
                productId: product._id,
                quantity: 1,
                name: product.name,
                price: product.PPU
            });
        }
        setOrder(updatedOrder);
    }
    
    function decrease() {
        const updatedOrder = { ...order };
        const index = getIndexIfOrderHasAProduct();
    
        if (index !== undefined && updatedOrder.products[index].quantity > 0) {
            updatedOrder.products[index].quantity -= 1;
            if(updatedOrder.products[index].quantity===0) {
                updatedOrder.products.splice(index,1);
            }
        }
        setOrder(updatedOrder);
    }

    function getValue() {
       return checkIfOrderHasAProduct()?order.products[getIndexIfOrderHasAProduct()].quantity:0
    }

    return (
        <div className='flex-row page' style={{padding:"10px 10px", margin:"5px 0px", borderRadius:"5px"}}>
            <div>
                <img src={`${import.meta.env.VITE_BACKEND}/images/${product.images[0]}`} style={{border:"solid 0.5px", boxShadow:"0 0 2px 2px rgb(0 0 0 / 0.2", borderRadius:"4px", margin:"10px", objectFit:"fill", height:"60px"}} ></img>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h1 style={{margin:"auto 5px 0px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{product.name}</h1>
                <p style={{margin:"auto 5px 5px 5px", fontSize:"16px", fontFamily:"Roboto Mono"}}>{product.description}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column', marginLeft:'auto'}}>
                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'RS.'}{product.PPU}{'/'}{priceUnitMapping[product.UOM]}</h1>
                <div style={{marginTop:5, display:'flex', flexDirection:'row', marginLeft:'auto', borderWidth:1, borderStyle:'solid', borderColor:'black', borderRadius:5}}>
                    <div style={{cursor:'pointer', backgroundColor:'black', borderTopLeftRadius:4, borderBottomLeftRadius:4}}
                        onClick={decrease}
                    >
                        <h1 style={{margin:'auto 5px', color:'white', fontSize:'18px', fontFamily:"Roboto Mono", fontWeight:"bold"}}>-</h1>
                    </div>
                    <div style={{width:'60px', textAlign:"center"}}>
                        <h1 style={{margin:'auto 5px', fontSize:'18px', fontFamily:"Roboto Mono", fontWeight:"bold"}}>{getValue()}</h1>
                    </div>
                    <div style={{cursor:'pointer', backgroundColor:'black', borderTopRightRadius:4, borderBottomRightRadius:4}}
                        onClick={increase}
                    >
                        <h1 style={{margin:'auto 5px', color:'white', fontSize:'18px', fontFamily:"Roboto Mono", fontWeight:"bold"}}>+</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}