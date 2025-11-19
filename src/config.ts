export type SiteConfig = {
    author: string;
    title: string;
    description: string;
    lang: string;
    ogLocale: string;
    date: {
        locale: string | string[] | undefined;
        options: Intl.DateTimeFormatOptions;
    };
};

export type SiteMeta = {
    title: string;
    description?: string;
    ogImage?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
};

export const siteConfig: SiteConfig = {
    author: 'Shahidul Islam Majumder',
    title: 'Shahidul Islam Majumder',
    description: 'Some common tools I use now and then',
    lang: 'en',
    ogLocale: 'en_US',
    date: {
        locale: 'en-US',
        options: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        },
    },
};

export const PAGE_SIZE = 10;
