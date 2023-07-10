import {Urls, getResource} from "./connectors/makeFetchHappend.js";
import Errors from "./connectors/Errors.js";

export class Search{
  #lang = Urls.en;
  /**
  * @param {import("./connectors/makeFetchHappend.js").lang} lang
  * @param {string} word
  */
  constructor(lang, word){
    if(lang && Urls[lang]) this.#lang = Urls[lang]
    if(!word) throw Errors["REQUIRED_ARGUMENT"];
    this.url = this.#lang + "search/?wd=" + word;
  }

  async exec(){
    /**
     * @type {import("cheerio").CheerioAPI}
     */
    const $ = await getResource({url: this.url, domParse: true});
    const $books = $(".book-item");
    /** @type {import("./index.js").SearchResult[]} */
    const books = [];

    $books.each((i, _book) => {
      const $book = $(_book);
      /**
       * @type {import("./index.js").SearchResult}
       */
      let book = {}

      // Book Meta
      book.bookImage = $book.find(".book-pic a img").attr("src");
      book.bookName = $book.find(".book-name").first().text();
      book.bookReview = $book.find(".book-rate-num").text();
      book.bookDate = $book.find(".book-data-time[itemprop='dateModified']").first().text();
      book.bookViews = $book.find(".book-data-num").text();
      book.bookType = $book.find(".book-type").text();

      book.bookTags = [];
      const tags = $book.find(".book-tags .book-tag");
      tags.each((i, _tag) => {
        const $tag = $(_tag);
        book.bookTags.push($tag.text())
      });


      // Book ID
      book.bookID = $book.find(".book-pic a[itemprop='url']")
                         .first()
                         .attr("href")
                         .split("/")
                         .pop()
                         .replace(".html", "");
      
      books.push(book);
    })


    return books;
  }
}
