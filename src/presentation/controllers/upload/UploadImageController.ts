import { Bool, OpenAPIRoute } from 'chanfana';
import { uploadImage } from 'infrastructure/services/bucket/cloudflare';
import { z } from 'zod';

export class UploadImageController extends OpenAPIRoute {
    schema = {
        tags: ['Images'],
        summary: 'Upload an image to Cloudflare',
        security: [{ bearerAuth: [] }],
        request: {
            body: {
                content: {
                    'multipart/form-data': {
                        schema: z.object({
                            file: z.instanceof(File),
                        }),
                    },
                },
            },
        },
        responses: {
            '201': {
                description: 'Image uploaded successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            success: Bool(),
                            result: z.object({
                                id: z.string(),
                                filename: z.string(),
                                url: z.string(),
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

        const formData = await c.req.formData();
        const file = formData.get('file');
        if (!file) {
            return {
                success: false,
                message: 'Request body is missing',
            };
        }

        try {
            // Se necessário, você pode utilizar o fileName na lógica do upload
            const uploadResult = await uploadImage(file, c);

            return {
                success: true,
                result: uploadResult,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Image upload failed',
            };
        }
    }
}
