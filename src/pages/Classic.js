import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import data from "../assets/data/units.json";
import style from "./Classic.module.css";
import { getHistory, setHistory } from "../utils/history";
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
        <div className={style.Classic}>
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
