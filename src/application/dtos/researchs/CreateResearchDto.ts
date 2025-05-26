import { CreateResearchImageDto } from './CreateResearchImageDto';

export class CreateResearchDto {
    title: string;
    description: string;
    bodyText: string;
    secondText: string;
    professionalId: number | null;
    images: CreateResearchImageDto[] | null;
}
