import { IResearchRepository } from 'domain/interfaces/researchs/IResearchRepository';

export class DeleteResearchUseCase {
    constructor(private readonly researchRepository: IResearchRepository) {}

    async execute(id: number): Promise<void> {
        await this.researchRepository.delete(id);
    }
}
