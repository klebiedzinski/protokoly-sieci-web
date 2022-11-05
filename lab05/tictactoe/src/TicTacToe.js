import { useState } from "react"
function TicTacToe() {


  const [fields, setFields] = useState(["","","","","","","","",""])
  const handleClickFields = (id) => {
    const newFields = fields.map((el,index) => {
      if (index===id-1) return "x"
      return el
    });
    setFields(newFields);
  }
  return (
    <div className="TicTacToe">
        <h1>Tic Tac Toe</h1>
        <div className="info">
            Your turn!
        </div>
        <div className="container">
            <button className="field 1" onClick={() => handleClickFields(1)}>{fields[0]}</button>
            <button className="field 2" onClick={() => handleClickFields(2)}>{fields[1]}</button>
            <button className="field 3" onClick={() => handleClickFields(3)}>{fields[2]}</button>
            <button className="field 4" onClick={() => handleClickFields(4)}>{fields[3]}</button>
            <button className="field 5" onClick={() => handleClickFields(5)}>{fields[4]}</button>
            <button className="field 6" onClick={() => handleClickFields(6)}>{fields[5]}</button>
            <button className="field 7" onClick={() => handleClickFields(7)}>{fields[6]}</button>
            <button className="field 8" onClick={() => handleClickFields(8)}>{fields[7]}</button>
            <button className="field 9" onClick={() => handleClickFields(9)}>{fields[8]}</button>
       
            
        </div>
    </div>
  );
}

export default TicTacToe;
