function geraAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Validador {
  static calculaDigito(array, doc) {
    const separaArray = (array, mInicial) => {
      const copiaArray = [...array];
      const segundaParte = mInicial === 5 ? copiaArray.splice(4) : copiaArray.splice(5);
      return [copiaArray, segundaParte];
    }

    const somaTotal = (array, doc) => {
      if (doc === 'cpf') {
        const multiplicadorInicial = array.length === 9 ? 10 : 11;
        return array.reduce((acc, val, index) =>
          acc += val * (multiplicadorInicial - index), 0);
      }
      else {
        const multiplicadorInicial = array.length === 12 ? 5 : 6;
        const [arr1, arr2] = separaArray(array, multiplicadorInicial);

        const total1 = arr1.reduce((acc, val, index) =>
          acc += val * (multiplicadorInicial - index), 0);
        const total2 = arr2.reduce((acc, val, index) =>
          acc += val * (9 - index), 0);

        return total1 + total2;
      }
    }

    const total = somaTotal(array, doc);
    const resto = total % 11;
    return resto < 2 ? 0 : 11 - resto;
  }
}

export class Cpf extends Validador {

  static valida(string) {
    const cpfLimpo = string.replace(/\D+/g, '');
    const invalidos = this.invalidos();

    if (invalidos.includes(cpfLimpo) || cpfLimpo.length !== 11)
      return false;

    const array = Array.from(cpfLimpo.slice(0, -2));
    const digito1 = this.calculaDigito(array, 'cpf');
    array.push(digito1);

    if (cpfLimpo.slice(0, -1) !== array.join(''))
      return false;

    const digito2 = this.calculaDigito(array, 'cpf');
    array.push(digito2);

    return cpfLimpo === array.join('');
  }

  static invalidos() {
    return [
      '0'.repeat(11),
      '1'.repeat(11),
      '2'.repeat(11),
      '3'.repeat(11),
      '4'.repeat(11),
      '5'.repeat(11),
      '6'.repeat(11),
      '7'.repeat(11),
      '8'.repeat(11),
      '9'.repeat(11)
    ]
  }

  static gera() {
    const array = [...Array(9)].map(() => geraAleatorio(0, 9));

    const digito1 = this.calculaDigito(array, 'cpf');
    array.push(digito1);
    const digito2 = this.calculaDigito(array, 'cpf');
    array.push(digito2);

    return array.join('');
  }
}

export class Cnpj extends Validador {
  static valida(string) {
    const cnpjLimpo = string.replace(/\D+/g, '');

    if (cnpjLimpo === '0'.repeat(14) || cnpjLimpo.length !== 14)
      return false;

    const array = Array.from(cnpjLimpo.slice(0, -2));
    const digito1 = this.calculaDigito(array, 'cnpj');
    array.push(digito1);

    if (cnpjLimpo.slice(0, -1) !== array.join(''))
      return false;

    const digito2 = this.calculaDigito(array, 'cnpj');
    array.push(digito2);

    return cnpjLimpo === array.join('');
  }

  static gera() {
    const array = [...Array(12)].map((val, index) => {
      if (index < 8)
        return geraAleatorio(0, 9);
      else if (index < 11)
        return 0;
      else
        return 1;
    });

    const digito1 = this.calculaDigito(array, 'cnpj');
    array.push(digito1);
    const digito2 = this.calculaDigito(array, 'cnpj');
    array.push(digito2);

    return array.join('');
  }
}