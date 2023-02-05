import React, {useState} from 'react';
import './App.css';
import Keyboard from "./Keyboard";
import Word from "./Word";
import Form from "./Form";

const LENGTH = 5;

function App() {
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState('');
    let WORD: string = '';
    try {
        WORD = window.location.hash ? decodeURIComponent(escape(window.atob(window.location.hash.substring(1)))) : '';
    } catch (e) {}
    if (WORD.length !== LENGTH) {
        return <Form lenght={LENGTH} />;
    }

    const isGameEnded = words.length === 6 || (words.length && words[words.length - 1].toLowerCase() === WORD.toLowerCase());

    const handleLetter = (letter: string) => {
        if (isGameEnded) return;
        setCurrentWord(current => current.length < LENGTH ? `${current}${letter}` : current);
    }

    const handleBackspace = () => {
        if (isGameEnded) return;
        setCurrentWord(current => {
            if (current.length > 0) {
                return current.substring(0, current.length - 1);
            }
            return current;
        });
    }

    const submitWord = () => {
        if (isGameEnded) return;
        if (currentWord.length === LENGTH) {
            setWords((current) => [...current, currentWord]);
            setCurrentWord('');
        }
    }
    const handleNewWord = () => {
        if (window.confirm('Chcesz zacząć z nowym słowem?')) {
            window.location.hash = '';
            window.location.reload();
        }
    }

    const remaining = 5 - words.length;
    return (
        <div className="App">
            <h1>Literkowo</h1>
            {words.map((word, index) => (
                <Word key={`word-${index}`} word={word} length={LENGTH} correctWord={WORD.toLowerCase()} />
            ))}
            {<Word word={currentWord} length={LENGTH} />}
            {remaining > 0 && [...Array(remaining).keys()].map(index => (
                <Word word="" length={LENGTH} key={`remaining-${index}`} />
            ))}
            <Keyboard correctWord={WORD.toLowerCase()} words={words} onUseKey={handleLetter} onBackspace={handleBackspace} onEnter={submitWord}/>
            <div className="newWordButton">
                <button onClick={() => handleNewWord() }>
                    Nowe słowo
                </button>
            </div>
        </div>
    );
}

export default App;
