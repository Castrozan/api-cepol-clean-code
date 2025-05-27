import { About } from 'domain/entities/about/About';
import { AboutImage } from 'domain/entities/about/AboutImage';
import { IAboutRepository } from 'domain/interfaces/about/IAboutRepository';
import { getDatabase } from '../../sqlite/sqlite-client';

interface AboutRow {
    id: number;
    bodyText: string;
    secondText: string;
    createdAt: string;
}

interface AboutImageRow {
    id: number;
    aboutId: number;
    url: string | null;
    title: string | null;
    description: string | null;
}

export class SQLiteAboutRepository implements IAboutRepository {
    async findById(id: number): Promise<About | null> {
        const db = getDatabase();
        const row = db.prepare('SELECT * FROM About WHERE id = ?').get(id) as AboutRow | undefined;

        if (!row) return null;

        const images = db
            .prepare('SELECT * FROM AboutImage WHERE aboutId = ?')
            .all(id) as AboutImageRow[];

        const aboutImages = images.map(
            (img) => new AboutImage(img.id, img.aboutId, img.url, img.title, img.description)
        );

        return About.create(row.bodyText, row.secondText, new Date(row.createdAt))
            .withId(row.id)
            .withImages(aboutImages);
    }

    async findAll(): Promise<About[]> {
        const db = getDatabase();
        const rows = db.prepare('SELECT * FROM About').all() as AboutRow[];

        return Promise.all(rows.map((row) => this.findById(row.id))) as Promise<About[]>;
    }

    async create(about: Partial<About & { images?: Partial<AboutImage>[] }>): Promise<About> {
        const db = getDatabase();
        const now = new Date();
        db.prepare('BEGIN').run();

        try {
            const result = db
                .prepare(
                    `
                INSERT INTO About (bodyText, secondText, createdAt)
                VALUES (?, ?, ?)
            `
                )
                .run(about.bodyText, about.secondText, now.toISOString());

            const aboutId = Number(result.lastInsertRowid);

            if (about.images?.length) {
                const stmt = db.prepare(`
                    INSERT INTO AboutImage (aboutId, url, title, description)
                    VALUES (?, ?, ?, ?)
                `);
                about.images.forEach((image) =>
                    stmt.run(aboutId, image.url, image.title, image.description)
                );
            }

            db.prepare('COMMIT').run();
            return this.findById(aboutId) as Promise<About>;
        } catch (err) {
            db.prepare('ROLLBACK').run();
            throw err;
        }
    }

    async update(about: Partial<About & { images?: Partial<AboutImage>[] }>): Promise<About> {
        if (!about.id) throw new Error('About ID is required for update');

        const db = getDatabase();
        db.prepare('BEGIN').run();

        try {
            db.prepare(
                `
                UPDATE About SET
                    bodyText = COALESCE(?, bodyText),
                    secondText = COALESCE(?, secondText)
                WHERE id = ?
            `
            ).run(about.bodyText, about.secondText, about.id);

            if (about.images) {
                db.prepare('DELETE FROM AboutImage WHERE aboutId = ?').run(about.id);
                const stmt = db.prepare(`
                    INSERT INTO AboutImage (aboutId, url, title, description)
                    VALUES (?, ?, ?, ?)
                `);
                about.images.forEach((image) =>
                    stmt.run(about.id, image.url, image.title, image.description)
                );
            }

            db.prepare('COMMIT').run();
            return this.findById(about.id) as Promise<About>;
        } catch (err) {
            db.prepare('ROLLBACK').run();
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        const db = getDatabase();
        db.prepare('BEGIN').run();

        try {
            db.prepare('DELETE FROM AboutImage WHERE aboutId = ?').run(id);
            db.prepare('DELETE FROM About WHERE id = ?').run(id);
            db.prepare('COMMIT').run();
        } catch (err) {
            db.prepare('ROLLBACK').run();
            throw err;
        }
    }
}
