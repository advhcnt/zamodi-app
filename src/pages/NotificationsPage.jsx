import React from 'react';
import { Notifications } from '../component/NotificationsComponent';
import notificationsService from '../services/notifications.service';
import { useEffect } from 'react';
import { useState } from 'react';

export function NotificationsPage(props) {

    const [notification, setnotification] = useState([])

    useEffect(() => {
        notificationsService.listeNotification().then(
            (data) => {
                console.log(data)
                setnotification([...data.data])
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])
    return (
        <>
            {notification.map((item) => (
                <>
                    {item.statut !== 'En attente' && (
                        <Notifications element={item} />
                    )}
                </>

            ))

            }

        </>
    );
}

