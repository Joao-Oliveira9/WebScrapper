const botao = document.querySelector("button");
/* inputs */
const origem = document.getElementById("origem");
const dataSaida = document.getElementById("data/fim");
const dataOrigem = document.getElementById("data/inicio");
const destino = document.getElementById("destino");

window.addEventListener("beforeunload", (event) => {
  console.log("bateu no before");
  event.preventDefault();
  event.returnValue = "";
});

window.addEventListener("submit", (e) => {
  e.preventDefault(); 
});

botao.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("click aqui");
  if (
    origem.value != "" &&
    dataSaida.value != "" &&
    dataOrigem.value != "" &&
    destino.value != ""
  ) {
    await sendFormsData(
      origem.value,
      dataSaida.value,
      dataOrigem.value,
      destino.value
    );
    console.log("oie")
    window.location.href = "index2.html";
  }
  return false;
});

/* const response = await fetchWithTimeout("http://127.0.0.1:8000/", {
  timeout: 30000, // 30 segundos
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    origem,
    dataSaida,
    dataOrigem,
    destino,
  }),
}); */

async function sendFormsData(origem, dataSaida, dataOrigem, destino) {
  try {
    console.log("Dados enviados:", { origem, dataSaida, dataOrigem, destino });
    let response = ""
    try {
      response = await fetch("http://127.0.0.1:8000/", {
        timeout: 60000,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origem,
          dataSaida,
          dataOrigem,
          destino,
        }),
      });

      console.log(response.body);
    } catch (e) {
      console.log("erro no fetch " + e);
    }

    try {
      if (response.ok) {
        const data = await response.json();
        console.log("Dados recebidos do servidor:", data);
        const {url , valor} = data
        localStorage.setItem('url', url);
        localStorage.setItem('valor', valor);
      } else {
        console.error(
          "Erro no servidor:",
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      console.log("erro no if " + e);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
