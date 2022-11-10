const TicTacToe = ({board,handleClickFields}) => {
  return (
    <div className="TicTacToe">
      <h1>TicTacToe</h1>
        <div className="container">
            {board.map(field => {
                return <button className={(field.field === "") ? 'field' : "field clicked"} key={field.id} onClick={() => handleClickFields(field.id)}><p>{field.field}</p></button>
            })}
        </div>
    </div>
  );
}

export default TicTacToe;
