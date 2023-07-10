import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";

export class Episode{
    #lang = Urls.en;
    /**
     * @param {import("./connectors/makeFetchHappend.js").lang} lang
     * @param {string} id
    */
    constructor(lang, id) {
        if (lang && Urls[lang]) this.#lang = Urls[lang]
        if (!id) throw Errors["REQUIRED_ARGUMENT"];
        this.url = this.#lang + "chapter/" + id;
    }

    async exec(){
        /*** @type {import("cheerio").CheerioAPI}*/
        const $ = await getResource({url: this.url, domParse: true, debug: true});
        const $Images = $("img.mangaread-manga-pic");
        
        // First Block
        const Images = [];
        $Images.each((i, image) => {
            Images.push($(image).attr("src"));
        })
        // Comprobe for more block
        const $blocks = $(".mangaread-top .mangaread-pagenav select.sl-page option");
        
        if($blocks.length == 1) return Images;

        for(let i = 1; i < $blocks.length; i++){
            const $op = $($blocks.get(i));
            Images.push(...(await this.getNextPage($op.attr("value"))));
        }

        return Images;
    }


    async getNextPage(url){
        /*** @type {import("cheerio").CheerioAPI}*/
        const $ = await getResource({url, domParse: true, debug: true});
        const $Images = $("img.mangaread-manga-pic");

        // First Block
        const Images = [];
        $Images.each((i, image) => {
            Images.push($(image).attr("src"));
        })

        return Images
    }
}