import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/authService';
import authHeader from '../services/auth-header';
import { showError } from '../utils/NotificationPopUp';

function AuthBySocial(props) {
const {email,name} = useParams();
const navigate = useNavigate()


    useEffect(() => {

        if(email && name){
            authService.login(email, email).then(
                (data) => {
                  if (data.status === 200 || data.state === "success") {
                    authHeader(data.accessToken);
                    if (data.isAdmin) {
                      navigate("/admin");
                    } else {
                      navigate("/dashboard");
                    }
                  } else {
                    
                    showError('Connexion','Erreur lors de la connexion')
                  }
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
      
                    showError('Connexion',error)
                }
              );
        }
    })
    return (
        <div>
            
        </div>
    );
}

export default AuthBySocial;