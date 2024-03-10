import StorefrontIcon from '@mui/icons-material/Storefront';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

export function getIcon(icon){

    switch(icon){
        case 'outlets':
            return <StorefrontIcon sx={{margin:"0px 15px"}} />;
        case 'products':
            return <DashboardIcon sx={{margin:"0px 15px"}} />;
        case 'analytics':
            return <QueryStatsIcon sx={{margin:"0px 15px"}} />;
        case 'support':
            return <HeadsetMicIcon sx={{margin:"0px 7px"}} />;
        default:
            return <></>;
    }
}