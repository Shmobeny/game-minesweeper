import React, { useState, useRef } from 'react';
import Square from './Square';
import makeMatrix from '../functions/makeMatrix';

export default function GameField(props) {
  let safeSquares = useRef([]);
  
  const [matrix, setMatrix] = useState(() => makeMatrix(props));
  const [squaresCollection, setSquaresCollection] = useState(() => makeSquaresCollection());

  function makeSquaresCollection(modify = "pending") {
    let collection = [];

    for (let row of matrix) {
      for (let cell of row) {
        collection.push(
          <Square
            ref={React.createRef()}
            key={cell.globalIndex}
            globalIndex={cell.globalIndex}
            coords={cell.coords}
            cols={props.cols}
            isExposed={modify === "pending" ? false : true}
            isMarked={cell.isMarked}
            bombInside={cell.bombInside}
            neighbors={cell.neighbors}
            bombsAround={cell.bombInside ? 99 : cell.bombsAround}
            edit={editSquare}
            scan={scanSquare}
            gameResult={modify}
          />
        );
        
        if (!cell.bombInside) safeSquares.current.push(cell.globalIndex);
      }
    }

    return collection;
  }

  function editSquare(indexes, props) {
    
    for (let index of indexes) {
      if ("isExposed" in props && squaresCollection[index].props.bombInside) {
        gameOver("lose");
        return;
      }
      
      let safeIndex = safeSquares.current.indexOf(squaresCollection[index].props.globalIndex);
      if ("isExposed" in props && safeIndex !== -1) safeSquares.current.splice(safeIndex, 1);
      
      if (safeSquares.current.length === 0) {
        gameOver("win");
        return;
      }
    }

    setSquaresCollection(prevCollection => {
      let updatedCollection = [...prevCollection];

      for (let index of indexes) {
        let originalSquareProps = {...updatedCollection[index].props};
      
        let newSquare =
          <Square
            ref={React.createRef()}
            key={originalSquareProps.globalIndex}
            globalIndex={originalSquareProps.globalIndex}
            coords={originalSquareProps.coords}
            cols={originalSquareProps.cols}
            isExposed={"isExposed" in props ? props.isExposed : originalSquareProps.isExposed}
            isMarked={"isMarked" in props ? props.isMarked : originalSquareProps.isMarked}
            bombInside={originalSquareProps.bombInside}
            neighbors={originalSquareProps.neighbors}
            bombsAround={originalSquareProps.bombsAround}
            edit={editSquare}
            scan={scanSquare}
            gameResult={originalSquareProps.gameResult}
          />;
        
        updatedCollection[index] = newSquare;
      }
      
      return updatedCollection;
    });
  }

  function scanSquare(index) {
    return squaresCollection[index].props;
  }

  function gameOver(result) {
    setSquaresCollection(() => makeSquaresCollection(result));
    props.dispatch({type: "call-dialog", payload: result});
  }
  
  return (
    <div className="game-field">
      
      {squaresCollection}

    </div>
  )
}