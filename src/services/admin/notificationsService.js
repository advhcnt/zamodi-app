import axios from "axios";
import { API_URL } from "./../http-common";


class Notifications {


    addNotifications(data){
        return axios.post(API_URL+'/admin/addnotification',data);
    }

    listNotifications(data){
        return axios.get(API_URL+'/admin/notification');
    }
}


export default new Notifications();