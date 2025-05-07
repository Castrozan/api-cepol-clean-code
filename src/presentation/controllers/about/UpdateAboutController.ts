import { UpdateAboutUseCase } from 'application/use-cases/about/UpdateAboutUseCase';
import { Bool, OpenAPIRoute } from 'chanfana';
import { AboutRepository } from 'infrastructure/database/repositories/about/AboutRepository';
import { z } from 'zod';

const aboutRepository = new AboutRepository();

export class UpdateAboutController extends OpenAPIRoute {
    schema = {
        tags: ['Abouts'],
        summary: 'Update an existing about',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            id: z.number().min(1, { message: 'ID is required' }),
                            bodyText: z.string().optional(),
                            secondText: z.string().optional(),
                            images: z.array(z.object({
                                id: z.number().nullable().optional(),
                                aboutId: z.number().nullable().optional(),
                                url: z.string().url({ message: 'Invalid URL' }).nonempty({ message: 'URL is required' }),
                                title: z.string().optional(),
                                description: z.string().optional(),
                            })).optional(),
                        }),
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'About updated successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            result: z.object({
                                id: z.number(),
                                bodyText: z.string().nullable(),
                                secondText: z.string().nullable(),
                                createdAt: z.string(),
                                images: z.array(z.object({
                                    id: z.number().nullable(),
                                    url: z.string().nullable(),
                                    title: z.string().nullable(),
                                    description: z.string().nullable(),
                                    aboutId: z.number().nullable()
                                })).nullable(),
                            }),
                        }),
                    },
                },
            },
            '400': {
                description: 'Invalid input',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            message: z.string(),
                        }),
                    },
                },
            },
            '404': {
                description: 'About not found',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            message: z.string(),
                        }),
                    },
                },
            },
        },
    };

    async handle(c) {
        const data = await this.getValidatedData<typeof this.schema>();

        const { id, bodyText, secondText, images } = data.body;

        try {
            const updateAboutUseCase = new UpdateAboutUseCase(aboutRepository);

            const about = await updateAboutUseCase.execute({
                id,
                bodyText,
                secondText,
                images: images ? images.map(image => ({
                    id: image.id,
                    url: image.url,
                    title: image.title,
                    description: image.description,
                    aboutId: image.aboutId
                })) : null,
            });

            return {
                success: true,
                result: {
                    id: about.id,
                    bodyText: about.bodyText,
                    secondText: about.secondText,
                    images: about.images ? about.images.map(image => ({
                        id: image.id,
                        aboutId: image.aboutId,
                        url: image.url,
                        title: image.title,
                        description: image.description,
                    })) : null,
                    createdAt: about.createdAt.toISOString(),
                },
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'About update failed',
            };
        }
    }
}