import settings from '../assets/settings.png'
import john from '../assets/john.png';
import './Profile.css';
import { Box } from '@mui/material';



function Profile() {
    return (
        <>
          
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}>
                <img src={settings} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}> 
                 <img src={john} /> 
                </Box>
                
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}> 
                <div class = "name"> John  </div> 
                </Box>
                
        
        </>

    );
  }

  export default Profile;

