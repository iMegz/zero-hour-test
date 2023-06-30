const DAY_CONST = 86_400_000;

export function initHistory(force = false) {
    const today = ~~(Date.now() / DAY_CONST);
    const day = localStorage.getItem("day");

    if (force || !day || day !== today.toString()) {
        localStorage.setItem("day", today);
        localStorage.setItem("classic", "[]");
        localStorage.setItem("quote", "[]");
        localStorage.setItem("emoji", "[]");
    }
}

export function getHistory(game = "classic") {
    return JSON.parse(localStorage.getItem(game));
}

export function setHistory(game = "classic", value = []) {
    localStorage.setItem(game, JSON.stringify(value));
}
