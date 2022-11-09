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
        this.status = "started"
    }
    checkWinConditions(symbol="x"){
        console.log("sprawdzam czy ktos wygral")
        if (this.board.filter(field => field === symbol).length === 3){
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
        this.status = "ended"
        console.log(this.status)
        return "koniec gry"
    }
    makeMove(field){
        console.log("ive recieved field"+field)
        this.board = this.board.map((el,index) => (index.toString()===field) ? "x" : el)
        if (this.checkWinConditions()) this.endTheGame()
        else{
            //computer's move
            const emptyFields = this.board.map((el,index) => [el,index]).filter(el => el[0] === "").map(el => el[1])
            const fieldToChange = emptyFields[Math.floor((Math.random()*emptyFields.length))]
            this.board = this.board.map((el,index) => (index===fieldToChange) ? "o" : el)
            this.checkWinConditions("o")
        }
        return this.board
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const db = new Datebase();


app.post("/create", (req, res) => {
    const name = req.body.name;
    return res.send({response: db.newGame(name)})
})
app.get("/games", (req, res) => {
    return res.send(db.games)
})
app.post("/move", (req,res) => {
    const {id, field} = req.body;
    (db.games.find(game => game.id === id) === undefined) ? res.send({status: 404, response: `cannot find a game with id of ${id}`})
    : res.send(db.games.find(game => game.id === id).makeMove(field))
})



app.listen(5000, () => {
    console.log("its alive on 5000")
})

