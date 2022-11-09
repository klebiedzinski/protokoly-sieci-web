import { useState } from "react";
import Start from "./Start";
import End from "./End";
import TicTacToe from './TicTacToe'
import axios from "axios";
const App = () => {
    const [gameId, setGameId] = useState(0)
    const [board,setBoard] = useState(null)
    const [gameStatus, setGameStatus] = useState("live")
    const createNewGame = (playersName) => {
        axios.post('http://localhost:5000/create', {
          "name": playersName
        })
        .then((res) => {
            const board = res.data.board.map((field,index) => {
                return {
                    field: field,
                    id: index
                }
            })
            setBoard(board)
            console.log(board)
            setGameId(res.data.gameId)
            
        })
        .catch(err => console.log(err))
      }
    const handleStart = () => {
        setGameBegan(true)
        createNewGame(playersName)
    }
    const handleClickFields = async (field) => {
        console.log(board)
        await axios.post('http://localhost:5000/move', {
          id: gameId,
          field: field
        })
          .then(res => {
            const newBoard = res.data.board.map((field,index) => {
                return {
                    field: field,
                    id: index
                }
            })
            const newStatus = res.data.status
            // console.log(newStatus)
            setBoard(newBoard)
            setGameStatus(newStatus)
            
            

          })
          .catch(err => console.log(err))
          console.log(gameStatus)
      }
    const [playersName,setPlayersName] = useState("Player")
    const [gameBegan,setGameBegan] = useState(false)
    
    return ( 
        <div className="container">
            {!gameBegan && <Start handleStart={handleStart} setPlayersName={setPlayersName}/> }
            {board && <TicTacToe board={board} gameId={gameId} setBoard={setBoard} handleClickFields={handleClickFields}/>}
            {gameStatus!=="live" && <End winner={gameStatus}/>}
            
        </div>
     );
}
 
export default App;