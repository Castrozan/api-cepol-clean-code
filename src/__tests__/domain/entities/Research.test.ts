import { Professional } from '../../../domain/entities/professionals/Professional';
import { Research } from '../../../domain/entities/researchs/Research';
import { ResearchImage } from '../../../domain/entities/researchs/ResearchImage';

describe('Research Entity', () => {
    const mockProfessional: Professional = {
        id: 1,
        name: 'Dr. John Doe'
        // add other required properties or use a mock as needed
    } as Professional;

    const mockImages: ResearchImage[] = [
        { id: 1, url: 'https://example.com/image1.jpg', researchId: 1 } as ResearchImage,
        { id: 2, url: 'https://example.com/image2.jpg', researchId: 1 } as ResearchImage
    ];

    it('should create a Research instance with all properties', () => {
        const now = new Date();
        const research = new Research(
            1,
            'Research Title',
            'Research Description',
            'Main body text',
            'Secondary text',
            now,
            now,
            2,
            mockImages,
            mockProfessional
        );

        expect(research.id).toBe(1);
        expect(research.title).toBe('Research Title');
        expect(research.description).toBe('Research Description');
        expect(research.bodyText).toBe('Main body text');
        expect(research.secondText).toBe('Secondary text');
        expect(research.createdAt).toBe(now);
        expect(research.updatedAt).toBe(now);
        expect(research.professionalId).toBe(2);
        expect(research.image).toEqual(mockImages);
        expect(research.professional).toBe(mockProfessional);
    });

    it('should allow null values for optional properties', () => {
        const now = new Date();
        const research = new Research(
            null,
            'Title',
            'Desc',
            'Body',
            'Second',
            now,
            now,
            null,
            null,
            null
        );

        expect(research.id).toBeNull();
        expect(research.professionalId).toBeNull();
        expect(research.image).toBeNull();
        expect(research.professional).toBeNull();
    });

    it('should update properties after creation', () => {
        const now = new Date();
        const research = new Research(
            5,
            'Initial Title',
            'Initial Desc',
            'Initial Body',
            'Initial Second',
            now,
            now,
            10,
            null,
            null
        );

        research.title = 'Updated Title';
        research.description = 'Updated Desc';
        research.image = mockImages;

        expect(research.title).toBe('Updated Title');
        expect(research.description).toBe('Updated Desc');
        expect(research.image).toEqual(mockImages);
    });
});
