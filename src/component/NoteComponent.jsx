import { Box, Checkbox, Divider, Group } from '@mantine/core';
import { IconStar, IconStarOff,IconStars } from '@tabler/icons';
import React from 'react';

function NoteComponent({note}) {
    return (
        <Box my={10} >
            <Group>
                <Checkbox  value={note} />
                |
                {[...Array(5).keys()].map((item)=>(
                     <IconStar className={item<note?'remplire':''}  key={item}/>
                ))}
               
            </Group>
        </Box>
    );
}

export default NoteComponent;