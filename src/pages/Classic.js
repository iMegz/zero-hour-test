import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import data from "../assets/data/units.json";
import style from "./Classic.module.css";
import { getHistory, setHistory } from "../utils/history";
import Table from "../components/Table";
import { randomClassic } from "../utils/random";

export default function Classic() {
    const [disabled, setDisabled] = useState(true);
    const [trials, setTrials] = useState(getHistory("classic"));
    const [options, setOptions] = useState(getOptions());
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const answer = useMemo(() => data[randomClassic(data.length)]);

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
    }, [value]);

    function getOptions() {
        const history = getHistory("classic");
        const options = data.filter(({ name }) => !history.includes(name));
        return options;
    }

    /**
     *
     * @param {String} value
     */
    function onSubmit(value) {
        setHistory("classic", [...trials, value]);
        setTrials((old) => [...old, value]);
        setOptions(getOptions());
        setValue("");
    }

    function showSuggestions(suggestions) {
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

    return (
        <div className={style.Classic}>
            {trials.at(-1) === answer.name ? (
                ""
            ) : (
                <Container>
                    <Form
                        disabled={disabled}
                        onSubmit={onSubmit}
                        value={value}
                        setValue={setValue}
                    />
                    {showSuggestions(suggestions)}
                </Container>
            )}
            <Table trials={mapTrials()} answer={answer} />
        </div>
    );
}
