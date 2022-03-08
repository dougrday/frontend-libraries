import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HelloWorld from "./pages/HelloWorld/HelloWorld";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "mwc-button": any;
            "mwc-drawer": any;
            "mwc-icon": any;
            "mwc-icon-button": any;
            "mwc-list": any;
            "mwc-list-item": any;
            "mwc-textfield": any;
            "mwc-top-app-bar-fixed": any;
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="hello-world" element={<HelloWorld />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
