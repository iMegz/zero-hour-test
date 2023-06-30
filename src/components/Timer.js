import { useEffect, useState } from "react";
import Container from "./Container";
import style from "./Timer.module.css";

const DAY_CONST = 86_400_000;

export default function Timer() {
    const [time, setTime] = useState(getTime());

    function getTime() {
        const format = (t) => (t < 10 ? `0${t}` : t);

        const tomorrow = (~~(Date.now() / DAY_CONST) + 1) * DAY_CONST;
        const diff = tomorrow - Date.now();

        let hrs = ~~(diff / (60 * 60 * 1000) - 3);
        let min = ~~(diff / (60 * 1000)) % 60;
        let sec = ~~(diff / 1000) % 60;

        hrs = format(hrs);
        min = format(min);
        sec = format(sec);

        return { hrs, min, sec };
    }

    useEffect(() => {
        setTimeout(() => {
            setTime(getTime());
        }, 1000);
    }, [time]);

    return (
        <Container>
            <span className={style["Timer-title"]}>Next update</span>
            <div className={style.Timer}>
                <span>{time.hrs}</span>
                <span>:</span>
                <span>{time.min}</span>
                <span>:</span>
                <span>{time.sec}</span>
            </div>
        </Container>
    );
}
