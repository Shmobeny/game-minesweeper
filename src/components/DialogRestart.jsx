import React from "react";

export default function DialogRestart(props) {
  const emoji = props.type === "lose" ? "💀" : "🍀";
  
  const title = props.type === "lose" ? 
    "Game Over!" :
    "Field Cleared!";

  const message = props.type === "lose" ?
    "Do you want to test your luck one more time?" : 
    "You did good! Play once more?";

  function handleClick(e) {
    switch (true) {
      case e.target.id === "button-restart":
        props.dispatch({type: "restart"});
        break;
      case e.target.id === "button-menu":
        props.dispatch({type: "back-to-menu"});
        break;
      default:
        return;
    }
  }
  
  return (
    <div className="dialog-restart" style={{top: window["main-container"].scrollTop}} onClick={handleClick}>
      <span className="dialog-restart__emoji">{emoji}</span>
      <h2 className={`dialog-restart__title--${props.type}`}>{title}</h2>
      <p className="dialog-restart__text">{message}</p>
      <button id="button-restart" className="button dialog-restart__button">Restart</button>
      <button id="button-menu" className="button dialog-restart__button">Main Menu</button>
    </div>
  )
}