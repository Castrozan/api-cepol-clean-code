import { Article } from '../../../domain/entities/articles/Article';
import { ArticleImage } from '../../../domain/entities/articles/ArticleImage';
import { Professional } from '../../../domain/entities/professionals/Professional';

describe('Article Entity', () => {
    const mockProfessional = new Professional(
        1,
        'John Doe',
        'Specialist',
        'Bio',
        'image.jpg',
        new Date('2023-01-01'),
        1
    );

    const mockImages = [
        new ArticleImage(1, 1, 'image1.jpg', 'title1', 'desc1'),
        new ArticleImage(2, 2, 'image2.jpg', 'title1', 'desc2')
    ];

    it('should create an Article instance with all properties', () => {
        const now = new Date();
        const article = new Article(
            10,
            'Test Title',
            'Test Description',
            'Body Text',
            'Second Text',
            now,
            now,
            5,
            'Author Name',
            '2024-06-01',
            mockImages,
            mockProfessional
        );

        expect(article.id).toBe(10);
        expect(article.title).toBe('Test Title');
        expect(article.description).toBe('Test Description');
        expect(article.bodyText).toBe('Body Text');
        expect(article.secondText).toBe('Second Text');
        expect(article.createdAt).toBe(now);
        expect(article.updatedAt).toBe(now);
        expect(article.professionalId).toBe(5);
        expect(article.author).toBe('Author Name');
        expect(article.published).toBe('2024-06-01');
        expect(article.images).toEqual(mockImages);
        expect(article.professional).toBe(mockProfessional);
    });

    it('should allow nullable fields to be null', () => {
        const now = new Date();
        const article = new Article(
            null,
            'Title',
            'Desc',
            'Body',
            'Second',
            now,
            now,
            null,
            null,
            null,
            null,
            null
        );

        expect(article.id).toBeNull();
        expect(article.professionalId).toBeNull();
        expect(article.author).toBeNull();
        expect(article.published).toBeNull();
        expect(article.images).toBeNull();
        expect(article.professional).toBeNull();
    });
});
