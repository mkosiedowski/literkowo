import React, {useState} from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";
import GameWon from "./GameWon";
import GameLost from "./GameLost";

type Props = {
    correctWord: string;
}
const Game = ({ correctWord }: Props) => {
    const length = correctWord.length;
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState('');

    const isGameWon = words.length > 0 && words[words.length - 1].toLowerCase() === correctWord.toLowerCase();
    const isGameEnded = words.length === 6 || isGameWon;
    const isGameLost = words.length === 6 && !isGameWon;

    const handleLetter = (letter: string) => {
        if (isGameEnded) return;
        setCurrentWord(current => current.length < length ? `${current}${letter}` : current);
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
        if (currentWord.length === length) {
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
        <div className="game">
            {isGameWon && <GameWon />}
            {isGameLost && <GameLost />}
            {words.map((word, index) => (
                <Word key={`word-${index}`} word={word} length={length} correctWord={correctWord.toLowerCase()} />
            ))}
            {!isGameEnded && <Word word={currentWord} length={length} />}
            {remaining > 0 && [...Array(remaining).keys()].map(index => (
                <Word word="" length={length} key={`remaining-${index}`} />
            ))}
            <Keyboard correctWord={correctWord.toLowerCase()} words={words} onUseKey={handleLetter} onBackspace={handleBackspace} onEnter={submitWord}/>
            <div className="newWordButton">
                <button onClick={() => handleNewWord() }>
                    Nowe słowo
                </button>
            </div>
        </div>
    );
};

export default Game;