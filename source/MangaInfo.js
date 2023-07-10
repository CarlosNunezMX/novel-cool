import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";

export class Manga {
    #lang = Urls.en;
    /**
     * @param {import("./connectors/makeFetchHappend.js").lang} lang
     * @param {string} id
    */
    constructor(lang, id) {
        if (lang && Urls[lang]) this.#lang = Urls[lang]
        if (!id) throw Errors["REQUIRED_ARGUMENT"];
        this.url = this.#lang + "novel/" + id;
    }
    /** @type {import("cheerio").CheerioAPI} */
    $;
    async exec() {
        /**
        * @type {import("cheerio").CheerioAPI}
        */
        this.$ = await getResource({ url: this.url, domParse: true });
        const Manga = this.getMangaInfo();
        const Episodes = this.getEpisodes();

        return {Episodes, Manga};
    }

    getMangaInfo(){
        const $ = this.$;
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
        manga.Followers = $Info.find(".bk-data .bk-data-val").first().text()
        
        manga.Review = $Info.find(".bk-data .bk-data-val").get(1)
        manga.Review = $(manga.Review).text()
        
        manga.Reviews = $Info.find(".bk-data .bk-data-val").get(2)
        manga.Reviews = $(manga.Reviews).text()
        
        // Tags & OnGoing
        const _cat = $Info.find(".bookinfo-category-list .bk-cate-item");
        manga.OnGoing = _cat.first().hasClass("bk-going")
        manga.Tags = []
        _cat.each((i, cat) => {
            if(i == 0) return;
            manga.Tags.push($(cat).text().trim())
        })

        return manga;
    }

    getEpisodes(){
        if(!this.$) throw Errors["REQUEST_NOT_LAUNCHED"];
        /*** @type {import("./index.js").Episode[]}*/
        const Episodes = [];
        const Episode = this.$(".chapter-item-list .chp-item")
        Episode.each((i, ep) => {
            /**@type {import("./index.js").Episode} */
            const episode = {}
            const $ep = this.$(ep);
            episode.Name = $ep.find(".chapter-item-title span").text();
            
            episode.Id = $ep.find("a")
                            .first()
                            .attr("href")
                            .split("/")
                            .slice(-3, -1)
                            .join("/");

            
            episode.Views = $ep.find(".chapter-item-views span").text();
            
            episode.Date = $ep.find(".chapter-item-time").text()


            Episodes.push(episode);
        })

        return Episodes
    }
}