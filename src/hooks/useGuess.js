import { useEffect, useState } from "react";
import { getHistory, setHistory } from "../utils/history";
import style from "./useGuess.module.css";

export default function useGuess(data, answer, game) {
    const [disabled, setDisabled] = useState(true);
    const [trials, setTrials] = useState(getHistory(game));
    const [options, setOptions] = useState(getOptions());
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [gameover, setGameover] = useState(false);

    // const answer = useMemo(() => data[randomClassic(data.length)], []);

    useEffect(() => {
        const check = ({ name }) => name.toLowerCase() === value.toLowerCase();
        if (options.some(check)) {
            setDisabled(false);
            setSuggestions([]);
        } else setDisabled(true);

        if (value.length > 0) {
            const regex = new RegExp(`\\b${value}`, "i");
            const suggestions = options.filter(({ name }) => regex.test(name));
            setSuggestions(suggestions);
        } else {
            setSuggestions([]);
        }
    }, [value, options]);

    useEffect(() => {
        setGameover(trials.at(-1) === answer.name);
    }, [trials, answer.name]);

    function getOptions() {
        const history = getHistory(game);
        const options = data.filter(({ name }) => !history.includes(name));
        return options;
    }

    function onSubmit(value) {
        setHistory(game, [...trials, value]);
        setTrials((old) => [...old, value]);
        setOptions(getOptions());
        setValue("");
    }

    function showSuggestions() {
        const hide = suggestions.some((s) => s.name === value);
        if (hide) {
            return "";
        } else if (suggestions.length > 0) {
            return (
                <ul className={style.suggestions}>
                    {suggestions.map(({ name }) => (
                        <li
                            key={name}
                            onClick={() => setValue(name)}
                            className="red-cursor"
                        >
                            <img src={`assets/units/${name}.jpg`} alt={name} />
                            <span>{name}</span>
                        </li>
                    ))}
                </ul>
            );
        } else return "";
    }

    function mapTrials() {
        const check = (unit) =>
            data.find(({ name }) => name.toLowerCase() === unit.toLowerCase());
        return trials.map(check);
    }

    return {
        gameover,
        disabled,
        onSubmit,
        value,
        setValue,
        showSuggestions,
        trials,
        mapTrials,
    };
}
