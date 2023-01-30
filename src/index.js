import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { I18nProvider, LOCALES } from "./i18n";
import { FormattedMessage } from "react-intl";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nProvider locale={LOCALES.ENGLISH}>
      <Provider store={store}>
        <BrowserRouter>
        <GoogleOAuthProvider clientId="164454011985-g4tmud0sacpen1sogb30rn6tfs569c2s.apps.googleusercontent.com">
        <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider position="top-right" zIndex={2077} autoClose={4000}>
          <App />
          </NotificationsProvider>
    </MantineProvider>
          </ModalsProvider>
          </GoogleOAuthProvider>;
        </BrowserRouter>
      </Provider>
    </I18nProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
