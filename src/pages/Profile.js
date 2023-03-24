import settings from '../assets/settings.png'
import john from '../assets/john.png';

import { Box } from '@mui/material';



function Profile() {
    return (
        // <div>
        //     <div class="logo" style= {{float: "right",   height: '50px'}}> 
        //         <img src={settings}/> 
        //     </div>
        
        //     <div className='center'>
        //       <img src={cur} alt="react logo" style={{ width: '400px', }}/>
        //     </div>


        // </div>
        <>
            {/* // <div>
            //     <div class="logo" style= {{float: "right",   height: '50px'}}> 
            //         <img src={settings}/> 
            //     </div>
            //     <div className='center'>
            //       <img src={cur} alt="react logo" style={{ width: '400px', }}/>
            //     </div>
            // </div> */}
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
                }}
            >  <img src={john} /> 
                </Box>
                
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            > John
                </Box>
                
        
        </>

    );
  }

  export default Profile;

