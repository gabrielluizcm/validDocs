window.onload = inicializaMascaras;

function ValidadorCpf(string) {
  Object.defineProperty(this, 'valido', {
    get: function () {
      return this.calculaValidade(string);
    }
  })
}
ValidadorCpf.prototype.calculaDigito = function (resto) {
  return resto < 2 ? 0 : 11 - resto;
}
ValidadorCpf.prototype.calculaValidade = function (string) {
  const stringLimpa = string.replace(/\D+/g, '');

  const arrayString = Array.from(stringLimpa.slice(0, -2));
  const total1 = arrayString.reduce((acc, val, index) =>
    acc += val * (10 - index), 0);
  const resto1 = total1 % 11;
  const digito1 = this.calculaDigito(resto1);
  arrayString.push(digito1);

  // Não calcula o segundo dígito se o primeiro for diferente
  if (stringLimpa.slice(0, -1) !== arrayString.join(''))
    return false;

  const total2 = arrayString.reduce((acc, val, index) =>
    acc += val * (11 - index), 0);
  const resto2 = total2 % 11;
  const digito2 = this.calculaDigito(resto2);
  arrayString.push(digito2);

  if (stringLimpa !== arrayString.join(''))
    return false;

  return true;
}

function inicializaMascaras() {
  mascaraCpf();
  mascaraCnpj();
}

function mascaraCpf() {
  const inputsCpf = document.querySelectorAll('.cpf');

  inputsCpf.forEach(input => {
    input.addEventListener('input', event => {
      let valor = event.target.value;

      if (valor.length > 14)
        valor = valor.slice(0, -1);

      // Remove caracteres não numéricos
      valor = valor.replace(/\D+/g, '');

      // Aplica a máscara
      const valorArray = Array.from(valor)

      if (valor.length > 3)
        valorArray.splice(3, 0, '.')
      if (valor.length > 6)
        valorArray.splice(7, 0, '.')
      if (valor.length > 9)
        valorArray.splice(11, 0, '-')

      valor = valorArray.join('')
      event.target.value = valor;

      if (valor.length === 14) {
        const validador = new ValidadorCpf(valor)
        console.log(validador.valido)
      }
    })
  })
}

function mascaraCnpj() {
  const inputsCnpj = document.querySelectorAll('.cnpj');

  inputsCnpj.forEach(input => {
    input.addEventListener('input', event => {
      let valor = event.target.value;

      if (valor.length > 18)
        valor = valor.slice(0, -1);

      // Remove caracteres não numéricos
      valor = valor.replace(/\D+/g, '');

      // Aplica a máscara
      const valorArray = Array.from(valor)

      if (valor.length > 2)
        valorArray.splice(2, 0, '.')
      if (valor.length > 5)
        valorArray.splice(6, 0, '.')
      if (valor.length > 8)
        valorArray.splice(10, 0, '/')
      if (valor.length > 12)
        valorArray.splice(15, 0, '-')

      valor = valorArray.join('')
      event.target.value = valor;
    })
  })
}