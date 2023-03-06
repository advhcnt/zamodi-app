import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

export const showError = (titre,message)=>{
    showNotification({
      id: 'hello-there',
      disallowClose: true,
      autoClose: 500,
      title: titre,
      message: message,
      color: 'red',
      icon: <IconX />,
      className: 'my-notification-class',
      // style: { backgroundColor: 'red' },
      // sx: { backgroundColor: 'red' },
      loading: false,
    });
  }


  export const showSuccess = (titre,message)=>{
    showNotification({
      id: 'hello-there',
      disallowClose: true,
      autoClose: 500,
      title: titre,
      message: message,
      icon:<IconCheck size={18} /> ,
      color:"teal",
      className: 'my-notification-class',
      // style: { backgroundColor: 'red' },
      // sx: { backgroundColor: 'red' },
      loading: false,
    });
  }