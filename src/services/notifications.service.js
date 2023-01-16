import axios from "axios";
import { API_URL } from "./http-common";


class NotificationService{

    listeNotification(){
        return axios.get(API_URL + "/notifications")
    }

    lireNotification(identifiant){
        return axios.get(API_URL + "/notifications/"+identifiant)
    }
}

export default new NotificationService();