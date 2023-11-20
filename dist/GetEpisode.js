"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
const Errors_js_1 = __importDefault(require("./connectors/Errors.js"));
const makeFetchHappend_js_1 = require("./connectors/makeFetchHappend.js");
async function Episode({ lang, id }) {
    let urlNotFinal = makeFetchHappend_js_1.Urls['en'];
    if (lang && makeFetchHappend_js_1.Urls[lang])
        urlNotFinal = makeFetchHappend_js_1.Urls[lang];
    if (!id)
        throw Errors_js_1.default["REQUIRED_ARGUMENT"];
    const url = urlNotFinal + "chapter/" + id;
    const $ = await (0, makeFetchHappend_js_1.getResource)({ url, domParse: true });
    const $Images = $.querySelectorAll("img.mangaread-manga-pic");
    // First Block
    const Images = [];
    $Images.forEach(($image) => {
        Images.push($image.getAttribute('src') ?? "");
    });
    // Comprobe for more block
    const $blocks = $.querySelectorAll(".mangaread-top .mangaread-pagenav select.sl-page option");
    if ($blocks.length == 1)
        return Images;
    $blocks.forEach(async ($block) => {
        const nextURL = $block.getAttribute('value');
        if (!nextURL)
            throw Errors_js_1.default["COULDN'T PARSE"];
        Images.push(...(await getNextPage(nextURL)));
    });
    return Images;
}
exports.Episode = Episode;
async function getNextPage(url) {
    const $ = await (0, makeFetchHappend_js_1.getResource)({ url, domParse: true });
    const $Images = $.querySelectorAll("img.mangaread-manga-pic");
    // First Block
    const Images = [];
    $Images.forEach(($image) => {
        Images.push($image.getAttribute("src") ?? "");
    });
    return Images;
}
