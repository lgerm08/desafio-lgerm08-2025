import { AnimaisCadastrados } from "./animaisCadastrados";
class AbrigoAnimais {

  constructor() {
    this.animaisCadastrados = new AnimaisCadastrados();
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    //Dividindo os parâmetros em arrays
    var brinquedosPessoaUm = brinquedosPessoa1.split(',');
    var brinquedosPessoaDois = brinquedosPessoa2.split(',');
    var ordemAnimaisArray = ordemAnimais.split(',');

    //Validar se os animais existem e se não estão duplicados
    if (this.animaisCadastrados.animalInexistenteOuDuplicado(ordemAnimaisArray)) {
      return { erro: "Animal inválido" }
    }

    //Validar brinquedos não duplicados
    if (this.animaisCadastrados.brinquedosInvalidosOuDuplicados(brinquedosPessoaUm, brinquedosPessoaDois)) {
      return { erro: "Brinquedo inválido" }
    }

    //Pré-seleção 
    var animaisProvisoriosPessoa1 = [];
    var animaisProvisoriosPessoa2 = [];

    ordemAnimaisArray.forEach(nomeAnimal => {
      var animalData = this.animaisCadastrados.animaisCadastrados().find(animal => animal.nome === nomeAnimal);

      var brinquedosAnimal = animalData.brinquedos;
      var matchBrinquedosPessoa1 = this.brinquedosAtendem(brinquedosPessoaUm, brinquedosAnimal, nomeAnimal == 'Loco');
      var matchBrinquedosPessoa2 = this.brinquedosAtendem(brinquedosPessoaDois, brinquedosAnimal, nomeAnimal == 'Loco');

      //Validar regra do Gato e Limite de Animais
      var validoParaPessoa1 = animaisProvisoriosPessoa1.length < 3 && matchBrinquedosPessoa1 && this.podeIncluirAnimal(animaisProvisoriosPessoa1, animalData);
      var validoParaPessoa2 = animaisProvisoriosPessoa2.length < 3 && matchBrinquedosPessoa2 && this.podeIncluirAnimal(animaisProvisoriosPessoa2, animalData);

      //Validar Inclusão do animal na lista provisória
      if (validoParaPessoa1 && !validoParaPessoa2) animaisProvisoriosPessoa1.push(animalData);
      if (!validoParaPessoa1 && validoParaPessoa2) animaisProvisoriosPessoa2.push(animalData);
    });

    var animaisDefinitivosPessoa1 = [...animaisProvisoriosPessoa1];
    var animaisDefinitivosPessoa2 = [...animaisProvisoriosPessoa2];

    //Validar regra do Loco
    if (this.locoDeveSerRemovido(animaisProvisoriosPessoa1, brinquedosPessoaUm)) {
      animaisDefinitivosPessoa1 = animaisProvisoriosPessoa1.filter(animal => animal.nome !== 'Loco');
    }
    if (this.locoDeveSerRemovido(animaisProvisoriosPessoa2, brinquedosPessoaDois)) {
      animaisDefinitivosPessoa1 = animaisProvisoriosPessoa2.filter(animal => animal.nome !== 'Loco');
    }

    return {
      lista: this.organizarSaida(animaisDefinitivosPessoa1, animaisDefinitivosPessoa2, ordemAnimaisArray)
    }
  }

  brinquedosAtendem(brinquedosPessoa, brinquedosAnimal, aplicarRegraLoco) {
    var brinquedosReduzidos = brinquedosPessoa.filter(brinquedo => brinquedosAnimal.includes(brinquedo)).reduce((a, b) => {
      if (!a.includes(b)) a.push(b);
      return a;
    }, []);
    return aplicarRegraLoco ?
      brinquedosAnimal.every(brinquedo => brinquedosPessoa.includes(brinquedo)) :
      this.arraysIguais(brinquedosReduzidos, brinquedosAnimal);
  }

  brinquedosEmComum(brinquedosAnimalUm, brinquedosAnimalDois) {
    return brinquedosAnimalUm.filter(brinquedo => brinquedosAnimalDois.includes(brinquedo)).length > 0;
  }

  podeIncluirAnimal(animaisPessoa, animal) {
    return !animaisPessoa.some(animalPessoa => ((animalPessoa.tipo === 'gato' || animal.tipo === 'gato') && this.brinquedosEmComum(animalPessoa.brinquedos, animal.brinquedos)) ); 
  }

  locoDeveSerRemovido(animaisPessoa, brinquedosPessoa) {
    if (!animaisPessoa.find(animal => animal.nome === 'Loco') || animaisPessoa.length > 1) return false;
    return this.brinquedosAtendem(brinquedosPessoa, this.animaisCadastrados.brinquedosDoAnimal('Loco'), false);
  }

  organizarSaida(animaisPessoa01, animaisPessoa2, animaisConsiderados) {
    let resultado = animaisPessoa01.map(animal => `${animal.nome} - pessoa 1`);

    resultado = resultado.concat(animaisPessoa2.map(animal => `${animal.nome} - pessoa 2`));

    resultado = resultado.concat(
      animaisConsiderados
        .filter(animal => !animaisPessoa01.map(animalData => animalData.nome).includes(animal) && !animaisPessoa2.map(animalData => animalData.nome).includes(animal))
        .map(animal => `${animal} - abrigo`)
    );

    return resultado.sort();
  }

  arraysIguais(a, b) {
    if (a.length !== b.length) return false;
    return a.every((valor, i) => valor === b[i]);
  }

}


export { AbrigoAnimais as AbrigoAnimais };
