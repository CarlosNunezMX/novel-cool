import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";
import type {HTMLElement} from "node-html-parser"
import type { QueryType, SpecialQuery } from "./query";
import type { TEpisode, TManga } from "./manga";

export async function getMangaInfo({ lang, id }: QueryType): Promise<{Manga: TManga, $: HTMLElement}>{
    let urlNotFinal = Urls['en'];
    if (lang && Urls[lang]) urlNotFinal = Urls[lang]
    if (!id) throw Errors["REQUIRED_ARGUMENT"];
    const url = urlNotFinal + "novel/" + id;

    const $ = await getResource({ url, domParse: true });
    const $Info = $.querySelector(".bookinfo-module");
    if(!$Info)
        throw Errors["COULDN'T PARSE"]
    // @ts-ignore
    let manga: TManga = {};
    const Image = $Info.querySelector('.bookinfo-pic a img');
    const Type = $Info.querySelector('.book-type');
    const Name = $Info.querySelector('.bookinfo-title');
    const Description = $Info.querySelector('.bk-summary-txt');
    const Author = $Info.querySelector('.bookinfo-author a');
    const Followers = $Info.querySelector('.bk-data .bk-data-val');
    const Review = $Info.querySelectorAll('.bk-data .bk-data-val')[1];
    const Reviews = $Info.querySelectorAll('.bk-data .bk-data-val')[2];
    const Cats = $Info.querySelectorAll('.bookinfo-category-list .bk-cate-item');
    console.log(!Image, !Type, !Name, !Description, !Author, !Followers, !Reviews, !Cats);
    
    if(!Image || !Type || !Name || !Description || !Author || !Followers || !Reviews || !Cats)
        throw Errors["COULDN'T PARSE"];

    // Meta
    manga.Image = Image.getAttribute('src') ?? ""
    manga.Type = Type.innerHTML;
    manga.Name = Name.innerText;
    manga.Description = Description.innerText;
    manga.Author = Author.innerText.trim();

    // Interactions
    let followers = Followers.innerText.replace(",", "");
        
    manga.Followers = 
      (followers === "" || followers === "N/A") ?
        0 : Number(followers)
    // Terminar
    let review = Review.innerText.replace(",", "");

    manga.Review =
        (review === "" || review === "N/A") ?
            0 : Number(review)

    let reviews = Reviews.innerText.replace(",", "");

    manga.Reviews =
        (reviews === "" || reviews === "N/A") ?
            0 : Number(reviews)

    // Tags & OnGoing
    manga.OnGoing = Cats[0].classList.contains("bk-going")
    manga.Tags = []
    Cats.forEach(($cat, i) => {
        if (i == 0) return;
        manga.Tags.push($cat.innerText.trim())
    })

    return { Manga: manga, $ };
}

export async function getEpisodes({$, id, lang}:SpecialQuery) {
    
    if (!$ && lang && id) {
        let urlNotFinal = Urls['en'];
        if (lang && Urls[lang]) urlNotFinal = Urls[lang]
        if (!id) throw Errors["REQUIRED_ARGUMENT"];
        const url = urlNotFinal + "novel/" + id;
    }
    else if (!$ && (!lang || !id))
        throw new Error(Errors["REQUIRED_ARGUMENT"]);
    const Episodes: TEpisode[] = [];;
    const Episode = $?.querySelectorAll(".chapter-item-list .chp-item")
    Episode?.forEach(($ep, i) => {
        /** @ts-ignore */
        const episode: TEpisode = {}
        
        // InnertText
        let Name = $ep.querySelector(".chapter-item-title span");
        let Id = $ep.querySelector('a');
        const Views = $ep.querySelector('.chapter-item-views span');
        const Date = $ep.querySelector('.chapter-item-time');
        
        if(!Name || !Id || !Views || !Date)
            throw Errors["COULDN'T PARSE"]
        episode.Id = Id
            .getAttribute("href")?.split("/")
            .slice(-3, -1)
            .join("/")
        ?? "";


        let views = Views.innerText.replace(",", "");
        episode.Views =
            (views === "" || views === "N/A") ?
                0 : Number(views)
        episode.Date = Date.innerText;


        Episodes.push(episode);
    })

    return Episodes
}

export async function GetManga({ lang, id }: QueryType) {
    const { $, Manga } = await getMangaInfo({ lang, id });
    const Episodes = await getEpisodes({ $ });


    return { Episodes, Manga }
}