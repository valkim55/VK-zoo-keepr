const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require ('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers.json');


jest.mock('fs');

test('creates a new zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {name: 'Darlene', id: 'poopee2'}, zookeepers
    );

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('poopee2');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
        },
        {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
        },
    ];

    const updatedZookeepers = filterByQuery({age: 31}, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('find by id', () => {
    const startingZookeepers = [
        {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
        },
        {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
        },
    ];

    const result = findById('2', startingZookeepers);
    expect(result.name).toBe('Isabella');
});

test('validates age', () => {
    const zookeeper = {
        id: '1',
        name: 'Raksha',
        age: 31,
        favoriteAnimal: 'penguin'
    };

    const invalidZookeeper = {
        id: '2',
        name: 'Isabella',
        age: '67',
        favoriteAnimal: 'bear'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})