const express = require("express")
const itens = require("./inventario.json")

const mostrarItens = (req, res) => {
    res.send(itens)
}

const novoItem = (req, res) => {
    if (req.body) {
        res.send("Item cadastrado")
        itens.push(req.body)
    } else {
        res.send("Erro")
    }
}

const buscarItem = (req, res) => {
    const id = req.params.id;
    const itemLocalizado = itens.find((item) => item.id == id);

    if (itemLocalizado) {
        res.send(itemLocalizado);
    } else {
        res.status(404).send("Item não localizado")
    }
};

const excluirItem = (req, res) => {
    const id = req.params.id;

    itens.forEach((item, indice) => {
        if (item.id == id) {
            itens.splice(indice, 1);
        }
    });

    res.send("Pedido excluido com sucesso.");
};

const alterarItem = (req, res) => {
    const id = req.params.id;
    const nItens = req.body;

    itens.forEach((item) => {
        if (item.id == id) {
            item.item = nItens.item;
            item.local = nItens.local;
            item.dataRegistro = nItens.dataRegistro;
            item.valor = nItens.valor;
            item.patrimonio = nItens.patrimonio;
        }
    });

    res.send("Pedido atualizado com sucesso !");
};

const app = express()
app.use(express.urlencoded({ extended: true }))
const porta = 3000

app.post("/inventario/:id", novoItem)
app.get("/", mostrarItens)
app.get("/inventario/:id", buscarItem)
app.delete("/inventario/:id", excluirItem);
app.put("/inventario/:id", alterarItem);

app.listen(porta, () => {
    console.log(`Cliente: http://127.0.0.1:5500/cliente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})