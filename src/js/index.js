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
  const valorCpf = document.querySelector('#inputCpf').value;
  const spanValidade = document.querySelector('#validadeCpf');

  ocultaParagrafos('cpf');

  const validador = new ValidadorCPF(valorCpf);

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
    return;
  }
  else {
    avisoDoc.classList.add('hidden');
    resultadoDoc.classList.remove('hidden');
  }
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