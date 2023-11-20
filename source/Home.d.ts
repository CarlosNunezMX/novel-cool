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

// @ts-ignore
interface _SectionResultBook extends SearchResult{
    Description: string,
    Date?: string
}

export type Section = {
    Title: string,
    Books: SectionResultBook[]
}

export type SectionResultBook = Omit<_SectionResultBook,  "Tags">
export type HomePage = {
    Title: string,
    Books: SectionResultBook[]
}[]