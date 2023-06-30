import { useNavigate } from "react-router-dom";
import style from "./NavButton.module.css";

export default function NavButton({ to, text }) {
    const navigate = useNavigate();
    const className = `${style.NavButton} red-cursor`;

    return (
        <button onClick={() => navigate(to)} className={className}>
            {text}
        </button>
    );
}
