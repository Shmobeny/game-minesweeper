import findNeighbors from "./findNeighbors";
import randomNumber from "./randomNumber";

function makeMatrix(gameData) {
  let rows = gameData.squares / gameData.cols;
  let matrix = [];
  let indexesWithBombs = placeBombs(gameData.bombs);

  // generate rows in matris
  for (let j = 0; j < rows; j++) {
    let row = [];

    matrix.push(row);

    // generate items in rows (a.k.a. cols)
    for (let i = 0; i < gameData.cols; i++) {
      row.push({
        globalIndex: j * gameData.cols + i,
        coords: {row: j, col: i},
        isExposed: false,
        isMarked: false,
        bombInside: indexesWithBombs.indexOf(j * gameData.cols + i) === -1 ? false : true
      });
    }
  }

  // find neighbors and count bombs around for each item
  matrix.map(row => {
    let arr = [];

    for (let square of row) {
      square.neighbors = findNeighbors(square, matrix, true);
      square.bombsAround = countBombsAround(square.neighbors);
      
      arr.push(square);
    }

    return arr;
  })

  function placeBombs(quantity) {
    let indexesWithBombs = [];
  
    let unusedIndexes = freeValues(gameData.squares);
  
    for (let i = 0; i < quantity; i++) {
      let pickNumber = randomNumber(0, unusedIndexes.length - 1);
      let randomIndex = unusedIndexes.splice(pickNumber, 1);
  
      indexesWithBombs.push(randomIndex[0]);
    }
  
    function freeValues(quantity) {
      let result = [];
      
      for (let i = 0; i < quantity; i++) {
        result.push(i);
      }
      
      return result;
    }
    
    return indexesWithBombs;
  }

  function countBombsAround(neighbors) {
    let bombsAround = 0;

    for (let neighbor in neighbors) {
      let coords = neighbors[neighbor];
      if (coords === "--") continue;
      if (matrix[coords.row][coords.col] !== "--" && matrix[coords.row][coords.col].bombInside === true) bombsAround++;
    }

    return bombsAround;
  }

  return matrix;
}

export default makeMatrix;