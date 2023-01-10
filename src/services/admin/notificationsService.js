import axios from "axios";
import { API_URL } from "./../http-common";
import authHeader from "./../auth-header";


class Notifications {


    addNotifications(data){
        return axios.post(API_URL+'/admin/addnotification',data);
    }
}


export default new Notifications();