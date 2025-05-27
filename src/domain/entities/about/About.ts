import { AboutImage } from './AboutImage';

export class About {
    private constructor(
        public id: number | null,
        public bodyText: string,
        public secondText: string,
        public createdAt: Date,
        public images: AboutImage[] | null = []
    ) {}

    static create(bodyText: string, secondText: string, createdAt: Date): About {
        return new About(null, bodyText, secondText, createdAt, []);
    }

    withId(id: number): About {
        this.id = id;
        return this;
    }

    withImages(images: AboutImage[]): About {
        this.images = images;
        return this;
    }

    updateTexts(bodyText?: string, secondText?: string): About {
        if (bodyText) this.bodyText = bodyText;
        if (secondText) this.secondText = secondText;
        return this;
    }
}
