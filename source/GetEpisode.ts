import Errors from "./connectors/Errors.js";
import { Urls, getResource } from "./connectors/makeFetchHappend.js";
import type { QueryType } from "./query";

export async function Episode({ lang, id }: QueryType) {
    let urlNotFinal = Urls['en'];
    if (lang && Urls[lang]) urlNotFinal = Urls[lang]
    if (!id) throw Errors["REQUIRED_ARGUMENT"];
    const url = urlNotFinal + "chapter/" + id;

    const $ = await getResource({ url, domParse: true });
    const $Images = $.querySelectorAll("img.mangaread-manga-pic");

    // First Block
    const Images: string[] = [];
    $Images.forEach(($image) => {
        Images.push($image.getAttribute('src') ?? "");
    })
    // Comprobe for more block
    const $blocks = $.querySelectorAll(".mangaread-top .mangaread-pagenav select.sl-page option");

    if ($blocks.length == 1) return Images;

    $blocks.forEach(async $block => {
        const nextURL = $block.getAttribute('value');
        if(!nextURL)
            throw Errors["COULDN'T PARSE"];
        Images.push(...(await getNextPage(nextURL)))
    })
    return Images;
}
async function getNextPage(url: string) {
    const $ = await getResource({ url, domParse: true });
    const $Images = $.querySelectorAll("img.mangaread-manga-pic");

    // First Block
    const Images: string[] = [];
    $Images.forEach(($image) => {
        Images.push($image.getAttribute("src") ?? "");
    })

    return Images
}