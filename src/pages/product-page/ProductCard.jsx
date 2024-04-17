import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { priceUnitMapping } from '../../utility/listsUtil';

export function ProductCard( {product} ) {

    return (
        <div className='flex-row page' style={{padding:"10px 5px", margin:"5px 0px", borderRadius:"5px"}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h1 style={{margin:"auto 5px 5px 5px", fontSize:"18px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{product.name}</h1>
                <h1 style={{margin:"auto 5px 5px 5px", color:'blue', fontSize:"16px", fontFamily:"Roboto Mono", fontWeight:"bold"}}>{'RS.'}{product.PPU}{'/'}{priceUnitMapping[product.UOM]}</h1>
            </div>
            <div className='flex-row ml-auto' style={{alignItems:'center'}}>
                <div className='hover:bg-blue' style={{borderRadius:"5px", padding:"5px 5px", margin:"0px 5px"}}>
                    <EditIcon fontSize="medium"/>
                </div>
                <div className='hover:bg-red' style={{borderRadius:"5px", padding:"5px 5px", margin:"0px 5px"}}>
                    <DeleteIcon fontSize="medium"/>
                </div>
            </div>
        </div>
    );
}