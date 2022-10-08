import React, { useState } from "react";

function Settings(props) {

  const [squares, setSquares] = useState(() => parseInt(props.squares));
  const [cols, setCols] = useState(() => parseInt(props.cols));
  const [bombs, setBombs] = useState(() => parseInt(props.bombs));
  
  function handleClick(e) {
    
    props.dispatch({
      type: "save-settings",
      payload: {
        squares: window['settings-squares'].value,
        cols: window['settings-cols'].value,
        bombs: window['settings-bombs'].value
      }
    })
    
  }

  return (
    <div className="settings">
      <h2 className="settings__title">Settings</h2>

      <Block
        type={"squares"}
        title={"Squares"}
        initialValue={Math.ceil(squares / cols) * cols}
        editValue={setSquares}
        min={30}
        max={Math.ceil(500 / cols) * cols}
        step={10}
      />

      <Block
        type={"cols"}
        title={"Colums"}
        initialValue={cols}
        editValue={setCols}
        min={5}
        max={15}
        step={1}
      />

      <Block
        type={"bombs"}
        title={"Bombs"}
        initialValue={bombs >= squares ? squares - 5 : bombs}
        editValue={setBombs}
        min={5}
        max={squares <= 50 ? squares - 5 : 50}
        step={5}
      />

      <button className="button settings__button" onClick={handleClick}>Save</button>

    </div>
  )
}

function Block(props) {
  
  function handleChange(e) {
    if (e.target.value > props.max) return;
    props.editValue(() => parseInt(e.target.value));
  }

  return (
    <div className="settings__block spacer">
      <div className="settings__sub-block">
      <label className="settings__label" htmlFor={"settings-" + props.type}>{props.title}:</label><span className="settings__output">{props.initialValue}</span>
      </div>
      <div className="settings__sub-block">
        <span>{props.min}</span>
        <input className="settings__range" id={"settings-" + props.type} type="range" min={props.min} max={props.max} step={props.step} defaultValue={props.initialValue} onChange={handleChange}></input>
        <span>{props.max}</span>
      </div>
    </div>
  )
}

export default Settings;