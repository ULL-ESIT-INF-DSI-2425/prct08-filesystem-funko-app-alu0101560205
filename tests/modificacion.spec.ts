import { describe, expect, test } from "vitest";
import { Coche } from "../src/modificacion/Coche"
import { Moto } from "../src/modificacion/Moto"
import { Parking } from "../src/modificacion/Parking"

describe("Clase coche", () => {
  test("Debe crear el coche correctamente", () => {
    const coche = new Coche("1234", "Mitsubishi", "Montero Sport", 150, 200, 5);
    expect(coche).toBeInstanceOf(Coche);
    expect(coche.getMatricula()).toBe("1234");
    expect(coche.getMarca()).toBe("Mitsubishi");
    expect(coche.getModelo()).toBe("Montero Sport");
    expect(coche.getCilindrada()).toBe(150);
    expect(coche.getPotencia()).toBe(200);
    expect(coche.getNumPasajeros()).toBe(5);
  });

  test("Debe mostrar informacion del coche", () => {
    const coche = new Coche("1234", "Mitsubishi", "Montero Sport", 150, 200, 5);
    const info = coche.getData();
    expect(info).toBe("Datos del coche con matricula 1234: Marca Mitsubishi, Modelo Montero Sport, Cilindrada 150, Potencia 200, Numero maximo de pasajeros (5)");
  });
});

describe("Clase moto", () => {
  test("Debe crear la moto correctamente", () => {
    const moto = new Moto("4567", "Yamaha", "Model1", 300, 500, 2, 2, false);
    expect(moto).toBeInstanceOf(Moto);
    expect(moto.getMatricula()).toBe("4567");
    expect(moto.getMarca()).toBe("Yamaha");
    expect(moto.getModelo()).toBe("Model1");
    expect(moto.getCilindrada()).toBe(300);
    expect(moto.getPotencia()).toBe(500);
    expect(moto.getNumRuedasMoto()).toBe(2);
    expect(moto.getNumPasajerosMoto()).toBe(2);
    expect(moto.poseeAsiento()).toBe(false);
  });

  test("Debe mostrar informacion de la moto correctamente", () => {
    const moto = new Moto("4567", "Yamaha", "Model1", 300, 500, 2, 2, false);
    const info = moto.getData();
    expect(info).toBe("Informacion de la moto con matricula 4567: Marca Yamaha, Modelo Model1, Numero de cilindros 300, Potencia 500, Numero de ruedas 2, Numero max de pasajeros 2, Posee asiento extra? false");
  });
});

describe("Clase parking", () => {
  test("Debe crear el objeto parking", () => {
    
  });
});