import { IArticleRepository } from 'domain/interfaces/articles/IArticleRepository';

export class DeleteArticleUseCase {
    constructor(private readonly articleRepository: IArticleRepository) {}

    async execute(id: number): Promise<void> {
        await this.articleRepository.delete(id);
    }
}
