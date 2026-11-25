const formatador = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 10,
});

function obterNumeros() {
  const campo1 = document.getElementById("numero1");
  const campo2 = document.getElementById("numero2");
  const valor1 = campo1.value.trim();
  const valor2 = campo2.value.trim();

  if (valor1 === "" || valor2 === "") {
    mostrarResultado("Preencha os dois campos para calcular.", true);
    return null;
  }

  const numero1 = Number(valor1);
  const numero2 = Number(valor2);

  if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
    mostrarResultado("Digite valores numéricos válidos.", true);
    return null;
  }

  return { numero1, numero2 };
}

function mostrarResultado(mensagem, erro = false) {
  const elemento = document.getElementById("resultado");
  elemento.textContent = mensagem;
  elemento.classList.toggle("erro", erro);
}

function calcular(operacao) {
  const numeros = obterNumeros();
  if (!numeros) return;

  const { numero1, numero2 } = numeros;
  const resultado = operacao(numero1, numero2);

  if (!Number.isFinite(resultado)) {
    mostrarResultado("Não foi possível realizar esse cálculo.", true);
    return;
  }

  mostrarResultado(formatador.format(resultado));
}

function somar() {
  calcular((a, b) => a + b);
}

function subtrair() {
  calcular((a, b) => a - b);
}

function multiplicar() {
  calcular((a, b) => a * b);
}

function dividir() {
  const numeros = obterNumeros();
  if (!numeros) return;

  if (numeros.numero2 === 0) {
    mostrarResultado("Não é possível dividir por zero.", true);
    return;
  }

  const resultado = numeros.numero1 / numeros.numero2;
  if (!Number.isFinite(resultado)) {
    mostrarResultado("Não foi possível realizar esse cálculo.", true);
    return;
  }

  mostrarResultado(formatador.format(resultado));
}
