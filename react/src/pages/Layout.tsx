import "@material/mwc-drawer";
import type { Drawer } from "@material/mwc-drawer";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-top-app-bar-fixed";
import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { layoutService } from "../services/LayoutService";
import { useObservable } from "../utils/hooks";
import "./Layout.css";

function Layout() {
    const drawerRef = useRef<Drawer>(null);
    const actionItems = useObservable(layoutService.actionItems$, <></>);
    const title = useObservable(layoutService.title$, <span>Hello, World!</span>);

    const handleNavigationClick = () => {
        if (drawerRef.current) {
            drawerRef.current.open = !drawerRef.current.open;
        }
    };

    useEffect(() => {
        const drawer = drawerRef.current;

        drawer?.addEventListener("MDCTopAppBar:nav", handleNavigationClick);
        return () => {
            drawer?.removeEventListener("MDCTopAppBar:nav", handleNavigationClick);
        };
    }, []);

    return (
        <mwc-drawer ref={drawerRef} hasHeader type="modal">
            <span slot="title">Hello World!</span>
            <mwc-list rootTabbable>
                <Link to="/">
                    <mwc-list-item tabindex="0" graphic="avatar">
                        Home
                        <mwc-icon slot="graphic">home</mwc-icon>
                    </mwc-list-item>
                </Link>
                <Link to="/hello-world">
                    <mwc-list-item tabindex="0" graphic="avatar">
                        Hello World!
                        <mwc-icon slot="graphic">language</mwc-icon>
                    </mwc-list-item>
                </Link>
            </mwc-list>
            <div slot="appContent">
                <mwc-top-app-bar-fixed dense>
                    <div slot="title">{title}</div>
                    <div slot="actionItems">{actionItems}</div>
                    <mwc-icon-button icon="menu" slot="navigationIcon" />
                    <Outlet />
                </mwc-top-app-bar-fixed>
            </div>
        </mwc-drawer>
    );
}

export default Layout;
