import axios from "axios";
const TicTacToe = ({board,handleClickFields}) => {




  return (
    <div className="TicTacToe">
        <h1>Tic Tac Toe</h1>
        <div className="info">
        </div>
        <div className="container">
            {board.map(field => {
                return <button className='field' key={field.id} onClick={() => handleClickFields(field.id)}>{field.field}</button>
            })}
        </div>
    </div>
  );
}

export default TicTacToe;
