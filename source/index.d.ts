import { CheerioAPI } from "cheerio"

type SearchResult = {
    bookImage: string,
    bookReview: number,
    bookViews: number,
    bookDate: string,
    bookTags: string[],
    bookType: "Manga" | "Novel",
    bookName: string
    bookID: string
}

type TManga = {
    Name: string,
    Image: string,
    Type: string,
    Description: string,
    Author: string
    Tags: string,
    OnGoing: boolean,
    Followers: number,
    Review: number,
    Reviews: number,
}

type TEpisode = {
    Name: string,
    Id: string,
    Date: string
    Views: number,
}
type QueryType = { lang: string, id: string }
type SpecialQuery = {
    $: CheerioAPI,
} | {
    lang?: string,
    id?: string
}
type MangaInfo = {
    Episodes: TEpisode[],
    Manga: TManga
}
type lang = "en" | "es" | "br" | "it" | "ru" | "de";

export function Search(Query: QueryType): Promise<SearchResult[]>
type FManga = {
    getMangaInfo: (Query: SpecialQuery) => Promise<{Manga: TManga, $: CheerioAPI}> ,
    getEpisodes: (Query: SpecialQuery) => Promise<TEpisode[]>,
    getBoth: (Query: QueryType) => Promise<MangaInfo>
};

export const Manga: FManga;
export function Episode(Query: QueryType): Promise<string[]>