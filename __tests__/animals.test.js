const fs = require('fs');

const {
    filterByQuery,
    finById,
    createNewAnimal,
    validateAnimal,
    findById,
} = require("../lib/animals");
const animals = require('../data/animals.json')

jest.mock('fs');

test("creates new animal object", () => {
    const animal = createNewAnimal(
        { name: 'Darlene', id: 'poopee2'}, animals
    );
    expect(animal.name).toBe('Darlene');
    expect(animal.id).toBe('poopee2');
});

test('filters animal search by query - parameter requested by user', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'Erica',
            species: 'gorilla',
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'Noel',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave'],
        },
    ];

    const updatedAnimals = filterByQuery({species: 'gorilla'}, startingAnimals);
    expect(updatedAnimals.length).toEqual(1);
});

test('finds by animal id', () => {
    const startingAnimals = [
        {
            id: '3',
            name: 'Erica',
            species: 'gorilla',
            diet: 'omnivore',
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: '4',
            name: 'Noel',
            species: 'bear',
            diet: 'carnivore',
            personalityTraits: ['impish', 'sassy', 'brave'],
        },
    ];

    const result = findById('3', startingAnimals);
    expect(result.name).toBe('Erica');
});

test('validates personality traits', () => {
    const animal = {
        id: '3',
        name: 'Erica',
        species: 'gorilla',
        diet: 'omnivore',
        personalityTraits: ['quirky', 'rash'],
    };

    const invalidAnimal = {
        id: '3',
        name: 'Erica',
        species: 'gorilla',
        diet: 'omnivore',
    };

    const result1 = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
});