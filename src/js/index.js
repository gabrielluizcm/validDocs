import { Cpf, Cnpj } from './docsLib.js';
import { mascaraCpf, mascaraCnpj } from './mask.js';

window.onload = inicializaCampos;

function inicializaCampos() {
  mascaraCpf();
  mascaraCnpj();
  geraNovosDocs();
  document.addEventListener('input', event => {
    if (event.target.id === 'inputCpf')
      validaCpf(event.target.value);
    else if (event.target.id === 'inputCnpj')
      validaCnpj(event.target.value);
  })
  document.addEventListener('click', event => {
    if (event.target.id === 'geraNovos')
      geraNovosDocs();
    else if (event.target.id === 'cpfGerado' || event.target.id === 'cnpjGerado')
      copiaValorDoCampo(event.target)
    else if (event.target.id === 'trocaModos')
      trocaModos();
  })
}

function validaCpf(cpf) {
  const spanValidade = document.querySelector('#validadeCpf');

  if (!ocultaParagrafos('cpf'))
    return;

  mudaValidade(spanValidade, Cpf.valida(cpf));
}

function validaCnpj(cnpj) {
  const spanValidade = document.querySelector('#validadeCnpj');

  if (!ocultaParagrafos('cnpj'))
    return;

  mudaValidade(spanValidade, Cnpj.valida(cnpj));
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

function geraNovosDocs() {
  const campoCpf = document.querySelector('#cpfGerado');
  const campoCnpj = document.querySelector('#cnpjGerado');

  campoCpf.value = Cpf.gera();
  campoCpf.dispatchEvent(new Event('input'));
  campoCnpj.value = Cnpj.gera();
  campoCnpj.dispatchEvent(new Event('input'));
}

async function copiaValorDoCampo(campo) {
  campo.select();
  campo.setSelectionRange(0, 18); // Para celulares

  await window.navigator.clipboard.writeText(campo.value);

  alert('Campo copiado!')
}

function trocaModos() {
  const secValidadores = document.querySelector('#secValidadores');
  const secGeradores = document.querySelector('#secGeradores');
  const h1 = document.querySelector('h1');
  const p = h1.nextElementSibling;
  const spanTroca = document.querySelector('#trocaModos');

  if (secGeradores.classList.contains('hidden')) {
    secGeradores.classList.remove('hidden');
    secValidadores.classList.add('hidden');
    h1.innerText = 'Gerador CPF e CNPJ';
    p.innerText = 'Clique nos campos para copiar ou no botão para gerar novos valores';
    spanTroca.innterText = 'Precisa validar documentos?';
    document.title = 'Gerador CPF e CNPJ';
  }
  else {
    secGeradores.classList.add('hidden');
    secValidadores.classList.remove('hidden');
    h1.innerText = 'Validador CPF e CNPJ';
    p.innerText = 'Digite os códigos nos campos abaixo para verificar sua validade';
    spanTroca.innterText = 'Precisa gerar documentos?';
    document.title = 'Validador CPF e CNPJ';
  }

}