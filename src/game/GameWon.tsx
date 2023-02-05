import React, {useState} from "react";

const GameWon = () => {
    const [visible, setVisible] = useState(true);
    return (
        visible ? <div className="msg gameWon">
            <span className="closeMsg" onClick={() => setVisible(false)}>x</span>
            Gratulacje!
        </div> : null
    )
};

export default GameWon;