import { Urls, getResource } from "./connectors/makeFetchHappend.js";
import Errors from "./connectors/Errors.js";


export async function Search({ lang, id }) {
  if (lang && Urls[lang]) lang = Urls[lang];
  if (!id) throw Errors["REQUIRED_ARGUMENT"];
  const url = lang + "search/?wd=" + id;
  /**
   * @type {import("cheerio").CheerioAPI}
   */
  const $ = await getResource({ url, domParse: true });
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
    book.Image = $book.find(".book-pic a img").attr("src");
    book.Name = $book.find(".book-name").first().text();

    book.Review = $book.find(".book-rate-num")
      .text()
      .replace(",", "");
    book.Review =
      (book.Review === "" || book.Review === "N/A") ?
        0 : Number(book.Review)

    book.Date = $book.find(".book-data-time[itemprop='dateModified']").first().text();
    book.Views = $book.find(".book-data-num")
      .text()
      .replace(",", "");
    book.Views =
      (book.Views === "" || book.Views === "N/A") ?
        0 : Number(book.Views)
        
    book.Type = $book.find(".book-type").text();

    book.Tags = [];
    const tags = $book.find(".book-tags .book-tag");
    tags.each((i, _tag) => {
      const $tag = $(_tag);
      book.Tags.push($tag.text())
    });


    // Book ID
    book.Id = $book.find(".book-pic a[itemprop='url']")
      .first()
      .attr("href")
      .split("/")
      .pop()
      .replace(".html", "");

    books.push(book);
  })


  return books;
}

