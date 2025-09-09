import { Animais } from "./animais";

class AnimaisCadastrados {
    animaisCadastrados() {
        return [
            new Animais('Rex', 'cão', ['RATO', 'BOLA']),
            new Animais('Mimi', 'gato', ['BOLA', 'LASER']),
            new Animais('Fofo', 'gato', ['BOLA', 'RATO', 'LASER']),
            new Animais('Zero', 'gato', ['RATO', 'BOLA']),
            new Animais('Bola', 'cão', ['CAIXA', 'NOVELO']),
            new Animais('Bebe', 'cão', ['LASER', 'RATO', 'BOLA']),
            new Animais('Loco', 'jabuti', ['SKATE', 'RATO'])
        ]
    }

    animalInexistenteOuDuplicado(animaisDesejados) {
        for (var i = 0; i < animaisDesejados.length; i++) {
            var animaisExistem = this.animaisCadastrados().filter(animal => animal.nome === animaisDesejados[i]).length > 0;
            var animalDuplicado = animaisDesejados.reduce((a, b) => {
                if (!a.includes(b)) a.push(b);
                return a;
            }, []).length !== animaisDesejados.length;
            if (!animaisExistem || animalDuplicado) {
                return true;
            }
        }
        return false;
    }

    brinquedosInvalidosOuDuplicados(brinquedosPessoaUm, brinquedosPessoaDois) {
        var brinquedos = this.animaisCadastrados().reduce((a, b) => {
            b.brinquedos.forEach(brinquedo => {
                if (!a.includes(brinquedo)) a.push(brinquedo);
            });
            return a;
        }, []);
        var brinquedosPossaUmReduzidos = brinquedosPessoaUm.reduce((a, b) => {
            if (!a.includes(b)) a.push(b);
            return a;
        }, []);
        var brinquedosPossaDoisReduzidos = brinquedosPessoaDois.reduce((a, b) => {
            if (!a.includes(b)) a.push(b);
            return a;
        }, []);
        return  brinquedosPessoaUm.some(brinquedo => !brinquedos.includes(brinquedo)) ||
                brinquedosPessoaDois.some(brinquedo => !brinquedos.includes(brinquedo)) ||
                brinquedosPossaUmReduzidos.length !== brinquedosPessoaUm.length ||
                brinquedosPossaDoisReduzidos.length !== brinquedosPessoaDois.length;
    }

    brinquedosDoAnimal(nomeAnimal) {
        var animal = this.animaisCadastrados().find(animal => animal.nome === nomeAnimal);
        return animal ? animal.brinquedos : [];
    }
}

export { AnimaisCadastrados as AnimaisCadastrados };