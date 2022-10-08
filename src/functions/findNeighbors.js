// array must be matrix
export default function findNeighbors(item, array, alt = false) {
  
  //find coods of target item
  let coords = {};
  for (let i = 0; i < array.length; i++) {
    let index = array[i].indexOf(item);
    
    if (index > -1) {
      coords = {
        row: i,
        col: index
      }
    }
  }
   
  //find neighbors for target item
  let neighbors;

  if (!alt) {
    neighbors = {
      topLeft: ( (coords.row - 1 > -1) && (coords.col - 1 > -1) ) ? array[coords.row - 1][coords.col - 1] : "--",
      top: coords.row - 1 > -1 ? array[coords.row - 1][coords.col] : "--",
      topRight: ( (coords.row - 1 > -1) && (coords.col + 1 < array[0].length) ) ? array[coords.row - 1][coords.col + 1] : "--",
      
      bottomLeft: ( (coords.row + 1 < array.length) && (coords.col - 1 > -1) ) ? array[coords.row + 1][coords.col - 1] : "--",
      bottom: coords.row + 1 < array.length ? array[coords.row + 1][coords.col] : "--",
      bottomRight: ( (coords.row + 1 < array.length) && (coords.col + 1 < array[0].length) ) ? array[coords.row + 1][coords.col + 1] : "--",
      
      left: coords.col - 1 > -1 ? array[coords.row][coords.col - 1] : "--",
      right: coords.col + 1 < array[0].length ? array[coords.row][coords.col + 1] : "--",
    }
  }

  if (alt) {
    neighbors = {
      topLeft: ( (coords.row - 1 > -1) && (coords.col - 1 > -1) ) ? {row: coords.row - 1, col: coords.col - 1} : "--",
      top: coords.row - 1 > -1 ? {row: coords.row - 1, col: coords.col} : "--",
      topRight: ( (coords.row - 1 > -1) && (coords.col + 1 < array[0].length) ) ? {row: coords.row - 1, col: coords.col + 1} : "--",
      
      bottomLeft: ( (coords.row + 1 < array.length) && (coords.col - 1 > -1) ) ? {row: coords.row + 1, col: coords.col - 1} : "--",
      bottom: coords.row + 1 < array.length ? {row: coords.row + 1, col: coords.col} : "--",
      bottomRight: ( (coords.row + 1 < array.length) && (coords.col + 1 < array[0].length) ) ? {row: coords.row + 1, col: coords.col + 1} : "--",
      
      left: coords.col - 1 > -1 ? {row: coords.row, col: coords.col - 1} : "--",
      right: coords.col + 1 < array[0].length ? {row: coords.row, col: coords.col + 1} : "--",
    }
  }
  
  return neighbors;
  
}