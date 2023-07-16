import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";

export async function getMangaInfo({ lang, id }) {
    if (lang && Urls[lang]) lang = Urls[lang]
    if (!id) throw Errors["REQUIRED_ARGUMENT"];
    const url = lang + "novel/" + id;

    const $ = await getResource({ url, domParse: true });
    const $Info = $(".bookinfo-module").first();
    /**
     * @type {import("./index.js").TManga}
     */
    let manga = {};

    // Meta
    manga.Image = $Info.find(".bookinfo-module img").attr("src")
    manga.Type = $Info.find(".book-type").first().text();
    manga.Name = $Info.find(".bookinfo-title").first().text()
    manga.Description = $Info.find(".bk-summary-txt").first().text();
    manga.Author = $Info.find(".bookinfo-author a").first().text().trim()

    // Interactions
    manga.Followers = $Info.find(".bk-data .bk-data-val")
        .first()
        .text()
        .replace(",", "");
        
    manga.Followers = 
      (manga.Followers === "" || manga.Followers === "N/A") ?
        0 : Number(manga.Followers)
    manga.Review = $Info.find(".bk-data .bk-data-val").get(1)
    manga.Review = $(manga.Review)
        .text()
        .replace(",", "");

    manga.Review =
        (manga.Review === "" || manga.Review === "N/A") ?
            0 : Number(manga.Review)

    manga.Reviews = $Info.find(".bk-data .bk-data-val").get(2)
    manga.Reviews = $(manga.Reviews)
        .text()
        .replace(",", "");

    manga.Reviews =
        (manga.Reviews === "" || manga.Reviews === "N/A") ?
            0 : Number(manga.Reviews)

    // Tags & OnGoing
    const _cat = $Info.find(".bookinfo-category-list .bk-cate-item");
    manga.OnGoing = _cat.first().hasClass("bk-going")
    manga.Tags = []
    _cat.each((i, cat) => {
        if (i == 0) return;
        manga.Tags.push($(cat).text().trim())
    })

    return { Manga: manga, $ };
}

export async function getEpisodes({ $, lang, id }) {
    if (!$ && lang && id) {
        if (lang && Urls[lang]) lang = Urls[lang]
        if (!id) throw Errors["REQUIRED_ARGUMENT"];
        const url = lang + "novel/" + id;
        const $ = await getResource({ url, domParse: true });
    }
    else if (!$ && (!lang || !id))
        throw new Error(Errors["REQUIRED_ARGUMENT"]);
    /*** @type {import("./index.js").TEpisode[]}*/
    const Episodes = [];
    const Episode = $(".chapter-item-list .chp-item")
    Episode.each((i, ep) => {
        /**@type {import("./index.js").Episode} */
        const episode = {}
        const $ep = $(ep);
        episode.Name = $ep.find(".chapter-item-title span").text();

        episode.Id = $ep.find("a")
            .first()
            .attr("href")
            .split("/")
            .slice(-3, -1)
            .join("/");


        episode.Views = $ep.find(".chapter-item-views span")
            .text()
            .replace(",", "");
        episode.Views =
            (episode.Views === "" || episode.Views === "N/A") ?
                0 : Number(episode.Views)
        episode.Date = $ep.find(".chapter-item-time").text()


        Episodes.push(episode);
    })

    return Episodes
}

export async function getBoth({ lang, id }) {
    const { $, Manga } = await getMangaInfo({ lang, id });
    const Episodes = await getEpisodes({ $ });


    return { Episodes, Manga }
}