import { DialogContent, Paper, Popover } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Orders() {

    const [orders, setOrders] = useState([]);
    const {id} = useParams();


    const navigate = useNavigate();

    const getOrders = async ()=>{

        axios.get(`${import.meta.env.VITE_BACKEND}/orders/${id}`,{withCredentials: true })
        .then(res => {
            setOrders(res.data); 
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })
    }

    useEffect(() => {
        getOrders();
    },[]);

    return (
        <div className='flex-col' style={{minHeight:'100vh', width:"100%", zIndex:0}}>
            <div className='flex-col page' style={{padding:"10px 10px", margin:"20px", borderRadius:"5px", width:'80%'}}>
                <div className='flex-row'>
                    <div style={{width:'20%'}}>
                        <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'customer name'}</h1>
                    </div>
                    <div style={{width:'40%'}}>
                        <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'order id'}</h1>
                    </div>
                    <div style={{marginLeft:'auto', width:'20%'}}>
                        <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'price'}</h1>
                    </div>
                    <div style={{marginLeft:'auto', width:'20%'}}>
                        <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'status'}</h1>
                    </div>
                </div>
            </div>
            <div className='flex-col' style={{margin:'20px', width:'80%'}}>
                {
                    orders.map((order,index)=>{
                        return (
                            <OrderCard order={order} key={index} />
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

function OrderCard({order}) {

    function calculateTotal() {
        let price=0;
        order.products.forEach(product => {
            price+=product.price*product.quantity;
        })
        return price;
    }

    const [openCategories, setOpenCategories] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickCategories = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenCategories(true);
    };

    const handleCloseCategories = () => {
        setOpenCategories(false);
    };

    return (
        <div className='flex-col page' style={{padding:"10px 10px", margin:"5px 0px", borderRadius:"5px"}}>
            <div className='flex-row'>
                <div style={{width:'20%'}}>
                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{order.customerName}</h1>
                </div>
                <div style={{width:'40%'}}>
                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{order._id}</h1>
                </div>
                <div style={{marginLeft:'auto', width:'20%'}}>
                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'Rs.'}{calculateTotal()}</h1>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginLeft:'auto', width:'20%'}}>
                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{order.status}</h1>
                    <ArrowDropDownIcon size='large' sx={{padding:'auto'}} onClick={(e) => {handleClickCategories(e)}} />
                    <SelectFilter open={openCategories} anchorEl={anchorEl} handleClose={handleCloseCategories} />
                </div>
            </div>
            <div>
                <div style={{width:'100%'}}>
                    <h1 style={{margin:"auto 5px 5px 5px", display:'inline', fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>Items - </h1>
                    {
                        order.products.map((product,index) => {
                            return (
                                <h1 key={index} style={{display:'inline', margin:'0px 5px', fontSize:"14px", fontFamily:"Roboto Mono"}}>{product.name}{' x '}{product.quantity} {index===order.products.length-1?'':','}</h1>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

const orderStatusOptions = {
    IN_PROCESS:'in process',
    READY:'ready',
    DONE:'closed'
}

function SelectFilter({open, anchorEl, handleClose}) {

    const filter = [orderStatusOptions.IN_PROCESS, orderStatusOptions.READY, orderStatusOptions.DONE];

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
                                onClick={()=>{}}
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