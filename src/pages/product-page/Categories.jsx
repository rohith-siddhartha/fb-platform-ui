import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { OutlinedInput, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { darkTheme } from '../../utility/themes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Categories() {

    const [categories,setCategories] = useState([]);

    const [view, setView] = useState(true);

    const [add, setAdd] = useState(false);

    const [triggerReload, setTriggerReload] = useState(true);
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

    function triggerReloadFunc() {
        setTriggerReload(!triggerReload);
    }

    useEffect(
        getCategories,[triggerReload]
    )

    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", padding:"10px 5px", margin:"0px 0px 20px 0px", borderRadius:"5px", width:"100%", backgroundColor:"white"}}>
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
                <div style={{display:getView(), margin:"auto 5px", paddingTop:"5px", borderTop:categories.length===0?'0px':"1px", borderStyle:"solid", borderColor:"black"}}>
                    {add === true  &&
                        <AddTile setAdd={setAdd} triggerReload={triggerReloadFunc} />
                    }
                    {
                        categories.map((category,index) => {
                            return (
                                <Tile category={category} key={index} triggerReloadFunc={triggerReloadFunc} />
                            );
                        })
                    }
                </div>
                </div>
    );
}

function Tile({category, triggerReloadFunc}) {

    const [editMode, setEditMode] = useState(false);
    const [categoryNew, setCategoryNew] = useState(category.name);

    const navigate = useNavigate();

    function updateCategory() {

        axios.patch(`${import.meta.env.VITE_BACKEND}/categories/${category._id}`,
        {name:categoryNew},
        { withCredentials: true })
        .then(res => {
            triggerReloadFunc();
            setEditMode(false);           
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
            setEditMode(false);
        })

    }

    function deleteCategory() {

        axios.delete(`${import.meta.env.VITE_BACKEND}/categories/${category._id}`,
        { withCredentials: true })
        .then(res => {
            triggerReloadFunc();          
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            console.log(error);
        })

    }

    return (
        <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
            {editMode === false &&
                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category.name}</h1>
            }

            {editMode === true &&
                <ThemeProvider theme={darkTheme}>
                <OutlinedInput
                    sx={{
                        height:"31px",
                        width:"100%",
                        backgroundColor:'white',
                        fontWeight:"bold",
                        fontFamily:"Roboto Mono"
                    }}
                    value={categoryNew}
                    onChange={(e)=>{
                        setCategoryNew(e.target.value);
                    }}
                />
                </ThemeProvider>
            }

            <div className='flex-row ml-auto'>
                {editMode === false &&
                    <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                        onClick={() => {setEditMode(true)}}
                    >
                    <EditIcon fontSize="small"/>
                    </div>
                }
                {editMode === true &&
                    <div className='hover:bg-green' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                        onClick={updateCategory}
                    >
                    <DoneIcon fontSize="small"/>
                    </div>
                }
                <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                    onClick={deleteCategory}
                >
                <DeleteIcon fontSize="small"/>
                </div>
            </div>
        </div>
    );

}

function AddTile({setAdd, triggerReload}) {

    const [tagNew, setTagNew] = useState('');

    const navigate = useNavigate();

    function createCategory() {

        axios.post(`${import.meta.env.VITE_BACKEND}/categories`,
        {name:tagNew},
        { withCredentials: true })
        .then(res => {    
            setAdd(false);    
            triggerReload()   
        })
        .catch(error => {
            if(error.response.data.loginError){
                navigate('/login');
            }
            setAdd(false);
        })
    }

    return (
        <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
                <ThemeProvider theme={darkTheme}>
                <OutlinedInput
                    sx={{
                        height:"31px",
                        width:"100%",
                        backgroundColor:'white',
                        fontWeight:"bold",
                        fontFamily:"Roboto Mono"
                    }}
                    placeholder='add category'
                    value={tagNew}
                    onChange={(e)=>{
                        setTagNew(e.target.value);
                    }}
                />
                </ThemeProvider>

            <div className='flex-row ml-auto'>
                    <div className='hover:bg-green' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                        onClick={createCategory}
                    >
                    <DoneIcon fontSize="small"/>
                    </div>
                <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                    onClick={() => setAdd(false)}
                >
                <ClearIcon fontSize="small"/>
                </div>
            </div>
        </div>
    );

}