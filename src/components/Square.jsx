import React, { useEffect, useRef } from 'react';

const Square = React.forwardRef((props, ref) => {
  
  let timer = useRef(false);

  useEffect(() => {
    ref.current.style.width = 100 / props.cols + "%";
    ref.current.style.height = ref.current.offsetWidth + "px";

    switch (props.bombsAround) {
      case 1:
        ref.current.style.color = "blue";
        break;
      case 2:
        ref.current.style.color = "green";
        break;
      case 3:
        ref.current.style.color = "yellow";
        break;
      case 4:
        ref.current.style.color = "orange";
        break;
      case 5:
        ref.current.style.color = "orangered";
        break;
      case 6:
        ref.current.style.color = "crimson";
        break;
      case 7:
        ref.current.style.color = "red";
        break;
      default:
        ref.current.style.color = "cyan";
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (props.gameResult) {
      case "win":
        ref.current.classList.add("game-field__square--win");
        if (!props.bombInside) ref.current.classList.add("game-field__square--safe-square");
        break;
      case "lose":
        ref.current.classList.add("game-field__square--lose");
        if (props.bombInside) ref.current.classList.add("game-field__square--bomb-inside");
        break;
    } 
  }, [props.gameResult]);

  useEffect(() => {
    placeContentInsideSquare();
  }, [props.isMarked]);

  function handlePointerUp(e) {
    
    if (props.isExposed) return;

    switch (e.pointerType !== "mouse") {
      // Detect if event fired with touchscreen
      case true:
        // Find already active tooltip and diactivate it
        let prevToolTip = document.querySelector(".game-field__square--with-tooltip");
        if (prevToolTip !== null && prevToolTip !== ref.current) prevToolTip.classList.remove("game-field__square--with-tooltip");
        
        // Activate tooltip
        ref.current.classList.toggle("game-field__square--with-tooltip");

        // Edit tooltip`s items positions (only, when square is under user usage)
        if (ref.current.classList.contains("game-field__square--with-tooltip")) {
          switch (true) {
            // square in top-left corner
            case (props.coords.col === 0 && props.coords.row === 0):
              ref.current.children[1].style.left = "4px";
              ref.current.children[1].style.top = ref.current.offsetHeight + "px";
              break;
            // all other squares in first column  
            case (props.coords.col === 0 && props.coords.row !== 0):
              ref.current.children[1].style.left = "4px";
              ref.current.children[1].style.top = -ref.current.offsetHeight + "px";
              break;
            // square in top-right corner
            case (props.coords.col === (props.cols - 1) && props.coords.row === 0):
              ref.current.children[2].style.left = "-4px";
              ref.current.children[2].style.top = ref.current.offsetHeight + "px";
              break;
            // all other squares in last column
            case (props.coords.col === (props.cols - 1) && props.coords.row !== 0):
              ref.current.children[2].style.left = "-4px";
              ref.current.children[2].style.top = -ref.current.offsetHeight + "px";
              break;
          }
        }
        
        // Detect click on tooltip item
        switch (true) {
          // item with flag function
          case (e.target.classList.contains("square__tooltip--flag")):
            toggleFlag(e);
            break;
          // item with exposing square function
          case (e.target.classList.contains("square__tooltip--expose")):
            exposeSquare("touch");
            break;
        }

        break;
      
      // Detect if event fired with mouse
      default:
        e.preventDefault();
        
        switch (e.button) {
          // left click
          case 0:
            exposeSquare("mouse");
            break;
          // right click
          case 2:
            toggleFlag(e);
            break; 
        }
    }
  }

  function exposeSquare(eventType) {
    if (props.isExposed) return;

    if (props.isMarked && eventType === "mouse") return;
    
    if (props.bombInside) ref.current.style.backgroundColor = "rgb(200, 0, 0)";

    switch (props.bombsAround) {
      case 0:
        props.edit(getExposeableSquares([], props), {isExposed: true, isMarked: false});
        break;
      default:
        props.edit([props.globalIndex], eventType !== "mouse" ? {isExposed: true, isMarked: false} : {isExposed: true});
    }
  }

  function toggleFlag(e) {
    
    switch (props.isMarked) {
      case false:
        if (timer.current > 0) clearTimeout(timer.current);
        ref.current.classList.add("game-field__square--marked");
        ref.current.classList.add("game-field__square--visible-content");
        props.edit([props.globalIndex], {isMarked: true});
        break;
      
      case true:
        if (timer.current !== false) return;
        ref.current.classList.remove("game-field__square--marked");
        ref.current.classList.remove("game-field__square--visible-content");
        timer.current = setTimeout(() => {
          timer.current = false;
          props.edit([props.globalIndex], {isMarked: false});
        }, 100);
        break;
    }
  }
  
  function placeContentInsideSquare() {
    if (props.isMarked) {
      ref.current.firstElementChild.textContent = "🚩";
      return;
    }

    switch (props.bombInside) {
      case true:
        ref.current.firstElementChild.textContent = "💣";
        break;
      case false:
        if (props.bombsAround > 0) ref.current.firstElementChild.textContent = props.bombsAround;
        if (props.bombsAround === 0) ref.current.firstElementChild.textContent = "";
        break;
      default:
        console.log("Something went wrong in placeContentInsideSquare function");
    }
  }
  
  function getExposeableSquares(array, target) {
    if (array.indexOf(target.globalIndex) === -1) array.push(target.globalIndex);
    
    for (let neighbor in target.neighbors) {
      let neighborCoords = target.neighbors[neighbor];
      if (neighborCoords === "--") continue;
      
      let neighborTarget =  target.scan( neighborCoords.row * props.cols + neighborCoords.col );
      
      if (array.indexOf(neighborTarget.globalIndex) !== -1 || neighborTarget.bombInside) continue;
      
      if (neighborTarget.bombsAround > 0) array.push(neighborTarget.globalIndex);
      if (neighborTarget.bombsAround === 0) array.concat(getExposeableSquares(array, neighborTarget));
    
    }
    
    return array;
  }

  return (
    <div
      ref={ref}
      className={props.isExposed ? "game-field__square game-field__square--exposed game-field__square--visible-content" : "game-field__square"}
      onContextMenu={e => e.preventDefault()}
      onPointerUp={handlePointerUp}
    > 
      <span></span>
      <div className="square__tooltip square__tooltip--flag">🚩</div>
      <div className="square__tooltip square__tooltip--expose">🔍</div>
    </div>
  );
});

export default Square;