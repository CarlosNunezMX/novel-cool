"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManga = exports.getEpisodes = exports.getMangaInfo = void 0;
const Errors_js_1 = __importDefault(require("./connectors/Errors.js"));
const makeFetchHappend_js_1 = require("./connectors/makeFetchHappend.js");
async function getMangaInfo({ lang, id }) {
    let urlNotFinal = makeFetchHappend_js_1.Urls['en'];
    if (lang && makeFetchHappend_js_1.Urls[lang])
        urlNotFinal = makeFetchHappend_js_1.Urls[lang];
    if (!id)
        throw Errors_js_1.default["REQUIRED_ARGUMENT"];
    const url = urlNotFinal + "novel/" + id;
    const $ = await (0, makeFetchHappend_js_1.getResource)({ url, domParse: true });
    const $Info = $.querySelector(".bookinfo-module");
    if (!$Info)
        throw Errors_js_1.default["COULDN'T PARSE"];
    // @ts-ignore
    let manga = {};
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
    if (!Image || !Type || !Name || !Description || !Author || !Followers || !Reviews || !Cats)
        throw Errors_js_1.default["COULDN'T PARSE"];
    // Meta
    manga.Image = Image.getAttribute('src') ?? "";
    manga.Type = Type.innerHTML;
    manga.Name = Name.innerText;
    manga.Description = Description.innerText;
    manga.Author = Author.innerText.trim();
    // Interactions
    let followers = Followers.innerText.replace(",", "");
    manga.Followers =
        (followers === "" || followers === "N/A") ?
            0 : Number(followers);
    // Terminar
    let review = Review.innerText.replace(",", "");
    manga.Review =
        (review === "" || review === "N/A") ?
            0 : Number(review);
    let reviews = Reviews.innerText.replace(",", "");
    manga.Reviews =
        (reviews === "" || reviews === "N/A") ?
            0 : Number(reviews);
    // Tags & OnGoing
    manga.OnGoing = Cats[0].classList.contains("bk-going");
    manga.Tags = [];
    Cats.forEach(($cat, i) => {
        if (i == 0)
            return;
        manga.Tags.push($cat.innerText.trim());
    });
    return { Manga: manga, $ };
}
exports.getMangaInfo = getMangaInfo;
async function getEpisodes({ $, id, lang }) {
    if (!$ && lang && id) {
        let urlNotFinal = makeFetchHappend_js_1.Urls['en'];
        if (lang && makeFetchHappend_js_1.Urls[lang])
            urlNotFinal = makeFetchHappend_js_1.Urls[lang];
        if (!id)
            throw Errors_js_1.default["REQUIRED_ARGUMENT"];
        const url = urlNotFinal + "novel/" + id;
    }
    else if (!$ && (!lang || !id))
        throw new Error(Errors_js_1.default["REQUIRED_ARGUMENT"]);
    const Episodes = [];
    ;
    const Episode = $?.querySelectorAll(".chapter-item-list .chp-item");
    Episode?.forEach(($ep, i) => {
        /** @ts-ignore */
        const episode = {};
        // InnertText
        let Name = $ep.querySelector(".chapter-item-title span");
        let Id = $ep.querySelector('a');
        const Views = $ep.querySelector('.chapter-item-views span');
        const Date = $ep.querySelector('.chapter-item-time');
        if (!Name || !Id || !Views || !Date)
            throw Errors_js_1.default["COULDN'T PARSE"];
        episode.Id = Id
            .getAttribute("href")?.split("/")
            .slice(-3, -1)
            .join("/")
            ?? "";
        let views = Views.innerText.replace(",", "");
        episode.Views =
            (views === "" || views === "N/A") ?
                0 : Number(views);
        episode.Date = Date.innerText;
        Episodes.push(episode);
    });
    return Episodes;
}
exports.getEpisodes = getEpisodes;
async function GetManga({ lang, id }) {
    const { $, Manga } = await getMangaInfo({ lang, id });
    const Episodes = await getEpisodes({ $ });
    return { Episodes, Manga };
}
exports.GetManga = GetManga;
