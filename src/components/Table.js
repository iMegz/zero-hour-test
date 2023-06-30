import Container from "./Container";
import style from "./Table.module.css";

export default function Table({ trials = [], answer = {} }) {
    const unit = {
        name: "Angry Mob",
        nation: "GLA",
        strengths: ["Infantry", "Vehicles"],
        weaknesses: ["Flames", "Flash-bang grenades", "Toxins"],
        cost: 800,
    };

    function mapUnits() {
        return [...trials].reverse().map((unit) => {
            const { name, nation, strengths, weaknesses, cost } = unit;
            const {
                nation: nationA,
                strengths: strengthsA,
                weaknesses: weaknessesA,
                cost: costA,
            } = answer;

            const icon = (
                <div className={style.td}>
                    <img src={`../assets/units/${name}.jpg`} alt={name} />
                </div>
            );

            const isNation = nation === nationA ? "correct" : "incorrect";
            const nationIcon = (
                <div className={`${style.td} ${style[isNation]}`}>
                    <img src={`../assets/nations/${nation}.webp`} alt={name} />
                </div>
            );

            let isStrength;
            if (strengths.toString() === strengthsA.toString()) {
                isStrength = "correct";
            } else if (strengths.some((s) => strengthsA.includes(s))) {
                isStrength = "close";
            } else {
                isStrength = "incorrect";
            }

            const strength = (
                <div className={`${style.td} ${style[isStrength]}`}>
                    {strengths.map((s) => (
                        <span key={s}>{s}</span>
                    ))}
                </div>
            );

            let isWeakness;
            if (weaknesses.toString() === weaknessesA.toString()) {
                isWeakness = "correct";
            } else if (weaknesses.some((w) => weaknessesA.includes(w))) {
                isWeakness = "close";
            } else {
                isWeakness = "incorrect";
            }

            const weakness = (
                <div className={`${style.td} ${style[isWeakness]}`}>
                    {weaknesses.map((w) => (
                        <span key={w}>{w}</span>
                    ))}
                </div>
            );

            const isCost = cost === costA ? "correct" : "incorrect";
            const costValue = (
                <div className={`${style.td} ${style[isCost]}`}>
                    <span>{`$${cost}`}</span>
                </div>
            );

            return (
                <div className={style.tr} key={name}>
                    {icon} {nationIcon} {strength} {weakness} {costValue}
                </div>
            );
        });
    }

    return (
        <div className={style.Table}>
            <div className={style.th}>
                <div className={style.td}>Unit</div>
                <div className={style.td}>Nation</div>
                <div className={style.td}>Strengths</div>
                <div className={style.td}>Weaknesses</div>
                <div className={style.td}>Cost</div>
            </div>
            <div className={style.tbody}>{mapUnits()}</div>
        </div>
    );
}
