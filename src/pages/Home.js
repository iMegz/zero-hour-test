import Container from "../components/Container";
import NavButton from "../components/NavButton";

export default function Home() {
    return (
        <Container>
            <NavButton text="Classic" to="classic" />
            <NavButton text="Quote" to="quote" />
            <NavButton text="Emoji" to="emoji" />
        </Container>
    );
}
