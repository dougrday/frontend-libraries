import { Link } from "react-router-dom";
import { layoutService } from "../services/LayoutService";
import "./Home.css";

function Home() {
    layoutService.setTitle(<span>Home(r)</span>);
    layoutService.setActionItems(
        <>
            <mwc-icon-button icon="file_download" />
            <mwc-icon-button icon="print" />
            <mwc-icon-button icon="favorite" />
        </>,
    );

    return (
        <div className="centered">
            <img alt="Homer" src="/images/homer.jpg" />
            <Link to="/hello-world">Hello, World!</Link>
        </div>
    );
}

export default Home;
