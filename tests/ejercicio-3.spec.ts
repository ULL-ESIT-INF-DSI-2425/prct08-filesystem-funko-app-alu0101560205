import { describe, expect, test } from "vitest";
import { Alumno } from "../src/ejercicio-3/Alumno"
import { Profesor } from "../src/ejercicio-3/Profesor"
import { Asignatura } from "../src/ejercicio-3/Asignatura"

describe("Clase asignatura", () => {
  test("Debe crear una asignatura correctamente", () => {
    const asignatura = new Asignatura("Matematicas", "MAT101");
    expect(asignatura).toBeInstanceOf(Asignatura);
    expect(asignatura.nombreAsignatura).toBe("Matematicas");
    expect(asignatura.codigoAsignatura).toBe("MAT101");
  });

  test("Debe mostrar la informacion de la asignatura correctamente", () => {
    const asignatura = new Asignatura("Matematicas", "MAT101");
    const info = asignatura.mostrarInformacion();
    expect(info).toBe("Matematicas (MAT101)");
  })
});

describe("Clase profesor", () => {
  test("Debe crear un profesor correctamente", () => {
    const profesor = new Profesor("Carlos", 40, "Matematicas");
    expect(profesor).toBeInstanceOf(Profesor);
    expect(profesor.getNombrePersona()).toBe("Carlos");
    expect(profesor.getEdadPersona()).toBe(40);
    expect(profesor.getAsignaturaImpartida()).toBe("Matematicas");
  });

  test("Debe mostrar la información del profesor correctamente", () => {
    const profesor = new Profesor("Carlos", 40, "Matematicas");
    const info = profesor.mostrarInformacion();
    expect(info).toBe("Profesor: Carlos, Edad: 40, Asignatura: Matematicas");
  });
});

describe("Clase Alumno", () => {
  test("Debe crear un alumno correctamente", () => {
    const alumno = new Alumno("Juan", 20);
    expect(alumno).toBeInstanceOf(Alumno);
    expect(alumno.getNombrePersona()).toBe("Juan");
    expect(alumno.getEdadPersona()).toBe(20);
  });

  test("Debe agregar asignaturas y notas correctamente", () => {
    const alumno = new Alumno("Juan", 20);
    const matematicas = new Asignatura("Matemáticas", "MAT101");
    const historia = new Asignatura("Historia", "HIS202");

    alumno.agregarAsignatura(matematicas, 8);
    alumno.agregarAsignatura(historia, 7);

    const info = alumno.mostrarInformacion();
    expect(info).toContain("Asignatura: Matemáticas (MAT101), Nota: 8");
    expect(info).toContain("Asignatura: Historia (HIS202), Nota: 7");
  });

  test("Debe mostrar la información completa del alumno", () => {
    const alumno = new Alumno("Juan", 20);
    const matematicas = new Asignatura("Matemáticas", "MAT101");
    alumno.agregarAsignatura(matematicas, 8);

    const info = alumno.mostrarInformacion();
    expect(info).toContain("Alumno: Juan, Edad: 20");
    expect(info).toContain("Asignatura: Matemáticas (MAT101), Nota: 8");
  });
});