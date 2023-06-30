import { useMemo } from "react";
import { randomEmoji } from "../utils/random";
import data from "../data/emoji.json";
import style from "./Game.module.css";
import useGuess from "../hooks/useGuess";
import Container from "../components/Container";
import Form from "../components/Form";
import TrialsList from "../components/TrialsList";

export default function Emoji() {
    const answer = useMemo(() => data[randomEmoji(data.length)], []);
    const hiddenEmoji = "❓";

    const {
        disabled,
        gameover,
        trials,
        onSubmit,
        setValue,
        showSuggestions,
        value,
    } = useGuess(data, answer, "emoji");

    function displayEmojis() {
        let n;
        if (gameover) n = answer.emoji.length;
        else n = Math.min(trials.length + 1, answer.emoji.length);

        const emojis = answer.emoji.map((e, i) => (i >= n ? hiddenEmoji : e));

        return emojis.map((q, i) => <span key={i}>{q}</span>);
    }

    return (
        <div className={style.Game}>
            <div className={style.emojis}>{displayEmojis()}</div>
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
