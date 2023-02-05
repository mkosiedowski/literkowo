import React, {useState} from "react";

const GameLost = () => {
    const [visible, setVisible] = useState(true);
    return (
        visible ? <div className="msg gameLost">
            <span className="closeMsg" onClick={() => setVisible(false)}>x</span>
            <div>Nie udało się!</div>
            <button onClick={() => window.location.reload()}>Spróbuj jeszcze raz</button>
        </div> : null
    )
};

export default GameLost;