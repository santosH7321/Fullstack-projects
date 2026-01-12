import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"

import App from "./App"
import "./index.css"
import { store } from "./redux/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
