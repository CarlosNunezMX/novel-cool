import {load} from "cheerio";
import Errors from "./Errors.js"

const Headers = {
  "Cookie": "novelcool_webp_valid=true;protocol_cookie_is_show=1; novelcool_list_num=10",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0"
}
export async function getResource({url, domParse, debug}){
  const request = await fetch(url, {headers: Headers});
  if(debug) console.log(url)
  if(!request.ok) throw {cause: Errors["NETWORK_ERROR"]};
  const response_text = await request.text();

  if(!domParse) return response_text;

  return load(response_text)
}

/***
* @typedef {"en" | "es" | "br" | "it" | "ru" | "de"} lang
**/

export const Urls = {
  en: "https://www.novelcool.com/",
  es: "https://es.novelcool.com/",
  br: "https://br.novelcool.com/",
  it: "https://it.novelcool.com/",
  ru: "https://br.novelcool.com/",
  de: "https://de.novelcool.com/"
}
