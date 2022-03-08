import { Link } from "react-router-dom";
import { useTitle } from "../utils/hooks";
import "./Home.css";

function Home() {
    useTitle(<span>Home(r)</span>);

    return (
        <>
            <div className="centered">
                <img alt="Homer" src="/images/homer.jpg" />
                <Link to="/hello-world">Hello, World!</Link>
            </div>
        </>
    );
}

export default Home;
