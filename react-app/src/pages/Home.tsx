import { useTitle } from "../utils/hooks";

function Home() {
    useTitle(<span>This is the home title</span>);

    return <div>Home component here</div>;
}

export default Home;
