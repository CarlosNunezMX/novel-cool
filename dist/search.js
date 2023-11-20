"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const makeFetchHappend_js_1 = require("./connectors/makeFetchHappend.js");
const Errors_js_1 = __importDefault(require("./connectors/Errors.js"));
async function Search({ lang, id }) {
    let urlNotFinal = makeFetchHappend_js_1.Urls["en"];
    if (lang && makeFetchHappend_js_1.Urls[lang])
        urlNotFinal = makeFetchHappend_js_1.Urls[lang];
    if (!id)
        throw Errors_js_1.default["REQUIRED_ARGUMENT"];
    const url = urlNotFinal + "search/?wd=" + id;
    const $ = await (0, makeFetchHappend_js_1.getResource)({ url, domParse: true });
    const $books = $.querySelectorAll(".book-item");
    const books = [];
    $books.forEach(($book, _book) => {
        // @ts-ignore
        let book = {};
        const Image = $book.querySelector('.book-pic a img');
        const Name = $book.querySelector('.book-name');
        const Review = $book.querySelector('.book-rate-num');
        const Date = $book.querySelector(".book-data-time[itemprop='dateModified']");
        const Views = $book.querySelector('.book-data-num');
        const Type = $book.querySelector('.book-type');
        const Id = $book.querySelector(".book-pic a[itemprop='url']");
        const Tags = $book.querySelectorAll('.book-tags .book-tag');
        if (!Image || !Name || !Review || !Date || !Views || !Type || !Tags || !Id)
            throw Errors_js_1.default["COULDN'T PARSE"];
        // Book Meta
        book.Image = Image.getAttribute('src') ?? "";
        book.Name = Name.innerText;
        let review = Review.innerText.replace(',', '');
        book.Review =
            (review === "" || review === "N/A") ?
                0 : Number(review);
        book.Date = Date.innerText;
        let views = Views.innerText.replace(',', '');
        book.Views =
            (views === "" || views === "N/A") ?
                0 : Number(views);
        // @ts-ignore
        book.Type = Type.innerText;
        book.Tags = [];
        Tags.forEach(($tag) => {
            book.Tags.push($tag.innerText);
        });
        // Book ID
        book.Id = Id
            .hasAttribute("href") ?
            // @ts-ignore
            Id.getAttribute('href')
                .split("/")
                .pop()
                .replace(".html", "")
            : "";
        books.push(book);
    });
    return books;
}
exports.Search = Search;
