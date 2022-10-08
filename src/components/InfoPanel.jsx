import { useEffect, useState, useRef } from "react";

export default function InfoPanel(props) {
  return (
    <header className="info-panel">
      {props.isActive ? 
        <>
          <BombInfo bombs={props.bombs} />
          <PlayerInfo gameResult={props.gameResult} />
          <TimeInfo isCounting={props.isCounting} />
        </> : <InfoPlaceholder />
      }
    </header>
  );
}

function BombInfo (props) {
  let bombString = props.bombs.toString();

  switch (bombString.length) {
    case 1:
      bombString = "00" + props.bombs;
      break;
    case 2:
      bombString = "0" + props.bombs;
      break;
    case 3:
      bombString = bombString;
      break;
    default:
      bombString = "999+";
  }

  return (
    <div className="info-panel__bombs">{bombString}</div>
  );
}

function PlayerInfo (props) {
  return (
    <div className="info-panel__player-logo">
      {
        props.gameResult === "lose" ? "😖" :
        props.gameResult === "win" ? "😄 ": "🙂"
      }
    </div>
  );
}

function TimeInfo (props) {
  const [time, setTime] = useState(() => 0);
  let timer = useRef(null);

  useEffect(() => {
    if (props.isCounting) {
      if (time !== 0) setTime(() => 0);
      timer.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
      timer.current = null;
    }

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [props.isCounting])

  return (
    <div className="info-panel__time">
      {
        time.toString().length === 3 ? time :
        time.toString().length === 2 ? "0" + time :
        time.toString().length === 1 ? "00" + time : "999+"
      }
    </div>
  );
}

function InfoPlaceholder (props) {
  return (
    <h1 className="info-panel__placeholder">💣 Minesweeper 💣</h1>
  )
}