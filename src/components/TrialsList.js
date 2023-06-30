import style from "./TrialsList.module.css";

export default function TrialsList({ trials = [], answer = {} }) {
    console.log(trials);
    return (
        <ul className={style.TrialsList}>
            {[...trials].reverse().map((name) => {
                console.log(name);
                const correct = name === answer.name ? "correct" : "incorrect";
                return (
                    <li className={style[correct]} key={name}>
                        <img src={`assets/units/${name}.jpg`} alt={name} />
                        <span>{name}</span>
                    </li>
                );
            })}
        </ul>
    );
}
