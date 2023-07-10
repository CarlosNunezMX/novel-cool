export type SearchResult = {
    bookImage: string,
    bookReview: string,
    bookViews: string,
    bookDate: string,
    bookTags: string[],
    bookType: "Manga" | "Novel",
    bookName: string
    bookID: string
}

export type TManga = {
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

export type Episode = {
    Name: string,
    Id: string,
    Views: string,
    Date: string
}
