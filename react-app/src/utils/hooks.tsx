import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

// FIXME: ReactNode type so we don't need <span> below
export const useTitle = (title: ReactNode) =>
    useEffect(() => {
        const layoutTitleNode = document.getElementById("layout-title");
        if (layoutTitleNode) {
            ReactDOM.render(<span>{title}</span>, layoutTitleNode);
        }
        return () => {
            if (layoutTitleNode) {
                ReactDOM.unmountComponentAtNode(layoutTitleNode);
            }
        };
    });
