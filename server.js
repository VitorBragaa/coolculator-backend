const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // permite acesso do front-end de qualquer lugar
app.use(express.json());

// produtos mock
const produtos = require('./produtos.json');

// rota GET /busca?btu=XXXX
app.get('/busca', (req, res) => {
    const btu = req.query.btu;
    if (!btu) return res.status(400).json({ error: 'Informe o BTU' });

    // filtra produtos que contêm o BTU no título
    const resultado = produtos.filter(p => p.titulo.includes(btu));

    res.json({ results: resultado });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
