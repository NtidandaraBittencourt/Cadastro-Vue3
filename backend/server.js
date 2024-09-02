const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/registration', (req, res) => {
    const { name, email, cpfOrCnpj, personType, dataInit, phone, password} = req.body

    if (!name || !email || !cpfOrCnpj || !personType || !dataInit || !phone || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
    }

    res.json({ message: 'Cadastro realizado com sucesso!' })
})

app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`)
})
