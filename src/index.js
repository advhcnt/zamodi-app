import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { I18nProvider, LOCALES } from "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nProvider locale={LOCALES.ENGLISH}>
      <Provider store={store}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId="164454011985-g4tmud0sacpen1sogb30rn6tfs569c2s.apps.googleusercontent.com">
            <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
              <MantineProvider withNormalizeCSS withGlobalStyles>
                <App />
              </MantineProvider>
            </ModalsProvider>
          </GoogleOAuthProvider>
          ;
        </BrowserRouter>
      </Provider>
    </I18nProvider>
  </React.StrictMode>
);
