import {useLayoutEffect} from "react";

type Props = {
    words: string[];
    onUseKey: (char: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
    correctWord: string;
};

const ENTER = 'enter';
const BACKSPACE = '↩'

export const KEYS = [
    ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    [ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', BACKSPACE],
]
const Keyboard = ({words, onUseKey, onEnter, onBackspace, correctWord}: Props) => {
    const handleClick = (letter: string) => {
        if (letter === ENTER) {
            onEnter();
        } else if (letter === BACKSPACE) {
            onBackspace();
        } else {
            onUseKey(letter);
        }
    }
    useLayoutEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Backspace') {
                onBackspace();
            } else if (event.key === 'Enter') {
                onEnter();
            } else if (KEYS.flatMap(row => [...row]).includes(event.key)) {
                handleClick(event.key);
            }
        }
        window.document.addEventListener('keydown', onKeyDown);

        return () => window.document.removeEventListener('keydown', onKeyDown);
    })
    const isUsed = (letter: string) => words.flatMap(word => [...word.split('')]).includes(letter);
    const correctLetters = correctWord.split('')
        .filter((l, index) => words.some(word => word.charAt(index) === l));
    const isCorrect = (letter: string) => correctLetters.includes(letter);
    const isMisplaced = (letter: string) => !isCorrect(letter)
        && words.flatMap(word => [...word.split('')]).filter(l => correctWord.includes(l)).includes(letter);
    return (
        <div className="keyboard">
            {KEYS.map((row, index) => (
                <div key={`row-${index}`} className="keyboardRow">
                    {row.map(letter => (
                        <div
                            onClick={() => handleClick(letter)}
                            className={`keyboardKey ${isUsed(letter) ? 'used' : ''} ${letter} ${isCorrect(letter) ? 'matched' :''} ${isMisplaced(letter) ? 'misplaced' : ''}`}
                            key={letter}
                        >{letter}</div>
                    ))}
                </div>
            ))}
        </div>);
}

export default Keyboard;