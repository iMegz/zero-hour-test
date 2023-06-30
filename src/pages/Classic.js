import { useMemo } from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import data from "../assets/data/units.json";
import style from "./Game.module.css";
import Table from "../components/Table";
import { randomClassic } from "../utils/random";
import useGuess from "../hooks/useGuess";

export default function Classic() {
    const answer = useMemo(() => data[randomClassic(data.length)], []);

    const {
        disabled,
        gameover,
        mapTrials,
        onSubmit,
        setValue,
        showSuggestions,
        value,
    } = useGuess(data, answer, "classic");

    return (
        <div className={style.Game}>
            {gameover ? (
                ""
            ) : (
                <Container>
                    <Form
                        disabled={disabled}
                        onSubmit={onSubmit}
                        value={value}
                        setValue={setValue}
                    />
                    {showSuggestions()}
                </Container>
            )}
            <Table trials={mapTrials()} answer={answer} />
        </div>
    );
}
