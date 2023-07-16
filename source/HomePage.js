import { Urls, getResource } from "./connectors/makeFetchHappend.js";
export async function Home({lang}){
    const url = Urls[lang];
    const $ = await getResource({ url, domParse: true });
    
    const PopularBooks = ParseBooks($);

    return {
        PopularBooks
    }
}

function ParseBooks($){
    const PopularBooks = []
    const $PopularBooks = $(".index-carousel .carousel-list .book-item");

    $PopularBooks.each((_, _el) => {
        const $Book = $(_el);
        const bookID = $Book.find(".book-pic a[itemprop='url']")
            .first()
            .attr("href")
            .replace(".html", "")
            .split("novel/")[1];

        const bookImage = $Book.find("a img[itemprop='image']")
            .first()
            .attr("src");

        let bookReview = $Book.find("a .book-rate-num-circle")    
            .first()
            .text();

        bookReview = bookReview !== 0 ? Number(bookReview) : 0;

        let bookDescription = $Book.find(".book-summary .book-summary-content")
            .first()
            .text()
            .trim()

        const bookName = $Book.find(".book-name")
            .first()
            .text()
        
        let bookViews = $Book.find(".book-info .book-data .book-data-item .book-data-num")
            .first()
            .text()
            .replace(",", "")

        bookViews = 
            (bookViews === "" || bookViews === "N/A") ? 0 : Number(bookViews)
        PopularBooks.push({
            bookID, 
            bookImage, 
            bookReview, 
            bookDescription, 
            bookName,
            bookViews
        })
    })

    return PopularBooks;
}