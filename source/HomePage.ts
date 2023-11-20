import type { Section, SectionResultBook } from "./Home";
import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";
import type{ QueryType } from "./query";


export async function Home({ lang }: Omit<QueryType, "id">): Promise<Section[]> {
    const url = Urls[lang];
    const $ = await getResource({ url, domParse: true });
    const Sections: Section[] = [];
    const $carrousel = $.querySelector(".index-carousel")
    if(!$carrousel)
        throw Errors["COULDN'T PARSE"]
    // Get Book Sections (.index-book-list)
    const $BookSections = $.querySelectorAll(".index-book-list")
    $BookSections.forEach(($Section) => {
        let $Title = $Section.querySelector("a");
        
        
        if(!$Title)
         throw Errors["COULDN'T PARSE"];
        
        
        const Title = $Title.hasAttribute('title') ?
        //@ts-ignore
        $Title.getAttribute("title").split(" ", 2)[1] :
        "No title";

        
        const Books: SectionResultBook[] = [];
        // GetBooks
        const $Books = $Section.querySelectorAll(".book-list .book-item")
        $Books.forEach(($book, _book) => {
            // @ts-ignore
            let book: SectionResultBook = {}
            const $a = $book.querySelector("a[itemprop='url']");
            const Name = $book.querySelector('div[itemprop="name"]');
            const Review = $book.querySelector('.book-rate .book-rate-num')
            const Type = $book.querySelector('.book-type');
            const Image = $book.querySelector('.book-pic img')
            const Description = $book.querySelector('.book-summary .book-summary-content')
            const Views = $book.querySelector('.book-data .book-data-item div.book-data-num')
            const Date = $book.querySelector('.book-data .book-data-item .book-data-time')
            
            if(!Name || !$a || !Review || !Type || !Image || !Description || !Views || !Date)
            throw Errors["COULDN'T PARSE"];
            book.Name = Name.innerText
            book.Id =
                $a.getAttribute('href')?.split("/novel/")[1]
                .replace(".html", "") ?? "";
            let review = Review.innerText;
            // @ts-ignore
            book.Image = Image.hasAttribute('src') ?
                Image.getAttribute('src') : 
                "";
            book.Review = (review !== "") ? Number(review) : 0;
            // @ts-ignore
            book.Type = Type.innerText;
            book.Description = Description.innerText
            let views = Views.innerText.replace(",", "")
            book.Views = (views !== "") ? Number(views) : 0;
            book.Date = Date.innerText
            Books.push(book)
        })
        Sections.push({
            Title,
            Books
        })
    })


    
    const $Title = $carrousel.querySelector(".carousel-title")
    const $Items = $carrousel.querySelectorAll(".carousel-list .book-item")
    if(!$Title || !$Items) 
    throw Errors["COULDN'T PARSE"];
    const Title = $Title.innerText;
    const PopularBooks: SectionResultBook[] = [];
    $Items.forEach(($book) => {
        // @ts-ignore
        let book: SectionResultBook = {};
        const $Id = $book.querySelector(".book-info a")
        const Views = $book.querySelector('.book-data .book-data-num')
        const Description = $book.querySelector('.book-summary-content')
        const Review = $book.querySelector('.book-rate-num-circle')
        const Image = $book.querySelector('.book-pic img')
        if(!$Id || !Views || !Description || !Review || !Image)
            throw Errors["COULDN'T PARSE"]
        book.Id = $Id.hasAttribute("href") ?
            //@ts-ignore
            $Id.getAttribute("href")
                .split("/novel/")[1]
                .replace(".html", "") :
            "";
        book.Name 
        $Id.getAttribute("title") ?? "";

        const views = Views.innerText
            .replace(",", "");
        book.Views = (views !== "") ? Number(views) : 0;

        // Summary
        book.Description = Description.innerText

        let review = Review.innerText.replace(',', "")

        book.Review = (review !== "") ? Number(review) : 0;

        //@ts-ignore
        book.Image = $Id.hasAttribute("src") ?
        $Id.getAttribute("src") : "";

        PopularBooks.push(book)
    })
    Sections.push({
        Title,
        Books: PopularBooks
    })
    return Sections
}