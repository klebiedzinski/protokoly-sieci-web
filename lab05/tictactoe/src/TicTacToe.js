
function TicTacToe() {
  return (
    <div className="TicTacToe">
        <h1>Tic Tac Toe</h1>
        <div className="info">
            Your turn!
        </div>
        <div className="container">
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
            <div className="field"></div>
       
            <button id="reset">Reset</button>
            
        </div>
    </div>
  );
}

export default TicTacToe;
