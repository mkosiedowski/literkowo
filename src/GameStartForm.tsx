import {useState} from "react";
import {KEYS} from "./game/Keyboard";

type Props = {
    lenght: number;
    onChoose: (word: string) => void;
}
const GameStartForm = ({ lenght, onChoose }: Props) => {
    const [word, setWord] = useState('');

    const handleChange = (value: string) => {
        if (value.length <= lenght && value.split('').every(l => KEYS.flatMap(a => a).includes(l.toLowerCase()))) {
            setWord(value.toUpperCase());
        }
    }

    const handlePlay = () => {
        if (word.length === lenght) {
            window.location.hash = window.btoa(unescape(encodeURIComponent(word)));
            onChoose(word);
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
                <button onClick={handlePlay} disabled={word.length !== lenght}>Graj!</button>
            </div>
        </form>
    </div>;
};

export default GameStartForm;