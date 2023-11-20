export type TEpisode = {
    Name: string,
    Id: string,
    Date: string
    Views: number,
}

type MangaInfo = {
    Episodes: TEpisode[],
    Manga: TManga
}
type TManga = {
    Name: string,
    Image: string,
    Type: string,
    Description: string,
    Author: string
    Tags: string[],
    OnGoing: boolean,
    Followers: number,
    Review: number,
    Reviews: number,
}