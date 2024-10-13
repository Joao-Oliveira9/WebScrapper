"use strict";

const button = document.querySelector("button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  console.log(input.value);
  sendData(input.value);
});

async function sendData(input) {
  console.log("Dado: " + input);
  const login = await fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: input,
    }),
  }).then((res) => {
    console.log(res);
  });
  if (login.ok) {
    console.log("Formulario enviado");
  } else {
    console.log("Formulario não enviado");
  }
}
