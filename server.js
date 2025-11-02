const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // lembra de instalar essa dependência

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// rota GET /busca?btu=XXXX
app.get('/busca', async (req, res) => {
    const btu = req.query.btu;
    if (!btu) return res.status(400).json({ error: 'Informe o BTU' });

    const query = encodeURIComponent(`ar condicionado ${btu} BTU`);
    const urlML = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

    try {
        const resposta = await fetch(urlML);
        const dados = await resposta.json();

        // Retornar apenas o necessário
        const produtos = dados.results.map(p => ({
            titulo: p.title,
            preco: p.price,
            imagem: p.thumbnail,
            link: p.permalink
        }));

        res.json({ results: produtos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
