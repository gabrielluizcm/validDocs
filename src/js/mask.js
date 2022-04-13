
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