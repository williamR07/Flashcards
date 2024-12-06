const express = require('express');
const mysql = require('mysql2');
const PORT = 3000;
const app = express();
const cors = require('cors');


app.use(cors());


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'question'
});

conn.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySQL" + err)
    }
    console.log('Connected to MySQL successfully');
});

app.get('/question',(req, res)=>{
    res.json({message: "Conncted to backedn successfully!!!"})
})

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));

