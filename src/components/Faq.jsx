import React from "react";

export default function Faq(props) {
  
  function handleClick() {
    props.dispatch({type: "back-to-menu"});
  }

  return (
    <div className="faq">
      <h2 className="faq__title">How to Paly?</h2>
      
      <div className="faq__icon spacer">🤔</div>
      <h3 className="faq__sub-title">Main principles behind Minesweeper</h3>
      <p className="faq__paragraph">Each Minesweeper game starts out with a grid of unmarked squares. After clicking one of these squares, some of the squares will disappear, some will remain blank, and some will have numbers on them. It's your job to use the numbers to figure out which of the blank squares have mines and which are safe to click.</p>
      
      <div className="faq__icon spacer">🖱️ & 👆</div>
      <h3 className="faq__sub-title">Use the mouse's left and right buttons or touchscreen</h3>
      <p className="faq__paragraph">The left mouse button is used to click squares that don't contain mines, while the right mouse button is used to flag squares that contain mines.</p>
      <p className="faq__paragraph">If you are mobile user, touch any square and you will see virtual buttons with <span className="faq__icon">🔍</span> or <span className="faq__icon">🚩</span>. First button will expose square, second one - place flag on it.</p>
      
      <div className="faq__icon spacer">🤯</div>
      <h3 className="faq__sub-title">What the numbers mean?</h3>
      <p className="faq__paragraph">A number on a square refers to the number of mines that are currently "touching" that square. For example, if there are two squares touching each other and one of the squares has "<span className="faq__square-number">1</span>" on it, you know that the square next to it has a mine beneath it.</p>
      
      <div className="faq__icon spacer">🏁😎🏁</div>
      <h3 className="faq__sub-title">When game ends?</h3>
      <p className="faq__paragraph">To win a round of Minesweeper, you must click on the board every square that doesn't have a mine under it. Once you've done so, the game will be over with win result. If you "stepped" on mine during this process, you will lose.</p>

      <div className="faq__icon spacer">🤨</div>
      <h3 className="faq__sub-title">Difficulty levels</h3>
      <p className="faq__paragraph">In current app no "hard coded" difficulty levels, but you can customise game balance by change quantity of <b>squares</b>, <b>columns</b> and <b>bombs</b> in <b>settings</b>. Also, keep in mind, that on low-powered devices large grids can cause performance drops.</p>

      <button className="button faq__button" onClick={handleClick}>Return</button>
    </div>
  )
}