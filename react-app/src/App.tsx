import { useEffect, useRef } from "react";
import "./App.css";
import "@material/mwc-drawer";
import type { Drawer } from "@material/mwc-drawer";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-top-app-bar-fixed";
import { Link, Outlet } from "react-router-dom";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "mwc-drawer": any;
            "mwc-icon": any;
            "mwc-icon-button": any;
            "mwc-top-app-bar-fixed": any;
        }
    }
}

function App() {
    const drawerRef = useRef<Drawer>();

    const handleNavigationClick = () => {
        if (drawerRef.current) {
            drawerRef.current.open = !drawerRef.current.open;
        }
    };

    useEffect(() => {
        const drawer = drawerRef.current;
        if (drawer) {
            drawer.addEventListener("MDCTopAppBar:nav", handleNavigationClick);
        }

        return () => {
            drawer?.removeEventListener("MDCTopAppBar:nav", handleNavigationClick);
        };
    }, []);

    return (
        <mwc-drawer ref={drawerRef} hasHeader type="modal">
            <span slot="title">Hello World!</span>
            <div>
                <ul>
                    <li>
                        <Link to="/home">
                            <mwc-icon>home</mwc-icon> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/hello-world">
                            <mwc-icon>language</mwc-icon> Hello World!
                        </Link>
                    </li>
                </ul>
            </div>
            <div slot="appContent">
                <mwc-top-app-bar-fixed dense>
                    <mwc-icon-button icon="menu" slot="navigationIcon" />
                    <Outlet />
                </mwc-top-app-bar-fixed>
            </div>
        </mwc-drawer>
    );
}

export default App;
