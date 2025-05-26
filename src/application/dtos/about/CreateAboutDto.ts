import { CreateAboutImageDto } from './CreateAboutImageDto';

export class CreateAboutDto {
    bodyText: string;
    secondText: string;
    createdAt: Date;
    images: CreateAboutImageDto[] | null;
}
