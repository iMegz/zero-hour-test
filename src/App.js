import { Route, Routes, useNavigate } from "react-router-dom";
import style from "./App.module.css";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Quote from "./pages/Quote";
import Emoji from "./pages/Emoji";
import Timer from "./components/Timer";
import { useEffect, useRef } from "react";
import { initHistory } from "./utils/history";
import MobileView from "./pages/MobileView";

function App() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const navigate = useNavigate();
    useEffect(() => {
        initHistory();
        if (windowSize.current[0] < 1000) navigate("/mobile");
    }, [windowSize]);

    return (
        <div className="App">
            <header
                onClick={() => navigate("/")}
                className={style["App-header"]}
            ></header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classic" element={<Classic />} />
                <Route path="/emoji" element={<Emoji />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/mobile" element={<MobileView />} />
            </Routes>
            <br />
            <Timer />
        </div>
    );
}

export default App;
