import { Urls, getResource } from "./connectors/makeFetchHappend.js";
import Errors from "./connectors/Errors.js";
import type { QueryType } from "./query";
import type { SearchResult } from "./Home";


export async function Search({ lang, id }: QueryType): Promise<SearchResult[]> {
  let urlNotFinal = Urls["en"];
  if (lang && Urls[lang]) urlNotFinal = Urls[lang];
  if (!id) throw Errors["REQUIRED_ARGUMENT"];
  const url = urlNotFinal + "search/?wd=" + id;
  const $ = await getResource({ url, domParse: true });
  const $books = $.querySelectorAll(".book-item");
  const books: SearchResult[] = [];

  $books.forEach(($book, _book) => {
    // @ts-ignore
    let book: SearchResult = {}
    const Image = $book.querySelector('.book-pic a img');
    const Name = $book.querySelector('.book-name');
    const Review = $book.querySelector('.book-rate-num');
    const Date = $book.querySelector(".book-data-time[itemprop='dateModified']");
    const Views = $book.querySelector('.book-data-num');
    const Type = $book.querySelector('.book-type');
    const Id = $book.querySelector(".book-pic a[itemprop='url']")
    const Tags = $book.querySelectorAll('.book-tags .book-tag');
    
    if(!Image || !Name || !Review || !Date || !Views || !Type || !Tags || !Id) 
      throw Errors["COULDN'T PARSE"];
    // Book Meta
    book.Image = Image.getAttribute('src') ?? "";
    book.Name = Name.innerText;
    let review = Review.innerText.replace(',', '')
    book.Review =
      (review === "" || review === "N/A") ?
        0 : Number(review)

    book.Date = Date.innerText;
    let views = Views.innerText.replace(',', '');
    book.Views =
      (views === "" || views === "N/A") ?
        0 : Number(views)
    // @ts-ignore
    book.Type = Type.innerText

    book.Tags = [];
    Tags.forEach(($tag) => {
      book.Tags.push($tag.innerText)
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
  })


  return books;
}

