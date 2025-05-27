import { About } from '../../../domain/entities/about/About';
import { AboutImage } from '../../../domain/entities/about/AboutImage';

describe('About Entity', () => {
    test('should create an About instance using static create', () => {
        const createdAt = new Date('2024-01-01T00:00:00Z');
        const about = About.create('Main body text', 'Secondary text', createdAt);

        expect(about.id).toBeNull();
        expect(about.bodyText).toBe('Main body text');
        expect(about.secondText).toBe('Secondary text');
        expect(about.createdAt).toEqual(createdAt);
        expect(about.images).toEqual([]);
    });

    test('should set id using withId', () => {
        const about = About.create('Text', 'Second', new Date()).withId(1);
        expect(about.id).toBe(1);
    });

    test('should set images using withImages', () => {
        const images: AboutImage[] = [
            { id: 1, url: 'https://example.com/image1.jpg' } as AboutImage,
            { id: 2, url: 'https://example.com/image2.jpg' } as AboutImage
        ];
        const about = About.create('Body', 'Second', new Date()).withImages(images);
        expect(about.images).toHaveLength(2);
        expect(about.images?.[0].url).toBe('https://example.com/image1.jpg');
    });

    test('should update texts using updateTexts', () => {
        const about = About.create('Old body', 'Old second', new Date());
        about.updateTexts('New body', 'New second');
        expect(about.bodyText).toBe('New body');
        expect(about.secondText).toBe('New second');
    });

    test('should update only bodyText if secondText is not provided', () => {
        const about = About.create('Old body', 'Old second', new Date());
        about.updateTexts('New body');
        expect(about.bodyText).toBe('New body');
        expect(about.secondText).toBe('Old second');
    });

    test('should update only secondText if bodyText is not provided', () => {
        const about = About.create('Old body', 'Old second', new Date());
        about.updateTexts(undefined, 'New second');
        expect(about.bodyText).toBe('Old body');
        expect(about.secondText).toBe('New second');
    });
});
