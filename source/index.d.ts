import { CheerioAPI } from "cheerio"

type SearchResult = {
    Image: string,
    Review: number,
    Views: number,
    Date: string,
    Tags: string[],
    Type: "Manga" | "Novel",
    Name: string
    Id: string
}

interface SectionResultBook extends SearchResult{
    Description: string,
    Date?: string,
    Tags: null
}
type HomePage = {
    Title: string,
    Books: SectionResultBook[]
}[]
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
type lang = "en" | "es" | "br" | "it" | "ru" | "de";
type QueryType = { lang: lang, id: string }
type SpecialQuery = {
    $: CheerioAPI,
} | {
    lang?: lang,
    id?: string
}
type MangaInfo = {
    Episodes: TEpisode[],
    Manga: TManga
}


export function Search(Query: QueryType): Promise<SearchResult[]>
type FManga = {
    getMangaInfo: (Query: SpecialQuery) => Promise<{Manga: TManga, $: CheerioAPI}> ,
    getEpisodes: (Query: SpecialQuery) => Promise<TEpisode[]>,
    getBoth: (Query: QueryType) => Promise<MangaInfo>
};
export function Home(Query: QueryType): Promise<HomePage>
export const Manga: FManga;
export function Episode(Query: QueryType): Promise<string[]>