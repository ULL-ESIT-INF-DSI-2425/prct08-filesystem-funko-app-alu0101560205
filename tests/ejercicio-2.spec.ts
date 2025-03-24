import { describe, expect, test, beforeEach, vi } from "vitest";
import { Cancion } from "../src/ejercicio-2/Cancion";
import { Disco } from "../src/ejercicio-2/Disco";
import { Artista } from "../src/ejercicio-2/Artista";
import { BibliotecaMusical } from "../src/ejercicio-2/BibliotecaMusical";

describe("Pruebas para la biblioteca musical", () => {
  let biblioteca: BibliotecaMusical;
  let artista: Artista;
  let disco: Disco;
  let cancion1: Cancion;
  let cancion2: Cancion;

  beforeEach(() => {
    // Crear canciones
    cancion1 = new Cancion("Bohemian Rhapsody", 354, ["Rock"], true, 1000000);
    cancion2 = new Cancion("Don't Stop Me Now", 210, ["Rock"], false, 750000);

    // Crear un disco con las canciones
    disco = new Disco("Greatest Hits", 1981, [cancion1, cancion2]);

    // Crear un artista con el disco
    artista = new Artista("Queen", 50000000, [disco]);

    // Crear una biblioteca musical vacía
    biblioteca = new BibliotecaMusical();
  });

  // 🟢 PRUEBAS PARA CANCION
  describe("🎵 Clase Cancion", () => {
    test("Debe obtener correctamente los datos de una canción", () => {
      expect(cancion1.getNombreCancion()).toBe("Bohemian Rhapsody");
      expect(cancion1.getDuracionCancion()).toBe(354);
      expect(cancion1.getGenerosCancion()).toEqual(["Rock"]);
      expect(cancion1.isSingleSong()).toBe(true);
      expect(cancion1.getNumReproducciones()).toBe(1000000);
    });

    test("Debe aumentar correctamente las reproducciones de una canción", () => {
      cancion1.aumentarReproducciones();
      expect(cancion1.getNumReproducciones()).toBe(1000001);
    });
  });

  // 🟢 PRUEBAS PARA DISCO
  describe("Clase Disco", () => {
    test("Debe obtener correctamente los datos de un disco", () => {
      expect(disco.getNombreDisco()).toBe("Greatest Hits");
      expect(disco.getAnoPublicacion()).toBe(1981);
      expect(disco.getCancionesDisco().length).toBe(2);
    });

    test("Debe calcular correctamente el número de canciones", () => {
      expect(disco.getNumeroCancionesDisco()).toBe(2);
    });

    test("Debe calcular correctamente la duración total del disco", () => {
      expect(disco.calcularDuracion()).toBe(354 + 210);
    });

    test("Debe calcular correctamente el número total de reproducciones", () => {
      expect(disco.calcularReproducciones()).toBe(1000000 + 750000);
    });
  });

  // 🟢 PRUEBAS PARA ARTISTA
  describe("Clase Artista", () => {
    test("Debe obtener correctamente los datos de un artista", () => {
      expect(artista.getNombreArtista()).toBe("Queen");
      expect(artista.getNumOyentes()).toBe(50000000);
      expect(artista.getDiscografia().length).toBe(1);
    });

    test("Debe encontrar un disco en la discografía", () => {
      expect(artista.buscarDisco("Greatest Hits")).toBe(disco);
    });

    test("Debe devolver undefined si el disco no existe", () => {
      expect(artista.buscarDisco("Nonexistent Album")).toBeUndefined();
    });
  });

  // // 🟢 PRUEBAS PARA BIBLIOTECA MUSICAL
  describe("Clase BibliotecaMusical", () => {
    test("Debe agregar un artista a la biblioteca", () => {
      biblioteca.añadirArtista(artista);
      expect(biblioteca["artistas"].length).toBe(1);
    });

    test("Debe encontrar un artista por nombre", () => {
      biblioteca.añadirArtista(artista);
      const logSpy = vi.spyOn(console, "log");
      biblioteca.buscarArtista("Queen");
      expect(logSpy).toHaveBeenCalled();
    });

    test("Debe mostrar un mensaje si el artista no existe", () => {
      const logSpy = vi.spyOn(console, "log");
      biblioteca.buscarArtista("Unknown Artist");
      expect(logSpy).toHaveBeenCalledWith('Artista "Unknown Artist" no encontrado.');
    });

    test("Debe encontrar un disco por nombre", () => {
      biblioteca.añadirArtista(artista);
      const logSpy = vi.spyOn(console, "log");
      biblioteca.buscarDisco("Greatest Hits");
      expect(logSpy).toHaveBeenCalled();
    });

    test("Debe mostrar un mensaje si el disco no existe", () => {
      biblioteca.añadirArtista(artista);
      const logSpy = vi.spyOn(console, "log");
      biblioteca.buscarDisco("Unknown Album");
      expect(logSpy).toHaveBeenCalledWith('Disco "Unknown Album" no encontrado.');
    });
  });
});
