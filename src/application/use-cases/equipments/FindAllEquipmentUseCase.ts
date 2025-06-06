import { Equipment } from 'domain/entities/equipments/Equipment';
import { IEquipmentRepository } from 'domain/interfaces/equipments/IEquipmentRepository';

export class FindAllEquipmentsUseCase {
    constructor(private readonly equipmentRepository: IEquipmentRepository) {}

    async execute(): Promise<Equipment[]> {
        return this.equipmentRepository.findAll();
    }
}
