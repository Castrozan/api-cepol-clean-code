import { Equipment } from '../../../domain/entities/equipments/Equipment';

describe('Equipment Entity', () => {
    const validDate = new Date('2024-06-01');

    it('should create an Equipment instance with all properties', () => {
        const equipment = new Equipment(
            1,
            'Treadmill',
            'High-end treadmill',
            'https://example.com/image.jpg',
            validDate,
            'Cardio'
        );

        expect(equipment.id).toBe(1);
        expect(equipment.name).toBe('Treadmill');
        expect(equipment.description).toBe('High-end treadmill');
        expect(equipment.imageUrl).toBe('https://example.com/image.jpg');
        expect(equipment.createdAt).toBe(validDate);
        expect(equipment.type).toBe('Cardio');
    });

    it('should allow nullable fields to be null', () => {
        const equipment = new Equipment(null, 'Bike', null, null, validDate, null);

        expect(equipment.id).toBeNull();
        expect(equipment.description).toBeNull();
        expect(equipment.imageUrl).toBeNull();
        expect(equipment.type).toBeNull();
    });

    it('should throw error if name is empty', () => {
        let error: Error | null = null;
        try {
            const equipment = new Equipment(1, '', null, null, validDate, null);

            expect(equipment).toBeUndefined();
        } catch (e) {
            error = e as Error;
        }
        expect(error).not.toBeNull();
        expect(error?.message).toBe('O nome é obrigatório.');
    });

    it('should throw error if imageUrl does not start with https://', () => {
        let error: Error | null = null;
        try {
            const equipment = new Equipment(1, 'Bike', null, 'http://example.com/image.jpg', validDate, null);
            expect(equipment).toBeUndefined();
        } catch (e) {
            error = e as Error;
        }
        expect(error).not.toBeNull();
        expect(error?.message).toBe('A URL da imagem deve ser válida e começar com https://.');
    });

    it('should update description', () => {
        const equipment = new Equipment(1, 'Bike', 'Old desc', 'https://img.jpg', validDate, null);
        equipment.updateDescription('New desc');
        expect(equipment.description).toBe('New desc');
        equipment.updateDescription(null);
        expect(equipment.description).toBeNull();
    });

    it('should update imageUrl if valid', () => {
        const equipment = new Equipment(1, 'Bike', null, 'https://img.jpg', validDate, null);
        equipment.updateImageUrl('https://newimg.jpg');
        expect(equipment.imageUrl).toBe('https://newimg.jpg');
        equipment.updateImageUrl(null);
        expect(equipment.imageUrl).toBeNull();
    });

    it('should throw error when updating imageUrl to invalid value', () => {
        const equipment = new Equipment(1, 'Bike', null, 'https://img.jpg', validDate, null);
        expect(() => {
            equipment.updateImageUrl('http://img.jpg');
        }).toThrow('A nova URL da imagem deve ser válida e começar com https://.');
    });
});
