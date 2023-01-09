import React from 'react';
import { Notifications } from '../component/NotificationsComponent';

export function NotificationsPage(props) {
    return (
        <>
        {[...Array(5).keys()].map((item)=>(
            <Notifications />
        ))

        }
            
        </>
    );
}

