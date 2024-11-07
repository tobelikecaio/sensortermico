const apiUrl = "https://sua-api.com/sensor"; // URL da API para dados de umidade e temperatura
let dataInterval;

document.getElementById("startMonitoramento").addEventListener("click", () => {
  if (dataInterval) return;

  dataInterval = setInterval(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const sensorDataBox = document.getElementById("sensorData");
        const output = `Temperatura: ${data.temperatura}°C, Umidade: ${data.umidade}%\n`;
        sensorDataBox.value = output + sensorDataBox.value;
      })
      .catch((error) =>
        console.error("Erro ao coletar dados do sensor:", error)
      );
  }, 1000);
});
