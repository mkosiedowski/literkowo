import React, {useEffect, useState} from 'react';
import GameStartForm from "./GameStartForm";
import Game from "./game";
import './App.css';
import ShareIcon from "./ShareIcon";

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

    const onShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Literkowo',
                text: 'Zgadnij moje hasło!',
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    }

    return <div className="App">
        <h1>Literkowo</h1>
        <div onClick={onShareClick} className="shareButton"><ShareIcon size={20} /></div>
        {component}
    </div>
}

export default App;
