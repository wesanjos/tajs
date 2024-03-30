import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("should throw if the name is not present", () => {
      //Mock = Entrada necessária para o teste funcionar
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };

      //Validando o teste na expectativa dele retornar o mesmo erro do .validate()
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw if the CPF is not present", () => {
      const mockInvalidPerson = {
        name: "Otávio",
        cpf: "",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw person is valid", () => {
      const mockInvalidPerson = {
        name: "Otávio",
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("should format the person name and CPF", () => {
      // AAA

      // Arrange = Prepara
      const mockPerson = {
        name: "Otávio da Silva",
        cpf: "123.456.789-12",
      };

      // Act = Executar
      const formattedPerson = Person.format(mockPerson);

      // Assert = Validar
      const expected = {
        name: "Otávio",
        cpf: "12345678912",
        lastName: "da Silva",
      };

      //Espera-se que ambos seja iguais
      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#save", () => {
    it("should validate if any information is missing", () => {
      const mockInvalidPerson = {
        name: "Otávio",
        cpf: "",
        lastName: "da Silva",
      };

      expect(() => Person.save(mockInvalidPerson)).toThrow(
        new Error(
          `cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`
        )
      );
    });

    it("should validate that it has all the information", () => {
      const mockPerson = {
        name: "Otávio",
        cpf: "12345678912",
        lastName: "da Silva",
      };

      const result = Person.save(mockPerson);

      const expected = "registrado com sucesso!";

      expect(result).toStrictEqual(expected);
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      const mockPerson = {
        name: "Otávio da Silva",
        cpf: "123.456.789-12",
      };

      jest.spyOn(Person, Person.validate.name).mockReturnValue();

      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "12345678912",
        name: "Otávio",
        lastName: "da Silva",
      });

      const result = Person.process(mockPerson);

      const expected = "ok";

      expect(result).toStrictEqual(expected);
    });
  });
});
