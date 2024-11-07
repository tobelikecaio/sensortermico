let intervalo;
let coletaAtiva = false;

function iniciarColeta() {
  coletaAtiva = true;

  document.getElementById("startMonitoramento").disabled = true;
  document.getElementById("stopMonitoramento").disabled = false;

  intervalo = setInterval(trazerDados, 1000);
}

function pararColeta() {
  coletaAtiva = false;

  document.getElementById("startMonitoramento").disabled = false;
  document.getElementById("stopMonitoramento").disabled = true;

  clearInterval(intervalo);
}

function trazerDados() {
  const apiUrl =
    "https://ilh4nkogqj.execute-api.us-east-1.amazonaws.com/prod/CAIO-SENSOR";

  const agora = new Date();
  const hora = agora.getHours().toString().padStart(2, "0");
  const minuto = agora.getMinutes().toString().padStart(2, "0");
  const segundo = agora.getSeconds().toString().padStart(2, "0");
  const tempo = `${hora}:${minuto}:${segundo}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];

        if (item.umidade !== undefined && item.temperatura !== undefined) {
          const newData = `Hora: ${tempo}\nUmidade: ${item.umidade}%\nTemperatura: ${item.temperatura}°C\n\n`;
          document.getElementById("sensorData").value += newData;
        } else {
          document.getElementById(
            "sensorData"
          ).value += `Hora: ${tempo}\nDados não encontrados ou formato errado.\n\n`;
        }
      } else {
        document.getElementById(
          "sensorData"
        ).value += `Hora: ${tempo}\nDados não encontrados ou formato errado.\n\n`;
      }
    })
    .catch((error) => {
      document.getElementById(
        "sensorData"
      ).value += `Hora: ${tempo}\nErro ao carregar dados.\n\n`;
      console.error("Erro ao coletar dados:", error);
    });
}
