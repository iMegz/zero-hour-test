import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import style from "./App.module.css";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Quote from "./pages/Quote";
import Emoji from "./pages/Emoji";
import Timer from "./components/Timer";
import { useEffect } from "react";
import { initHistory } from "./utils/history";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        initHistory();
    }, []);

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
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <br />
            <Timer />
        </div>
    );
}

export default App;
