import { Outlet } from "react-router-dom";
import LayoutMenu from "./LayoutMenu";

function ConsoleBoard(){
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <LayoutMenu/>
            <Outlet/>
        </div>
    );
}

export default ConsoleBoard;