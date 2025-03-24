import { describe, expect, test } from "vitest";
import { Pokedex } from "../src/ejercicio-1/Pokedex";
import { Pokemon } from "../src/ejercicio-1/Pokemon";

describe("Pokedex Class", () => {
  test("Debería mostrar la información de un Pokémon existente", () => {
    const pokedex = new Pokedex();
    const charmander = new Pokemon("Charmander", 8.5, 0.6, "fuego", 52, 43, 65, 39);
    
    pokedex.agregarPokemon(charmander);
    const info = pokedex.mostrarInformacion("Charmander");

    expect(info).toContain("Charmander");
    expect(info).toContain("Tipo: fuego");
    expect(info).toContain("Peso: 8.5 kg");
  });

  test("Debería devolver un mensaje si el Pokémon no está en la Pokédex", () => {
    const pokedex = new Pokedex();
    const info = pokedex.mostrarInformacion("Pikachu");

    expect(info).toBe('Pokémon "Pikachu" no encontrado en la Pokédex.');
  });
});
