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
            urlWord = window.location.hash ? decodeURIComponent(escape(window.atob(window.location.hash.substring(1)))) : '';
            if (urlWord.length === LENGTH) {
                setWord(urlWord);
            }
        } catch (e) {}
    }, []);

    let component = <></>;
    if (word.length !== LENGTH) {
        component = <GameStartForm lenght={LENGTH} onChoose={(newWord) => setWord(newWord)} />;
    } else {
        component = <Game correctWord={word} />
    }

    return <div className="App">
        <h1>Literkowo</h1>
        {component}
    </div>
}

export default App;
