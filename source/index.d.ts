type SearchResult = {
    bookImage: string,
    bookReview: string,
    bookViews: string,
    bookDate: string,
    bookTags: string[],
    bookType: "Manga" | "Novel",
    bookName: string
    bookID: string
}

type TManga = {
    Name: string,
    OnGoing: boolean,
    Image: string,
    Type: string,
    Followers: string,
    Review: string,
    Description: string,
    Tags: string,
    Reviews: string,
    Author: string
}

type TEpisode = {
    Name: string,
    Id: string,
    Views: string,
    Date: string
}


type MangaInfo = {
    Episodes: TEpisode[],
    Manga: TManga
}
type lang = "en" | "es" | "br" | "it" | "ru" | "de";

export class Search{
    constructor(lang: lang, word: string);
    exec(): Promise<SearchResult[]>;
}

export class Manga{
    constructor(lang: lang, id: string);
    exec(): Promise<MangaInfo>;
}

export class Episode{
    constructor(lang: lang, id: string);
    exec(): Promise<string[]>;
}
