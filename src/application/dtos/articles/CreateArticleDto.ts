import { CreateArticleImageDto } from './CreateArticleImageDto';

export class CreateArticleDto {
    title: string;
    description: string;
    bodyText: string;
    secondText: string;
    professionalId: number | null;
    author: string | null;
    published: string | null;
    images: CreateArticleImageDto[] | null;
}
