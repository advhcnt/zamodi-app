import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';

function LoginMobile({googleAuth}) {
    return (
        <>
              <LoginSocialGoogle
              client_id={
                "164454011985-g4tmud0sacpen1sogb30rn6tfs569c2s.apps.googleusercontent.com"
              }
              // onLoginStart={onLoginStart}
              redirect_uri={"http://localhost:3000"}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                // setProvider(provider);
                // setProfile(data);
                googleAuth(data, provider);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <GoogleLoginButton text={"connexion avec google"} />
            </LoginSocialGoogle>
        </>
    );
}

export default LoginMobile;