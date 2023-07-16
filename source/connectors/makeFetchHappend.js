import {load} from "cheerio";
import Errors from "./Errors.js"

const Headers = {
  "Cookie": "novelcool_webp_valid=true;protocol_cookie_is_show=1; novelcool_list_num=10",
  "User-Agent": "@carlosnunezmx/novel-cool Web Scrapper"
};

/**
 * @returns {import("cheerio").CheerioAPI}
 */
export async function getResource({url, domParse, debug}){
  const request = await fetch(url, {headers: Headers});
  if(debug) console.log(url)
  if(!request.ok) throw {cause: Errors["NETWORK_ERROR"]};
  const response_text = await request.text();

  if(!domParse) return response_text;

  return load(response_text)
}


export const Urls = {
  en: "https://www.novelcool.com/",
  es: "https://es.novelcool.com/",
  br: "https://br.novelcool.com/",
  it: "https://it.novelcool.com/",
  ru: "https://ru.novelcool.com/",
  de: "https://de.novelcool.com/"
}
