import { Outlet } from "react-router-dom";
import LayoutMenu from "./LayoutMenu";
import { useMediaQuery } from "@mui/material";

function ConsoleBoard(){

    const matches = useMediaQuery('(min-width:1100px)');

    function getMenuWidth(){
        return matches?"160px":"80px";
    }

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <div style={{position:'fixed', overflow:'hidden', boxShadow:"4px 0px 8px -4px rgb(49, 104, 216,1)"}}>
                <LayoutMenu/>
            </div>
            <div style={{width:'100%', overflow:'scroll', marginLeft:getMenuWidth(), zIndex:0}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default ConsoleBoard;