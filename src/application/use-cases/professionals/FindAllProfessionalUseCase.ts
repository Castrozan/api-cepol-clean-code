import { Professional } from 'domain/entities/professionals/Professional';
import { IProfessionalRepository } from 'domain/interfaces/professionals/IProfessionalRepository';

export class FindAllProfessionalUseCase {
    constructor(private readonly ProfessionalRepository: IProfessionalRepository) {}

    async execute(): Promise<Professional[]> {
        return this.ProfessionalRepository.findAll();
    }
}
