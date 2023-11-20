"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Urls = exports.getResource = void 0;
const Errors_js_1 = __importDefault(require("./Errors.js"));
const he_1 = require("he");
const node_html_parser_1 = require("node-html-parser");
const Headers = {
    "Cookie": "novelcool_webp_valid=true;protocol_cookie_is_show=1; novelcool_list_num=10",
    "User-Agent": "@carlosnunezmx/novel-cool Web Scrapper"
};
async function getResource({ domParse, url, debug }) {
    const request = await fetch(url, { headers: Headers });
    if (debug)
        console.log(url);
    if (!request.ok)
        throw { cause: Errors_js_1.default["NETWORK_ERROR"] };
    const response_text = await request.text();
    if (!domParse)
        return response_text;
    if (!(0, node_html_parser_1.valid)(response_text))
        throw Errors_js_1.default["COULDN'T PARSE"];
    return (0, node_html_parser_1.parse)((0, he_1.decode)(response_text));
}
exports.getResource = getResource;
exports.Urls = {
    en: "https://www.novelcool.com/",
    es: "https://es.novelcool.com/",
    br: "https://br.novelcool.com/",
    it: "https://it.novelcool.com/",
    ru: "https://ru.novelcool.com/",
    de: "https://de.novelcool.com/"
};
