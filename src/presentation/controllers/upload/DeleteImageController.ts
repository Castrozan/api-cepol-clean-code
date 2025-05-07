import { Bool, OpenAPIRoute } from 'chanfana';
import { removeImageByUrl } from 'infrastructure/services/bucket/cloudflare'; // Importando a função de remoção
import { z } from 'zod';

export class DeleteImageController extends OpenAPIRoute {
    schema = {
        tags: ['Images'],
        summary: 'Delete an image from Cloudflare using its URL',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            url: z.string().url().nonempty(),
                        }),
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Image deleted successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            result: z.object({
                                message: z.string(),
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
                description: 'Image not found or invalid URL',
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

        const { url } = data.body;

        if (!url) {
            return {
                success: false,
                message: 'Request body is missing or URL is not provided',
            };
        }

        try {
            await removeImageByUrl(url, c);

            return {
                success: true,
                result: {
                    message: `Image at ${url} deleted successfully`,
                },
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('Invalid URL')) {
                return {
                    success: false,
                    message: errorMessage,
                };
            }

            return {
                success: false,
                message: `Failed to delete image: ${errorMessage}`,
            };
        }
    }
}