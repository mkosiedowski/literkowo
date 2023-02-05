import {useState} from "react";
import {KEYS} from "./game/Keyboard";

type Props = {
    length: number;
    onChoose: (word: string) => void;
}
const GameStartForm = ({ length, onChoose }: Props) => {
    const [word, setWord] = useState('');

    const isValidLetter = (letter: string) => KEYS.flatMap(a => a).includes(letter.toLowerCase());

    const handleChange = (value: string) => {
        if (value.length <= length && value.split('').every(isValidLetter)) {
            setWord(value.toUpperCase());
        }
    }

    return <div className="form">
        <label htmlFor="word">Podaj 5-literowe słowo:</label>
        <form>
            <div className="input" id="word">
                <input
                    type="text"
                    onChange={({target: { value }}) => handleChange(value)}
                    value={word}
                />
            </div>
            <div className="button">
                <button onClick={() => onChoose(word)} disabled={word.length !== length}>Graj!</button>
            </div>
        </form>
    </div>;
};

export default GameStartForm;