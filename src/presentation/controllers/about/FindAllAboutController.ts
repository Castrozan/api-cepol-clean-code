import { FindAllAboutsUseCase } from "application/use-cases/about/FindAllAboutUseCase";
import { Bool, OpenAPIRoute } from "chanfana";
import { SQLiteAboutRepository } from "infrastructure/database/repositories/about/SQLiteAboutRepository";
import { z } from "zod";

const aboutRepository = new SQLiteAboutRepository();

export class FindAllAboutController extends OpenAPIRoute {
  schema = {
    tags: ["Abouts"],
    summary: "Retrieve all abouts",
    responses: {
      "200": {
        description: "List of abouts retrieved successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              result: z.array(
                z.object({
                  id: z.number(),
                  title: z.string(),
                  description: z.string().nullable(),
                  bodyText: z.string(),
                  secondText: z.string(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                  professionalId: z.number().nullable(),
                  author: z.string().nullable(),
                  published: z.string().nullable(),
                  images: z
                    .array(
                      z.object({
                        id: z.number().nullable(),
                        researchId: z.number().nullable(),
                        url: z.string().nullable(),
                        title: z.string().nullable(),
                        description: z.string().nullable(),
                      })
                    )
                    .nullable(),
                  professional: z
                    .object({
                      id: z.number(),
                      name: z.string(),
                      email: z.string(),
                      password: z.string(),
                      role: z.string(),
                    })
                    .nullable(),
                })
              ),
            }),
          },
        },
      },
      "400": {
        description: "Failed to retrieve abouts",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              message: z.string(),
            }),
          },
        },
      },
    },
  };

  async handle() {
    try {
      const findAllAboutUseCase = new FindAllAboutsUseCase(aboutRepository);
      const abouts = await findAllAboutUseCase.execute();

      return {
        success: true,
        result: abouts.map((about) => ({
          id: about.id,
          bodyText: about.bodyText,
          secondText: about.secondText,
          createdAt: about.createdAt.toISOString(),
          images: about.images
            ? about.images.map((image) => ({
                id: image.id,
                researchId: image.aboutId,
                url: image.url,
                title: image.title,
                description: image.description,
              }))
            : null,
        })),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to retrieve abouts",
      };
    }
  }
}
