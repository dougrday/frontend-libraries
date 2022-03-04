import { useTitle } from "../utils/hooks";

function Home() {
    useTitle(<span>This is the home title</span>);

    return <h1>This is the Home component!</h1>;
}

export default Home;
