import { Professional } from '../../../domain/entities/professionals/Professional';

describe('Professional Entity', () => {
    test('should create a Professional instance with all properties', () => {
        const now = new Date();
        const professional = new Professional(
            1,
            'John Doe',
            'Developer',
            'Experienced developer',
            'http://example.com/image.jpg',
            now,
            2
        );

        expect(professional.id).toBe(1);
        expect(professional.name).toBe('John Doe');
        expect(professional.role).toBe('Developer');
        expect(professional.bio).toBe('Experienced developer');
        expect(professional.imageUrl).toBe('http://example.com/image.jpg');
        expect(professional.createdAt).toBe(now);
        expect(professional.hierarchy).toBe(2);
    });

    test('should allow null values for id, bio, and imageUrl', () => {
        const now = new Date();
        const professional = new Professional(null, 'Jane Smith', 'Designer', null, null, now, 1);

        expect(professional.id).toBeNull();
        expect(professional.bio).toBeNull();
        expect(professional.imageUrl).toBeNull();
        expect(professional.name).toBe('Jane Smith');
        expect(professional.role).toBe('Designer');
        expect(professional.createdAt).toBe(now);
        expect(professional.hierarchy).toBe(1);
    });

    test('should set hierarchy as a number', () => {
        const now = new Date();
        const professional = new Professional(
            2,
            'Alice Johnson',
            'Manager',
            'Team manager',
            'http://example.com/alice.jpg',
            now,
            5
        );

        expect(typeof professional.hierarchy).toBe('number');
        expect(professional.hierarchy).toBe(5);
    });
});
