import { Urls, getResource } from "./connectors/makeFetchHappend.js";
export async function Home({ lang }) {
    const url = Urls[lang];
    const $ = await getResource({ url, domParse: true });
    const Sections = [];
    // Get Book Sections (.index-book-list)
    const $BookSections = $(".index-book-list")
    $BookSections.each((_, _el) => {
        const $Section = $(_el);
        let Title = $Section.find("a")
            .first()
            .attr("title")
            .split(" ", 2)[1]
        const Books = [];
        // GetBooks
        const $Books = $Section.find(".book-list .book-item")
        $Books.each((__, _book) => {
            /**
             * @type {import("./index.js").SectionResultBook}
             */
            let book = {}
            const $book = $(_book);
            const $a = $book.find("a[itemprop='url']")
                .first();

            book.Name = $book.find("div[itemprop='name']")
                .first()
                .text();
            book.Id = $a
                .attr("href")
                .split("/novel/")[1]
                .replace(".html", "");
            book.Review = $book.find(".book-rate .book-rate-num")
                .first()
                .text()
            book.Image = $book.find(".book-pic img")
                .attr("src");
            book.Review = (book.Review !== "") ? Number(book.Review) : 0;
            book.Type = $book.find(".book-type")
                .first()
                .text()
            book.Description = $book.find(".book-summary .book-summary-content")
                .first()
                .text()
            book.Views = $book.find(".book-data .book-data-item span.book-data-num")
                .first()
                .text()
                .replace(",", "")
            book.Views = (book.Views !== "") ? Number(book.Views) : 0;
            book.Date = $book.find(".book-data .book-data-item .book-data-time")
                .first()
                .text()
            Books.push(book)
        })
        Sections.push({
            Title,
            Books
        })
    })


    const $carrousel = $(".index-carousel")
    const Title = $carrousel.find(".carousel-title")
        .text()

    const $Items = $carrousel.find(".carousel-list .book-item")
    const PopularBooks = [];
    $Items.each((_, _el) => {
        /** @type {import("./index.js").SectionResultBook} */
        let book = {};
        const $book = $(_el);
        const $Id = $book.find(".book-info a")

        book.Id = $Id.attr("href")
            .split("/novel/")[1]
            .replace(".html", "")
        book.Name = $Id.attr("title");

        book.Views = $book.find(".book-data .book-data-num")
            .first()    
            .text()
            .replace(",", "")
        book.Views = (book.Views !== "") ? Number(book.Views) : 0;

        // Summary
        book.Description = $book.find(".book-summary-content")
            .first()
            .text()

        book.Review = $book.find(".book-rate-num-circle")
            .first()
            .text()

        book.Review = (book.Review !== "") ? Number(book.Review) : 0;
        book.Image = $book.find(".book-pic img")
            .first()
            .attr("src")
        PopularBooks.push(book)
    })
    Sections.push({
        Title,
        Books: PopularBooks
    })
    return Sections
}