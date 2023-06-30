import { useMemo } from "react";
import { randomQuote } from "../utils/random";
import data from "../assets/data/quotes.json";
import style from "./Game.module.css";
import useGuess from "../hooks/useGuess";
import Container from "../components/Container";
import Form from "../components/Form";
import TrialsList from "../components/TrialsList";

export default function Quote() {
    const answer = useMemo(() => data[randomQuote(data.length)], []);

    const {
        disabled,
        gameover,
        trials,
        onSubmit,
        setValue,
        showSuggestions,
        value,
    } = useGuess(data, answer, "quote");

    function displayQuotes() {
        let n;
        if (gameover) n = answer.quotes.length;
        else n = Math.min(trials.length + 1, answer.quotes.length);

        return answer.quotes
            .slice(0, n)
            .map((q, i) => (
                <span key={i} className={style.quote}>{`"${q}"`}</span>
            ));
    }

    return (
        <div className={style.Game}>
            <Container>{displayQuotes()}</Container>
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

            {trials.length === 0 ? (
                ""
            ) : (
                <TrialsList trials={trials} answer={answer} />
            )}
        </div>
    );
}
