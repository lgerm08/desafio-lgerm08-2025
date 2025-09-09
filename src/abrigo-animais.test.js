import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,XADREZ",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar animal duplicado na lista de entrada", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "BOLA,LASER",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedo duplicado na lista da pessoa", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,RATO,BOLA",
      "BOLA,LASER",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal (caso válido)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Gato não divide brinquedos — deve ir para abrigo se outro animal gosta dos mesmos brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER",
      "CAIXA,NOVELO",
      "Zero,Rex"
    );
    const zero = resultado.lista.find((l) => l.includes("Zero"));
    const rex = resultado.lista.find((l) => l.includes("Rex"));
    expect(zero).toBe("Zero - pessoa 1");
    expect(rex).toBe("Rex - abrigo");
  });

  test("Se ambas as pessoas têm os brinquedos corretos, ninguém fica com o animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
  });

  test("Uma pessoa não pode adotar mais que 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,NOVELO,CAIXA,SKATE",
      "RATO,BOLA",
      "Rex,Mimi,Fofo,Zero,Bola,Bebe"
    );
    const adotadosPessoa1 = resultado.lista.filter((l) =>
      l.includes("pessoa 1")
    );
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
  });

  test("Loco deve ser adotado sem se importar com ordem se houver companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE,BOLA",
      "BOLA,LASER",
      "Loco,Rex"
    );
    const rex = resultado.lista.find((l) => l.includes("Rex"));
    const loco = resultado.lista.find((l) => l.includes("Loco"));
    expect(rex).toContain("pessoa 1");
    expect(loco).toContain("pessoa 1");
  });

  test("Loco deve respeitar a ordem se não houver companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO", 
      "BOLA,LASER",
      "Loco"
    );
    const loco = resultado.lista.find((l) => l.includes("Loco"));
    expect(loco).toBe("Loco - abrigo");
  }); 
});
