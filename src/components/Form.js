import style from "./Form.module.css";
import EnterSvg from "./EnterSvg";

export default function Form({ onSubmit, disabled, value, setValue }) {
    const btnClassName = `${style.SubmitBtn} red-cursor`;

    return (
        <div className={style.Form}>
            <input
                onInput={(e) => setValue(e.target.value)}
                className={style.Input}
                type="text"
                autoComplete="off"
                placeholder="Guess the unit"
                value={value}
            />
            <button
                disabled={disabled}
                onClick={() => onSubmit(value)}
                className={btnClassName}
                aria-label="Submit"
            >
                <EnterSvg fill={disabled ? "red" : "#2938ff"} />
            </button>
        </div>
    );
}
