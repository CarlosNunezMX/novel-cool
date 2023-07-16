import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";

export async function Episode({ lang, id }) {
    if (lang && Urls[lang]) lang = Urls[lang];
    if (!id) throw Errors["REQUIRED_ARGUMENT"];
    const url = lang + "chapter/" + id;

    /*** @type {import("cheerio").CheerioAPI}*/
    const $ = await getResource({ url, domParse: true });
    const $Images = $("img.mangaread-manga-pic");

    // First Block
    const Images = [];
    $Images.each((i, image) => {
        Images.push($(image).attr("src"));
    })
    // Comprobe for more block
    const $blocks = $(".mangaread-top .mangaread-pagenav select.sl-page option");

    if ($blocks.length == 1) return Images;

    for (let i = 1; i < $blocks.length; i++) {
        const $op = $($blocks.get(i));
        Images.push(...(await getNextPage($op.attr("value"))));
    }

    return Images;
}
async function getNextPage(url) {
    /*** @type {import("cheerio").CheerioAPI}*/
    const $ = await getResource({ url, domParse: true });
    const $Images = $("img.mangaread-manga-pic");

    // First Block
    const Images = [];
    $Images.each((i, image) => {
        Images.push($(image).attr("src"));
    })

    return Images
}