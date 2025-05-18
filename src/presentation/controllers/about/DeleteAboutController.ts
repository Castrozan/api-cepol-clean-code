import { DeleteAboutUseCase } from "application/use-cases/about/DeleteAboutUseCase";
import { Bool, OpenAPIRoute } from "chanfana";
import { SQLiteAboutRepository } from "infrastructure/database/repositories/about/SQLiteAboutRepository";
import { z } from "zod";

const aboutRepository = new SQLiteAboutRepository();

export class DeleteAboutController extends OpenAPIRoute {
  schema = {
    tags: ["Abouts"],
    summary: "Delete an existing about",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({
        id: z.number().min(1, { message: "ID is required" }),
      }),
    },
    responses: {
      "200": {
        description: "About deleted successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
            }),
          },
        },
      },
      "404": {
        description: "About not found",
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

  async handle(c) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { id } = data.params;

    try {
      const deleteAboutUseCase = new DeleteAboutUseCase(aboutRepository);

      await deleteAboutUseCase.execute(id);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "About deletion failed",
      };
    }
  }
}
