import React, {useState} from "react";

const GameLost = () => {
    const [visible, setVisible] = useState(true);
    return (
        visible ? <div className="msg gameLost">
            <span className="closeMsg" onClick={() => setVisible(false)}>x</span>
            Nie udało się!
            <button onClick={() => window.location.reload()}>Spróbuj jeszcze raz</button>
        </div> : null
    )
};

export default GameLost;