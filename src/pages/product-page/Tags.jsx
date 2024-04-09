import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { OutlinedInput, ThemeProvider } from '@mui/material';
import { darkTheme } from '../../utility/themes';
import axios from 'axios';

export function Tags() {

    const [tags,setTags] = useState([]);

    const [view, setView] = useState(true);

    const [add, setAdd] = useState(false);

    const [triggerReload, setTriggerReload] = useState(true);

    function getView() {
        return view?'block':'none';
    }

    function getTags(){

        axios.get(`http://localhost:8080/tags`,{ withCredentials: true })
        .then(res => {
            setTags(res.data);            
        })
        .catch(error => {
            console.log(error);
        })

    }

    function triggerReloadFunc() {
        setTriggerReload(!triggerReload);
    }

    useEffect(
        getTags,
        [triggerReload]
    )

    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", padding:"10px 5px", margin:"5px 0px", borderRadius:"5px", width:"100%", backgroundColor:"white"}}>
                    <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 10px", fontSize:"22px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Tags </h1>
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
                <div style={{display:getView(), margin:"auto 5px", paddingTop:"5px", borderTop:"1px", borderStyle:"solid", borderColor:"black"}}>
                    {add === true  &&
                        <AddTile setAdd={setAdd} triggerReloadFunc={triggerReloadFunc} />
                    }
                    {
                        tags.map((tag,index) => {
                            return (
                                <Tile tag={tag} triggerReloadFunc={triggerReloadFunc} key={index} />
                            );
                        })
                    }
                </div>
                </div>
    );
}

function Tile({tag, triggerReloadFunc}) {

    const [editMode, setEditMode] = useState(false);
    const [tagNew, setTagNew] = useState(tag.name);

    function updateTag() {

        axios.patch(`http://localhost:8080/tags/${tag._id}`,
        {name:tagNew},
        { withCredentials: true })
        .then(res => {
            triggerReloadFunc();
            setEditMode(false);           
        })
        .catch(error => {
            console.log(error);
            setEditMode(false);
        })

    }

    function deleteTag() {

        axios.delete(`http://localhost:8080/tags/${tag._id}`,
        { withCredentials: true })
        .then(res => {
            triggerReloadFunc();          
        })
        .catch(error => {
            console.log(error);
        })

    }

    return (
        <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
            {editMode === false &&
                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{tag.name}</h1>
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
                    value={tagNew}
                    onChange={(e)=>{
                        setTagNew(e.target.value);
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
                        onClick={updateTag}
                    >
                    <DoneIcon fontSize="small"/>
                    </div>
                }
                <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                    onClick={deleteTag}
                >
                <DeleteIcon fontSize="small"/>
                </div>
            </div>
        </div>
    );

}

function AddTile({tag, setAdd, triggerReloadFunc}) {

    const [tagNew, setTagNew] = useState(tag);

    function createTag() {

        axios.post(`http://localhost:8080/tags`,
        {name:tagNew},
        { withCredentials: true })
        .then(res => {    
            setAdd(false);    
            triggerReloadFunc()   
        })
        .catch(error => {
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
                    placeholder='add tag'
                    value={tagNew}
                    onChange={(e)=>{
                        setTagNew(e.target.value);
                    }}
                />
                </ThemeProvider>

            <div className='flex-row ml-auto'>
                    <div className='hover:bg-green' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}
                        onClick={createTag}
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