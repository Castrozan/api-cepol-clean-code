import { CreateAboutUseCase } from 'application/use-cases/about/CreateAboutUseCase';
import { Bool, OpenAPIRoute } from 'chanfana';
import { AboutRepository } from 'infrastructure/database/repositories/about/AboutRepository';
import { z } from 'zod';

const aboutRepository = new AboutRepository();

export class CreateAboutController extends OpenAPIRoute {
    schema = {
        tags: ['Abouts'],
        summary: 'Create a new about',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            bodyText: z.string().optional(),
                            secondText: z.string().optional(),
                            images: z.array(z.object({
                                url: z.string().url({ message: 'Invalid URL' }).optional(),
                                title: z.string().optional(),
                                description: z.string().optional(),
                            })).optional(),
                        }),
                    },
                },
            },
        },
        responses: {
            '201': {
                description: 'About created successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            result: z.object({
                                id: z.number(),
                                bodyText: z.string().nullable(),
                                secondText: z.string().nullable(),
                                images: z.array(z.object({
                                    id: z.number(),
                                    aboutId: z.number(),
                                    url: z.string().nullable(),
                                    title: z.string().nullable(),
                                    description: z.string().nullable(),
                                })).nullable(),
                                createdAt: z.string(),
                                updatedAt: z.string(),
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
        },
    };

    async handle(c) {
        const data = await this.getValidatedData<typeof this.schema>();

        const { bodyText, secondText, images } = data.body;

        try {
            const createAboutUseCase = new CreateAboutUseCase(aboutRepository);

            const about = await createAboutUseCase.execute({

                bodyText,
                secondText,
                images: images ? images.map(image => ({
                    url: image.url,
                    title: image.title,
                    description: image.description
                })) : null,
            });

            return {
                success: true,
                result: {
                    id: about.id,
                    bodyText: about.bodyText,
                    secondText: about.secondText,
                    images: about.images,
                    createdAt: about.createdAt.toISOString(),
                },
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'About creation failed',
            };
        }
    }
}