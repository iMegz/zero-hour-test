import seedrandom from "seedrandom";

const DAY_CONST = 86_400_000;
const DEFAULT = ~~(Date.now() / DAY_CONST);
const generator = seedrandom(DEFAULT);

const random01 = generator();
const random02 = generator();
const random03 = generator();

export function randomClassic(length) {
    return Math.floor(random01 * length);
}

export function randomQuote(length) {
    return Math.floor(random02 * length);
}

export function randomEmoji(length) {
    return Math.floor(random03 * length);
}
