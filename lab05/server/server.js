const express = require('express')
const bodyParser = require("body-parser")
const uuid = require('uuid');
const cors = require('cors')


class Game {
    constructor(player) {
        this.player = player;
        this.board = [...Array(9)].map(_ => (''))
        this.id = uuid.v4();
        this.status = "live" // live, draw or winningPlayer
    }
    checkDraw(){
        return this.board.filter(field => (field === "x") || (field ==="o")).length === 9
    }
    checkWinConditions(symbol){
        
        if (this.board.filter(field => field === symbol).length >= 3){ // if a player marked on a board at least 3 times
            //horizontal
            if (this.board[0] === symbol && this.board[0] === this.board[1] && this.board[0] === this.board[2]) return true
            if (this.board[3] === symbol && this.board[3] === this.board[4] && this.board[5] === this.board[3]) return true
            if (this.board[6] === symbol && this.board[6] === this.board[7] && this.board[8] === this.board[6]) return true
            //vertical
            if (this.board[0] === symbol && this.board[0] === this.board[3] && this.board[6] === this.board[3]) return true
            if (this.board[1] === symbol && this.board[1] === this.board[4] && this.board[7] === this.board[1]) return true
            if (this.board[2] === symbol && this.board[2] === this.board[5] && this.board[2] === this.board[8]) return true
            //diagonal
            if (this.board[0] === symbol && this.board[0] === this.board[4] && this.board[0] === this.board[8]) return true
            if (this.board[6] === symbol && this.board[6] === this.board[4] && this.board[4] === this.board[2]) return true

            else return false
        }
        else return false
        
    }
   
    makeMove(field){
        if (this.status==="live"){
            // console.log(`game: ${this.id}: ive recieved field ${field}`)
            this.board = this.board.map((el,index) => (index==field) ? "x" : el)
            if (this.checkWinConditions("x")) {
                this.status = `${this.player}`
            }
            else{
                if (this.checkDraw()) this.status = "draw"
                else{
                    //bot's move
                    if (this.status==="live"){
                        const emptyFields = this.board.map((el,index) => [el,index]).filter(el => el[0] === "").map(el => el[1])
                        const fieldToChange = emptyFields[Math.floor((Math.random()*emptyFields.length))]
                        this.board = this.board.map((el,index) => (index===fieldToChange) ? "o" : el)
                        if (this.checkWinConditions("o")) this.status = "bot"
                    }
                }
            }
        }
        return {
            board: this.board,
            status: this.status
        }
    }
}


class Datebase {
    constructor() {
        this.games = [];
    }
    newGame(player) {
        const newGame = new Game(player)
        this.games.push(newGame);
        return `New game had been added! Id:${newGame.id}, player ${player}`
    }
}

const db = new Datebase();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({origin: "*"}))


app.post("/create", (req, res) => {
    const name = req.body.name;
    return res.send(
        {
            response: db.newGame(name),
            board: [...Array(9)].map(_ => ('')),
            gameId: db.games.find(game => game.player === name).id
        }
    )
})

app.get("/games", (req, res) => {
    return res.send(db.games)
})

app.post("/move", (req,res) => {
    const {id, field} = req.body;
    if (db.games.find(game => game.id === id) === undefined) res.send({status: 404, response: `cannot find a game with id of ${id}`})
    else {
        res.send(db.games.find(game => game.id === id).makeMove(field))
    }
})

app.listen(5000, () => {
    console.log("its alive on 5000")
})

