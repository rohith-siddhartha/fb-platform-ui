import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Dialog, DialogContent, InputAdornment, OutlinedInput, Paper, Popover, Popper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { darkTheme, userTheme } from '../utility/themes';
import { ThemeProvider } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

export function ProductDashBoard() {

    const categories = ['apple', 'ball'];

    const products = ['vat', 'cat'];

    const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className='flex-row page' style={{width:"100%"}}>
            <div className="flex-col align-center" style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", margin:"2%", padding:"10px 10px", borderRadius:"5px", width:"100%", backgroundColor:"white"}}>
                <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 5px", fontSize:"20px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Products </h1>
                        </div>
                        <div className='flex-row' style={{marginLeft:"auto"}}>
                            <ThemeProvider theme={darkTheme}>
                            <Button sx={{height:"30px", margin:"auto 10px"}} variant="contained" size="small" color="primary" >add +</Button>
                        </ThemeProvider>
                        </div>
                    </div>
                <div className='flex-row' style={{padding:"10px 0px", margin:"10px 0px"}}>
                    <OutlinedInput
                        sx={{height:"40px"}}
                    />
                    <ThemeProvider theme={darkTheme}>
                        <Button sx={{height:"30px", margin:"auto 10px"}} variant="contained" size="small" color="primary" >search</Button>
                    </ThemeProvider>
                    <div>
                        <div className='flex-row' onClick={(e) => {handleClick(e)}} style={{margin:"0px 10px"}}>
                                <h1 style={{margin:"auto 0px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Categories </h1>
                                <div style={{borderRadius:"5px", padding:"auto 0px", margin:"auto 0px"}}>
                                    <ArrowDropDownIcon fontSize="large"/>
                                </div>
                        </div>
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
                                    {categories.map(category => {
                                        return (
                                            <div className='hover:bg-blue' style={{padding:"5px"}}>
                                                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category}</h1>
                                            </div>
                                        );
                                    })}
                                </div>
                            </DialogContent>
                            </Paper>
                        </Popover>
                    </div>
                    <div>
                        <div className='flex-row' onClick={(e) => {handleClick(e)}} style={{margin:"0px 10px"}}>
                                <h1 style={{margin:"auto 0px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Tags </h1>
                                <div style={{borderRadius:"5px", padding:"auto 0px", margin:"auto 0px"}}>
                                    <ArrowDropDownIcon fontSize="large"/>
                                </div>
                        </div>
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
                                    {categories.map(category => {
                                        return (
                                            <div className='hover:bg-blue' style={{padding:"5px"}}>
                                                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category}</h1>
                                            </div>
                                        );
                                    })}
                                </div>
                            </DialogContent>
                            </Paper>
                        </Popover>
                    </div>
                </div>
                <div>
                    {products.map(p => {
                        return (
                            <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
                                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{p}</h1>
                                    <div className='flex-row ml-auto'>
                                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <EditIcon fontSize="small"/>
                                        </div>
                                        <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <DeleteIcon fontSize="small"/>
                                        </div>
                                    </div>
                                </div>
                        );
                    })}
                </div>
            </div>
            <div className='flex-col' style={{margin:"1% 2% 0% 0%", padding:"10px 5px"}}>
                
                <Categories/>

                <Tags/>


            </div>
        </div>
    );
    
}

function Categories() {

    const categories = ['apple', 'ball'];

    const [view, setView] = useState(true);

    function getView() {
        return view?'block':'none';
    }

    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", padding:"10px 5px", margin:"0px 0px 20px 0px", borderRadius:"5px", width:"240px", backgroundColor:"white"}}>
                    <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 10px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Categories </h1>
                            <div style={{borderRadius:"5px", padding:"0px 0px", margin:"0px 0px"}}>
                                <ArrowDropDownIcon fontSize="large"/>
                            </div>
                        </div>
                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 10px 0px auto"}}>
                            <h1 style={{margin:"0px 5px", fontSize:"20px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> + </h1>
                        </div>
                    </div>
                <div style={{display:getView(), margin:"auto 5px", paddingTop:"5px", borderTop:"1px", borderStyle:"solid", borderColor:"black"}}>
                    {
                        categories.map(category => {
                            return (
                                <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
                                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category}</h1>
                                    <div className='flex-row ml-auto'>
                                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <EditIcon fontSize="small"/>
                                        </div>
                                        <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <DeleteIcon fontSize="small"/>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                </div>
    );
}

function Tags() {

    const categories = ['apple', 'ball'];

    const [view, setView] = useState(true);

    function getView() {
        return view?'block':'none';
    }

    return (
        <div style={{boxShadow:"0 1px 2px rgb(0 0 0 / 0.2", padding:"10px 5px", margin:"5px 0px", borderRadius:"5px", width:"240px", backgroundColor:"white"}}>
                    <div className='flex-row' style={{margin:"0px 0px 10px 0px"}}>
                        <div className='flex-row' onClick={() => {setView(!view)}}>
                            <h1 style={{margin:"auto 5px 5px 10px", fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> Tags </h1>
                            <div style={{borderRadius:"5px", padding:"0px 0px", margin:"0px 0px"}}>
                                <ArrowDropDownIcon fontSize="large"/>
                            </div>
                        </div>
                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 10px 0px auto"}}>
                            <h1 style={{margin:"0px 5px", fontSize:"20px", fontFamily:"Roboto Mono", fontWeight:"bold"}}> + </h1>
                        </div>
                    </div>
                <div style={{display:getView(), margin:"auto 5px", paddingTop:"5px", borderTop:"1px", borderStyle:"solid", borderColor:"black"}}>
                    {
                        categories.map(category => {
                            return (
                                <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
                                    <h1 style={{margin:"auto 5px 5px 5px", fontSize:"15px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{category}</h1>
                                    <div className='flex-row ml-auto'>
                                        <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <EditIcon fontSize="small"/>
                                        </div>
                                        <div className='hover:bg-red' style={{borderRadius:"5px", padding:"0px 5px", margin:"0px 5px"}}>
                                        <DeleteIcon fontSize="small"/>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                </div>
    );
}