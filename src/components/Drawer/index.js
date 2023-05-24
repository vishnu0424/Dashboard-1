import { 
    Box, 
    Drawer, 
    Button,
    Tooltip,
    Typography
} from '@mui/material'
import { useState, useRef } from 'react';
import { CustomAgGrid } from '../AgGrid';

export default function CustomDrawer({state, setState, drawerData, headCells}) {

    const gridRef = useRef();
    const [selected, setSelected] = useState([]);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
            role="presentation"
        >
        <Box className='drawerHead'>
            <Typography variant='h6'>{drawerData.key}: {drawerData.value}</Typography>
        </Box>
        <CustomAgGrid
            gridRef={gridRef}
            headCells={headCells}
            rows={drawerData.details}
            setSelected={setSelected}
        />
        <Box mt="16px">
            <Tooltip title="Cancel" placement="top-end" arrow>
                <Button variant="contained" color="error" onClick={()=>setState(false)} size="small" >
                    Cancel
                </Button>
            </Tooltip>
        </Box>
        </Box>
    );
    
    return (
        <>
            {['right'].map((anchor) => (
                    <Drawer
                        key={1}
                        anchor={"right"}
                        open={state}
                    >
                        {list(anchor)}
                    </Drawer>
            ))}

        </>
    );
}