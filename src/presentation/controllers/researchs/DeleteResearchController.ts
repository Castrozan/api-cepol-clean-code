import { DeleteResearchUseCase } from 'application/use-cases/researchs/DeleteResearchUseCase';
import { Bool, OpenAPIRoute } from 'chanfana';
import { SQLiteResearchRepository } from 'infrastructure/database/repositories/researchs/SQLiteResearchRepository';
import { z } from 'zod';

const researchRepository = new SQLiteResearchRepository();

export class DeleteResearchController extends OpenAPIRoute {
    schema = {
        tags: ['Researchs'],
        summary: 'Delete an existing research',
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.number().min(1, { message: 'ID is required' })
            })
        },
        responses: {
            '200': {
                description: 'Research deleted successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool()
                        })
                    }
                }
            },
            '404': {
                description: 'Research not found',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            message: z.string()
                        })
                    }
                }
            }
        }
    };

    async handle() {
        const data = await this.getValidatedData<typeof this.schema>();

        const { id } = data.params;

        try {
            const deleteResearchUseCase = new DeleteResearchUseCase(researchRepository);

            await deleteResearchUseCase.execute(id);

            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Research deletion failed'
            };
        }
    }
}
