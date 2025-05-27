import { Article } from 'domain/entities/articles/Article';
import { IArticleRepository } from 'domain/interfaces/articles/IArticleRepository';

export class FindByIdArticleUseCase {
    constructor(private readonly articleRepository: IArticleRepository) {}

    async execute(id: number): Promise<Article | null> {
        return this.articleRepository.findById(id);
    }
}
