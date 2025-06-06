import { IAboutRepository } from 'domain/interfaces/about/IAboutRepository';

export class DeleteAboutUseCase {
    constructor(private readonly aboutRepository: IAboutRepository) {}

    async execute(id: number): Promise<void> {
        await this.aboutRepository.delete(id);
    }
}
