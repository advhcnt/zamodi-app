import { Box, Checkbox,Group } from '@mantine/core';
import { IconStar, } from '@tabler/icons';
import React from 'react';

function NoteComponent({note,niveau,setnote}) {
    return (
        <Box my={10} >
            <Group>
                <Checkbox color='#20986e' value={note} checked={note===niveau?true:false} onChange={() => setnote(niveau)} />
                |
                {[...Array(5).keys()].map((item)=>(
                     <IconStar className={item<niveau?'remplire':''}  key={item}/>
                ))}
               
            </Group>
        </Box>
    );
}

export default NoteComponent;