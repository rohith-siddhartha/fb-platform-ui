import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Orders() {

    const [orders, setOrders] = useState([]);
    const {id} = useParams();

    const getOrders = async ()=>{

        axios.get(`${import.meta.env.VITE_BACKEND}/orders/${id}`,{withCredentials: true })
        .then(res => {
            setOrders(res.data); 
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getOrders();
    },[]);

    return (
        <div className='flex-row' style={{minHeight:'100vh', width:"100%", zIndex:0}}>
            <div className='flex-col' style={{margin:'20px', width:'60%'}}>
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
    return (
        <div className='flex-row page' style={{padding:"10px 10px", margin:"5px 0px", borderRadius:"5px"}}>
            {order.customerName}
        </div>
    );
}