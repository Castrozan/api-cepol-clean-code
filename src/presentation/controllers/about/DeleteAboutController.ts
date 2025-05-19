import { DeleteAboutUseCase } from 'application/use-cases/about/DeleteAboutUseCase';
import { Bool, OpenAPIRoute } from 'chanfana';
import aboutRepository from 'infrastructure/database/repositories/about';
import { withErrorHandling } from 'presentation/decorators';
import { z } from 'zod';

export class DeleteAboutController extends OpenAPIRoute {
    schema = {
        tags: ['Abouts'],
        summary: 'Delete an existing about',
        security: [{ bearerAuth: [] }],
        request: {
            params: z.object({
                id: z.number().min(1, { message: 'ID is required' })
            })
        },
        responses: {
            '200': {
                description: 'About deleted successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool()
                        })
                    }
                }
            },
            '404': {
                description: 'About not found',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            message: z.string()
                        })
                    }
                }
            },
            '500': {
                description: 'Server error',
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

    @withErrorHandling
    async handle(): Promise<object> {
        const data = await this.getValidatedData<typeof this.schema>();

        const { id } = data.params;

        const deleteAboutUseCase = new DeleteAboutUseCase(aboutRepository);

        await deleteAboutUseCase.execute(id);

        return {
            success: true
        };
    }
}
