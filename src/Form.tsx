import {useState} from "react";
import {KEYS} from "./Keyboard";

type Props = {
    lenght: number;
}
const Form = ({ lenght }: Props) => {
    const [word, setWord] = useState('');

    const handleChange = (value: string) => {
        if (value.length <= lenght && value.split('').every(l => KEYS.flatMap(a => a).includes(l.toLowerCase()))) {
            setWord(value.toUpperCase());
        }
    }

    const handlePlay = () => {
        if (word.length === lenght) {
            window.location.hash = window.btoa(unescape(encodeURIComponent(word)));
            window.location.reload();
        }
    }

    return <div className="form">
        <h1>Wybierz słowo</h1>
        <div className="input">
            <input type="text" onChange={({target: { value }}) => handleChange(value)} value={word} />
        </div>
        <div className="button">
            <button onClick={handlePlay} disabled={word.length !== lenght}>Play!</button>
        </div>
    </div>;
};

export default Form;