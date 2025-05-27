import { About } from '../../../domain/entities/about/About';
import { AboutImage } from '../../../domain/entities/about/AboutImage';

describe('About Entity', () => {
    test('should create an About instance with all properties', () => {
        const images: AboutImage[] = [
            { id: 1, url: 'https://example.com/image1.jpg' } as AboutImage,
            { id: 2, url: 'https://example.com/image2.jpg' } as AboutImage
        ];
        const about = new About(
            1,
            'Main body text',
            'Secondary text',
            new Date('2024-01-01T00:00:00Z'),
            images
        );

        expect(about.id).toBe(1);
        expect(about.bodyText).toBe('Main body text');
        expect(about.secondText).toBe('Secondary text');
        expect(about.createdAt).toEqual(new Date('2024-01-01T00:00:00Z'));
        expect(about.images).toHaveLength(2);
        expect(about.images?.[0].url).toBe('https://example.com/image1.jpg');
    });

    test('should allow id to be null', () => {
        const about = new About(null, 'Text', 'Second', new Date(), null);
        expect(about.id).toBeNull();
    });

    test('should allow images to be null', () => {
        const about = new About(2, 'Body', 'Second', new Date(), null);
        expect(about.images).toBeNull();
    });

    test('should set createdAt as a Date instance', () => {
        const now = new Date();
        const about = new About(3, 'Body', 'Second', now, []);
        expect(about.createdAt).toBeInstanceOf(Date);
        expect(about.createdAt).toBe(now);
    });
});
