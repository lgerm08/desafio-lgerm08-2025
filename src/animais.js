class Animais {
    constructor(
        nome,
        tipo,
        brinquedos = []
    ) {
        this.nome = nome;
        this.tipo = tipo;
        this.brinquedos = brinquedos;
    }
}

export { Animais as Animais };