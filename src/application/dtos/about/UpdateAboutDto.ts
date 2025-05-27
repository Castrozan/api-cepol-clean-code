import { UpdateAboutImageDto } from './UpdateAboutImageDto';

export class UpdateAboutDto {
    id: number;
    bodyText: string;
    secondText: string;
    images: UpdateAboutImageDto[] | null;
}
