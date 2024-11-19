import { testandoUrl } from "./index.js";
import express from "express";
import cors from "cors";
import timeout from "connect-timeout";

const app = express();
const port = 8000;

app.use(timeout("120s"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log("Servidor rodando na porta 8000");
});

// Transforme o callback em uma função assíncrona
app.post("/", async (req, res) => {
  try {
    const origem = req.body.origem;
    const dataOrigem = req.body.dataOrigem;
    const dataSaida = req.body.dataSaida;
    const destino = req.body.destino;
    // Agora você pode usar 'await' com a função assíncrona
    const resposta = await testandoUrl(origem, dataOrigem, dataSaida, destino);

    // A resposta agora deve ser um array com 'url' e 'valor'
    const [url, valor] = resposta;
    console.log(url);
    console.log(valor);
    //console.log("resposta" + resposta);

    res.send({ url, valor }); // Envia a resposta para o cliente
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter os dados da viagem.");
  }
});
