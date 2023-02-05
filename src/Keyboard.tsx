type Props = {
    usedKeys: string[];
    onUseKey: (char: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
    word: string;
};

const ENTER = 'enter';
const BACKSPACE = '<-'

export const KEYS = [
    ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    [ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', BACKSPACE],
]
const Keyboard = ({usedKeys, onUseKey, onEnter, onBackspace, word}: Props) => {
    const handleClick = (letter: string) => {
        if (letter === ENTER) {
            onEnter();
        } else if (letter === BACKSPACE) {
            onBackspace();
        } else {
            onUseKey(letter);
        }
    }
    return (
        <div className="keyboard">
            {KEYS.map((row, index) => (
                <div key={`row-${index}`} className="keyboardRow">
                    {row.map(letter => (
                        <div
                            onClick={() => handleClick(letter)}
                            className={`keyboardKey ${usedKeys.includes(letter) ? 'used' : ''} ${letter} ${word.includes(letter) && usedKeys.includes(letter) ? 'matched' :''}`}
                            key={letter}
                        >{letter}</div>
                    ))}
                </div>
            ))}
        </div>);
}

export default Keyboard;