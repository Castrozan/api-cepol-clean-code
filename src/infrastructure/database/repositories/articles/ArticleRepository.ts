import { createClient } from '@supabase/supabase-js';
import { Article } from 'domain/entities/articles/Article';
import { ArticleImage } from 'domain/entities/articles/ArticleImage';
import { Professional } from 'domain/entities/professionals/Professional';
import { IArticleRepository } from 'domain/interfaces/articles/IArticleRepository';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../../env';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class ArticleRepository implements IArticleRepository {

    async findById(id: number): Promise<Article | null> {
        const { data: articles, error } = await supabase
            .from('Article')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        if (error) {
            console.error(error);
            return null;
        }

        const { data: images, error: errorImages } = await supabase
            .from("ArticleImage")
            .select("*")
            .eq("articleId", id);

        if (errorImages) {
            console.error(errorImages);
            return null;
        }

        const { data: professionals, error: errorProfessionals } = await supabase
            .from("Professional")
            .select("*")
            .eq("id", articles.professionalId);

        if (errorProfessionals) {
            console.error(errorProfessionals);
            return null;
        }

        return articles ? new Article(
            articles.id,
            articles.title,
            articles.description,
            articles.bodyText,
            articles.secondText,
            new Date(articles.createdAt),
            new Date(articles.updatedAt),
            articles.professionalId,
            articles.author,
            articles.published,
            images ? images.map((image: any) =>
                new ArticleImage(
                    image.id,
                    image.articleId,
                    image.url,
                    image.title,
                    image.description
                )
            ) : null,
            professionals ? professionals.filter((professional: any) => professional.id === articles.professionalId).map((professional: any) =>
                new Professional(
                    professional.id,
                    professional.name,
                    professional.email,
                    professional.phone,
                    professional.avatar,
                    professional.createdAt,
                    professional.updatedAt,
                )
            )[0] : null,
        ) : null;
    }

    async findAll(): Promise<Article[]> {
        const { data: articles, error } = await supabase
            .from('Article')
            .select('*');

        if (error) {
            console.error(error);
            return [];
        }

        const articleIds = articles.map(article => article.id);

        const { data: images, error: errorImages } = await supabase
            .from("ArticleImage")
            .select("*")
            .in("articleId", articleIds);

        if (errorImages && errorImages !== null) {
            console.error(errorImages);
            return [];
        }

        const professionalIds = articles
            .map(article => article.professionalId)
            .filter(professionalId => professionalId !== null);

        const { data: professionals, error: errorProfessionals } = await supabase
            .from("Professional")
            .select("*")
            .in("id", professionalIds);

        if (errorProfessionals && errorProfessionals !== null) {
            console.error(errorProfessionals);
            return [];
        }

        return articles.map((article: any) =>
            new Article(
                article.id,
                article.title,
                article.description,
                article.bodyText,
                article.secondText,
                new Date(article.createdAt),
                new Date(article.updatedAt),
                article.professionalId,
                article.author,
                article.published,
                images ? images.filter((image: any) => image.articleId === article.id).map((image: any) =>
                    new ArticleImage(
                        image.id,
                        image.articleId,
                        image.url,
                        image.title,
                        image.description
                    )
                ) : null,
                professionals ? professionals.filter((professional: any) => professional.id === article.professionalId).map((professional: any) =>
                    new Professional(
                        professional.id,
                        professional.name,
                        professional.email,
                        professional.phone,
                        professional.avatar,
                        professional.createdAt,
                        professional.updatedAt,
                    )
                )[0] : null,

            )
        );
    }

    async create(article: Partial<Article & { images?: Partial<ArticleImage>[] }>): Promise<Article> {
        const { data: savedArticle, error } = await supabase
            .from('Article')
            .insert([
                {
                    title: article.title,
                    description: article.description,
                    bodyText: article.bodyText,
                    secondText: article.secondText,
                    professionalId: article.professionalId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    author: article.author,
                    published: article.published,
                }
            ])
            .select()
            .single();

        if (error !== null) {
            console.error(error);
            throw new Error('Failed to create article');
        }

        if (article.images) {
            const { data: savedImages, error: errorImages }: { data: ArticleImage[] | null, error: any } = await supabase
                .from('ArticleImage')
                .insert(article.images.map(image => ({
                    articleId: savedArticle.id,
                    url: image.url,
                    title: image.title,
                    description: image.description,
                })))
                .select();

            if (!savedImages || errorImages !== null) {
                console.error(errorImages);
                throw new Error('Failed to create article images');
            }

            return new Article(
                savedArticle.id,
                savedArticle.title,
                savedArticle.description,
                savedArticle.bodyText,
                savedArticle.secondText,
                new Date(savedArticle.createdAt),
                new Date(savedArticle.updatedAt),
                savedArticle.professionalId,
                savedArticle.author,
                savedArticle.published,
                (Array.isArray(savedImages) ? savedImages : []).map((image: any) =>
                    new ArticleImage(
                        image.id,
                        image.articleId,
                        image.url,
                        image.title,
                        image.description
                    )
                ),
                null
            );
        }

        return new Article(
            savedArticle.id,
            savedArticle.title,
            savedArticle.description,
            savedArticle.bodyText,
            savedArticle.secondText,
            new Date(savedArticle.createdAt),
            new Date(savedArticle.updatedAt),
            savedArticle.professionalId,
            savedArticle.author,
            savedArticle.published,
            null,
            null
        );
    }

    async update(article: Partial<Article & { images?: Partial<ArticleImage>[] }>): Promise<Article> {
        const { data: updatedArticle, error } = await supabase
            .from('Article')
            .update({
                title: article.title,
                description: article.description,
                bodyText: article.bodyText,
                secondText: article.secondText,
                createdAt: new Date(),
                updatedAt: new Date(),
                professionalId: article.professionalId,
                author: article.author,
                published: article.published,
            })
            .eq('id', article.id)
            .select()
            .single<Article>();


        if (error !== null) {
            console.error(error);
            throw new Error('Failed to update article');
        }

        if (article.images) {
            const { data: existingImages, error: fetchError } = await supabase
                .from('ArticleImage')
                .select('id')
                .eq('articleId', article.id);

            if (fetchError) {
                console.error(fetchError);
                throw new Error('Failed to fetch existing article images');
            }

            const existingImageIds = existingImages.map((image: any) => image.id);

            const newImageIds = article.images ? article.images.map(image => image.id) : [];

            let savedImages: ArticleImage[] = [];
            for (const image of article.images) {
                if (image.id && existingImageIds.includes(image.id)) {
                    const { data: updatedImage, error: updateError } = await supabase
                        .from('ArticleImage')
                        .update({
                            url: image.url,
                            title: image.title,
                            description: image.description,
                        })
                        .eq('id', image.id)
                        .select()
                        .single();

                    if (updateError) {
                        console.error(updateError);
                        throw new Error('Failed to update article image');
                    }
                    
                    savedImages.push(updatedImage);
                } else {
                    const { data: insertedImage, error: errorImages }: { data: ArticleImage[] | null, error: any } = await supabase
                        .from('ArticleImage')
                        .insert({
                            articleId: article.id,
                            url: image.url,
                            title: image.title,
                            description: image.description,
                        })
                        .select();

                    if (!savedImages && errorImages !== null) {
                        console.error(errorImages);
                        throw new Error('Failed to insert new article images');
                    }
                    savedImages.push(insertedImage[0]);
                }
            }

            // Delete removed images
            const imagesToDelete = existingImageIds.filter(id => !newImageIds.includes(id));

            if (imagesToDelete.length > 0) {
                const { error: deleteError } = await supabase
                    .from('ArticleImage')
                    .delete()
                    .in('id', imagesToDelete);

                if (deleteError) {
                    console.error(deleteError);
                    throw new Error('Failed to delete removed article images');
                }
            }

            return new Article(
                updatedArticle.id,
                updatedArticle.title,
                updatedArticle.description,
                updatedArticle.bodyText,
                updatedArticle.secondText,
                new Date(updatedArticle.createdAt),
                new Date(updatedArticle.updatedAt),
                updatedArticle.professionalId,
                updatedArticle.author,
                updatedArticle.published,
                (Array.isArray(savedImages) ? savedImages : []).map((image: any) =>
                    new ArticleImage(
                        image.id,
                        image.articleId,
                        image.url,
                        image.title,
                        image.description
                    )
                ),
                null
            );
        }

        return new Article(
            updatedArticle.id,
            updatedArticle.title,
            updatedArticle.description,
            updatedArticle.bodyText,
            updatedArticle.secondText,
            new Date(updatedArticle.createdAt),
            new Date(updatedArticle.updatedAt),
            updatedArticle.professionalId,
            updatedArticle.author,
            updatedArticle.published,
            null,
            null
        );
    }

    async delete(id: number): Promise<void> {
        const { data: articleExists, error: fetchError } = await supabase
            .from('Article')
            .select('id')
            .eq('id', id)
            .single();

        if (fetchError || !articleExists) {
            console.error(fetchError);
            throw new Error('Article does not exist');
        }

        const { data: article, error: deleteError } = await supabase
            .from('Article')
            .select('id')
            .eq('id', id)
            .single();

        if (fetchError || !article) {
            console.error(fetchError);
            throw new Error('Article does not exist');
        }

        const { error: errorImages } = await supabase
            .from('ArticleImage')
            .delete()
            .eq('articleId', id);

        if (errorImages) {
            console.error(errorImages);
            throw new Error('Failed to delete article images');
        }

        const { error: errorArticle } = await supabase
            .from('Article')
            .delete()
            .eq('id', id);

        if (errorArticle) {
            console.error(errorArticle);
            throw new Error('Failed to delete article');
        }
    }
}
