const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

app.listen( 
    PORT,    
    () =>{
        console.log('port działa: ' + PORT)
    }
)

app.get('/get', (req, res) => {
    res.status(200).send("get request chodzi")
});

app.post('post', (req, res) => {
    const {dane} = req.body;

    res.send("dodano dane na serwer:"+dane)
})