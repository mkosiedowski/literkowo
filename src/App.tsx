import React, {useEffect, useState} from 'react';
import GameStartForm from "./GameStartForm";
import Game from "./game";
import './App.css';

const LENGTH = 5;

function App() {
    const [word, setWord] = useState('');
    useEffect(() => {
        let urlWord: string = '';
        try {
            const urlHash = window.location.hash;
            urlWord = urlHash ? decodeURIComponent(escape(window.atob(urlHash.substring(1)))) : '';
            if (urlWord.length === LENGTH) {
                setWord(urlWord);
            }
        } catch (e) {}
    }, []);

    const handleChooseWord = (newWord: string) => {
        if (newWord.length === LENGTH) {
            window.location.hash = window.btoa(unescape(encodeURIComponent(newWord)));
            setWord(newWord);
        }
    }

    let component = <></>;
    if (word.length !== LENGTH) {
        component = <GameStartForm length={LENGTH} onChoose={handleChooseWord} />;
    } else {
        component = <Game correctWord={word} />
    }

    return <div className="App">
        <h1>Literkowo</h1>
        {component}
    </div>
}

export default App;
