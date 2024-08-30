const fs = require("fs");

function calcular(faturamento) {
   let menorValor = Number.POSITIVE_INFINITY;
   let maiorValor = 0;
   let soma = 0;
   let diascomfaturamento = 0;
   let diasAcimaDaMedia = 0;

   for (let i = 0; i < faturamento.length; i++) {
      const valor = faturamento[i].valor;

      if (valor > 0) {
         if (valor > maiorValor) {
            maiorValor = valor;
         }

         if (valor < menorValor) {
            menorValor = valor;
         }

         soma += valor;
         diascomfaturamento++;
      }
   }

   const media = soma / diascomfaturamento;

   for (let i = 0; i < faturamento.length; i++) {
      const valor = faturamento[i].valor;

      if (valor > media) {
         diasAcimaDaMedia++;
      }
   }

   return {
      maiorValor,
      menorValor,
      diasAcimaDaMedia,
   };
}

fs.readFile("faturamento.json", "utf8", (error, data) => {
   if (error) {
      console.log("Erro ao ler arquivo");
      return;
   }

   const faturamento = JSON.parse(data);
   const resultado = calcular(faturamento);

   console.log(
      `Menor valor de faturamento no mês: ${resultado.menorValor.toFixed(2)}`
   );
   console.log(
      `Maior valor de faturamento no mês: ${resultado.maiorValor.toFixed(2)}`
   );
   console.log(`Dias com faturamento no mês: ${resultado.diasAcimaDaMedia}`);
});
