const express = require('express')
const bodyParser = require("body-parser")
const uuid = require('uuid');
const _ = require('lodash');
const { urlencoded } = require('body-parser');
class Game {
    constructor(player) {
        this.player = player;
        this.board = [...Array(9)].map(_ => (''))
        this.id = uuid.v4();
    }
    checkWinConditions(symbol="x"){
        if (this.board.filter(field === symbol).length === 3){
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
    endTheGame(){
        return "koniec gry"
    }
    makeMove(field,who){
        this.board = this.board.map((el,index) => (index===field) ? "x" : el)
        if (checkWinConditions()) endTheGame()
    }
}

class Datebase {
    constructor() {
        this.games = [];
    }
    newGame(player) {
        const newGame = new Game(player)
        this.games.push(newGame);
        return `New game had been added! Id:${newGame.id}`
    }
}
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = new Datebase();


app.post("/create", (req, res) => {
    const name = req.body.name;
    return res.send({response: db.newGame(name)})
})
app.get("/games", (req, res) => {
    return res.send(db.games)
})
app.post("/move", urlencoded, (req,res) => {
    console.log(req.body)
    // const {id, field} = req.body
    (db.games.find(game => game.id === id) === undefined) ? res.send({status: 404, response: `cannot find a game with id of ${id}`})
        : res.send(db.games.find(game => game.id === id).makeMove(field,player))
        
})



app.listen(5000, () => {
    console.log("its alive on 5000")
})

