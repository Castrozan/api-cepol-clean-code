import { UpdateResearchImageDto } from './UpdateResearchImageDto';

export class UpdateResearchDto {
    id: number | null;
    title: string;
    description: string;
    bodyText: string;
    secondText: string;
    professionalId: number | null;
    images: UpdateResearchImageDto[] | null;
}
