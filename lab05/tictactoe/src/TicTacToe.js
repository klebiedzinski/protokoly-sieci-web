
function TicTacToe() {
  return (
    <div className="container">
        <section class="title">
            <h1>Tic Tac Toe</h1>
        </section>
        <section class="display">
            Player <span class="display-player playerX">X</span>'s turn
        </section>
        <section class="container">
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
        </section>
        <section class="display announcer hide"></section>
        <section class="controls">
            <button id="reset">Reset</button>
        </section>
    </div>
  );
}

export default TicTacToe;
