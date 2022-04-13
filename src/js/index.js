window.onload = inicializaCampos;
function Validador(string) {
  Object.defineProperty(this, 'valor', {
    get: function () {
      return string.replace(/\D+/g, '');
    },
    set: function (string) {
      this.valor = string;
    }
  })
}
Validador.prototype.calculaDigito = function (resto) {
  return resto < 2 ? 0 : 11 - resto;
}

function ValidadorCPF(string) {
  Validador.call(this, string);
}
ValidadorCPF.prototype = Object.create(Validador.prototype);
ValidadorCPF.prototype.constructor = ValidadorCPF;

ValidadorCPF.prototype.calculaValidade = function () {
  const arrayString = Array.from(this.valor.slice(0, -2));
  const total1 = arrayString.reduce((acc, val, index) =>
    acc += val * (10 - index), 0);
  const resto1 = total1 % 11;
  const digito1 = this.calculaDigito(resto1);
  arrayString.push(digito1);

  // Não calcula o segundo dígito se o primeiro for diferente
  if (this.valor.slice(0, -1) !== arrayString.join(''))
    return false;

  const total2 = arrayString.reduce((acc, val, index) =>
    acc += val * (11 - index), 0);
  const resto2 = total2 % 11;
  const digito2 = this.calculaDigito(resto2);
  arrayString.push(digito2);

  if (this.valor !== arrayString.join(''))
    return false;

  return true;
}

function inicializaCampos() {
  mascaraCpf();
  mascaraCnpj();
  document.addEventListener('input', event => {
    if (event.target.id === 'inputCpf')
      validaCpf();
  })
}

function validaCpf() {
  const cpfDigitado = document.querySelector('#inputCpf').value

  if (cpfDigitado.length < 14)
    return;

  const validador = new ValidadorCPF(cpfDigitado);

  console.log(validador.calculaValidade());

}
