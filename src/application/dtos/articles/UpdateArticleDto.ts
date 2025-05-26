import { UpdateArticleImageDto } from './UpdateArticleImageDto';

export class UpdateArticleDto {
    id: number;
    title: string;
    description: string;
    bodyText: string;
    secondText: string;
    professionalId: number | null;
    author: string | null;
    published: string | null;
    images: UpdateArticleImageDto[] | null;
}