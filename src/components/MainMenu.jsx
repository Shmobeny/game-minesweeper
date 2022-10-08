import React from "react";

export default function MainMenu(props) {
  
  function handleClick(e) {
    switch (true) {
      case e.target.id === "button-start":
        props.dispatch({type: "start-game"});
        break;
      case e.target.id === "button-settings":
        props.dispatch({type: "go-settings"});
        break;
      case e.target.id === "button-faq":
        props.dispatch({type: "go-faq"});
        break;
      default:
        return;
    }
  }

  return (
    <div className="main-menu" onClick={handleClick}>
      <button id="button-start" className="button main-menu__button">Start Game</button>
      <button id="button-settings" className="button main-menu__button">Settings</button>
      <button id="button-faq" className="button main-menu__button">How to Play</button>
    </div>
  )
}