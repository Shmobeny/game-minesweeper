import React, { useEffect, useReducer, useRef } from 'react';

import InfoPanel from './components/InfoPanel';
import MainMenu from './components/MainMenu';
import GameField from './components/GameField';
import DialogRestart from './components/DialogRestart';
import Settings from './components/Settings';
import Faq from './components/Faq';

import resizeWatcher from './functions/resizeWatcher';

const App = React.forwardRef((props, ref) =>  {

  let observer = useRef(null)

  useEffect(() => {
    observer.current = resizeWatcher(ref.current);
    observer.current.observe(document.documentElement);
    
    return () => observer.current.disconnect();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    currently: "in-menu",
    roundID: null,
    showDialog: false,
    dialogType: "pending",
    squares: 54,
    cols: 6,
    bombs: 5,
  });

  function reducer(state, action) {
    let newState = {...state};

    switch (action.type) {
      case "hide-dialog":
        newState.showDialog = false;
        break;
      case "call-dialog":
        newState.showDialog = true;
        newState.dialogType = action.payload;
        break;
      case "restart":
        newState.roundID = new Date().getTime();
        newState.showDialog = false;
        newState.dialogType = "pending";
        break;
      case "back-to-menu":
        newState.currently = "in-menu";
        newState.showDialog = false;
        newState.dialogType = "pending";
        break;
      case "start-game":
        newState.currently = "in-game";
        newState.roundID = new Date().getTime();
        break;
      case "go-settings":
        newState.currently = "in-settings";
        break;
      case "save-settings":
        newState.currently = "in-menu";
        newState.squares = action.payload.squares;
        newState.cols = action.payload.cols;
        newState.bombs = action.payload.bombs;
        break;
      case "go-faq":
        newState.currently = "in-faq";
        break;
      default:
        console.log("Passed unknown action in dispatch function!");
        return state;
    }

    return newState;
  }

  return (
    <div ref={ref} className="App">
      <InfoPanel
        isActive = {state.currently === "in-game" ? true : false}
        isCounting = {state.currently === "in-game" && state.showDialog === false ? true : false}
        bombs={state.bombs}
        gameResult={state.dialogType}
      />
      <main id="main-container" className={state.showDialog === true || state.currently === "in-menu" || state.currently === "in-settings" ? "main-container main-container--no-scroll" : "main-container"}>
        {state.currently === "in-menu" ? <MainMenu
          dispatch={dispatch}
        /> : false}
        {state.currently === "in-game" ? <GameField
          key={state.roundID} 
          squares={state.squares}
          cols={state.cols}
          bombs={state.bombs}
          dispatch={dispatch}
        /> : false}
        {state.currently === "in-settings" ? <Settings
          squares={state.squares}
          cols={state.cols}
          bombs={state.bombs}
          dispatch={dispatch}
        /> : false}
        {state.currently === "in-faq" ? <Faq
          dispatch={dispatch}
        /> : false}
        {state.showDialog ? <DialogRestart
          type={state.dialogType}
          dispatch={dispatch}
        /> : false}
      </main>
    </div>
  );
});

export default App;