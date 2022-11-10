const End = ({winner}) => {
    return ( 
        (winner === "draw") ? <div className="end">Its a draw</div> : <div className="end">{winner} won!</div>
     );
}
 
export default End;