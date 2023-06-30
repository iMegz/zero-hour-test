import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileView() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const navigate = useNavigate();

    useEffect(() => {
        if (windowSize.current[0] >= 1000) navigate("/");
    }, [windowSize]);

    return (
        <div
            style={{
                display: "grid",
                placeItems: "center",
                width: "100%",
                textAlign: "center",
                fontSize: "1.2rem",
            }}
        >
            This site is not yet desigend to be responsive on mobile phones
            <br />
            Try switching to a PC device
        </div>
    );
}
