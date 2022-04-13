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
Validador.prototype.calculaDigito = function (total) {
  const resto = total % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function ValidadorCPF(string) {
  Validador.call(this, string);
}
ValidadorCPF.prototype = Object.create(Validador.prototype);
ValidadorCPF.prototype.constructor = ValidadorCPF;

ValidadorCPF.prototype.somaTotal = function (array) {
  const multiplicadorInicial = array.length === 9 ? 10 : 11;
  return array.reduce((acc, val, index) =>
    acc += val * (multiplicadorInicial - index), 0);
}

ValidadorCPF.prototype.calculaValidade = function () {
  if (this.valor === '0'.repeat(11))
    return false;

  const arrayString = Array.from(this.valor.slice(0, -2));
  const total1 = this.somaTotal(arrayString);
  const digito1 = this.calculaDigito(total1);
  arrayString.push(digito1);

  // Não calcula o segundo dígito se o primeiro for diferente
  if (this.valor.slice(0, -1) !== arrayString.join(''))
    return false;

  const total2 = this.somaTotal(arrayString);
  const digito2 = this.calculaDigito(total2);
  arrayString.push(digito2);

  if (this.valor !== arrayString.join(''))
    return false;

  return true;
}

function ValidadorCNPJ(string) {
  Validador.call(this, string);
}
ValidadorCNPJ.prototype = Object.create(Validador.prototype);
ValidadorCNPJ.prototype.constructor = ValidadorCNPJ;

ValidadorCNPJ.prototype.separaArrayCnpj = function (array, mInicial) {
  const copiaArray = [...array];
  const segundaParte = mInicial === 5 ? copiaArray.splice(4) : copiaArray.splice(5);
  return [copiaArray, segundaParte];
}

ValidadorCNPJ.prototype.somaTotal = function (array) {
  const multiplicadorInicial = array.length === 12 ? 5 : 6;
  const [arr1, arr2] = this.separaArrayCnpj(array, multiplicadorInicial)

  const total1 = arr1.reduce((acc, val, index) =>
    acc += val * (multiplicadorInicial - index), 0);
  const total2 = arr2.reduce((acc, val, index) =>
    acc += val * (9 - index), 0);

  return total1 + total2;
}

ValidadorCNPJ.prototype.calculaValidade = function () {
  if (this.valor === '0'.repeat(14))
    return false;

  const arrayString = Array.from(this.valor.slice(0, -2));
  const total1 = this.somaTotal(arrayString);
  const digito1 = this.calculaDigito(total1);
  arrayString.push(digito1);

  // Não calcula o segundo dígito se o primeiro for diferente
  if (this.valor.slice(0, -1) !== arrayString.join(''))
    return false;

  const total2 = this.somaTotal(arrayString);
  const digito2 = this.calculaDigito(total2);
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
      validaCpf(event.target.value);
    else if (event.target.id === 'inputCnpj')
      validaCnpj(event.target.value);
  })
}

function validaCpf(cpf) {
  const spanValidade = document.querySelector('#validadeCpf');

  ocultaParagrafos('cpf');

  const validador = new ValidadorCPF(cpf);

  mudaValidade(spanValidade, validador.calculaValidade());
}

function validaCnpj(cnpj) {
  const spanValidade = document.querySelector('#validadeCnpj');

  if (!ocultaParagrafos('cnpj'))
    return;

  const validador = new ValidadorCNPJ(cnpj);

  mudaValidade(spanValidade, validador.calculaValidade());
}

function ocultaParagrafos(documento) {
  documento = primeiraMaiuscula(documento);

  const valorDoc = document.querySelector(`#input${documento}`).value;
  const resultadoDoc = document.querySelector(`#resultado${documento}`);
  const avisoDoc = document.querySelector(`#aviso${documento}`);
  const maxLength = documento === 'Cpf' ? 14 : 18;

  if (valorDoc.length > 0)
    avisoDoc.classList.remove('hidden');
  else
    avisoDoc.classList.add('hidden');

  if (valorDoc.length < maxLength) {
    resultadoDoc.classList.add('hidden');
    return false;
  }
  else {
    avisoDoc.classList.add('hidden');
    resultadoDoc.classList.remove('hidden');
  }

  return true;
}

function mudaValidade(campo, validade) {
  if (validade) {
    campo.classList.remove('invalido')
    campo.classList.add('valido')
    campo.innerText = 'válido';
  }
  else {
    campo.classList.add('invalido')
    campo.classList.remove('valido')
    campo.innerText = 'inválido';
  }
}

function primeiraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}