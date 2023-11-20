import Errors from "./Errors.js"
import {decode} from "he"
import {valid, parse, HTMLElement} from "node-html-parser"

const Headers = {
  "Cookie": "novelcool_webp_valid=true;protocol_cookie_is_show=1; novelcool_list_num=10",
  "User-Agent": "@carlosnunezmx/novel-cool Web Scrapper"
};

export type RequestQuery = {
  url: string;
  domParse?: boolean;
  debug?: boolean;
}

export async function getResource(req: {domParse: true, url: string, debug?: boolean}): Promise<HTMLElement>;
export async function getResource(req: {domParse: false, url: string, debug?: boolean}): Promise<string>;
export async function getResource({domParse, url, debug}: RequestQuery): Promise<string | HTMLElement>{
  const request = await fetch(url, {headers: Headers});
  if(debug) console.log(url)
  if(!request.ok) throw {cause: Errors["NETWORK_ERROR"]};
  const response_text = await request.text();

  if(!domParse) return response_text;

  if(!valid(response_text))
    throw Errors["COULDN'T PARSE"];
  
  return parse(decode(response_text))
}


export const Urls = {
  en: "https://www.novelcool.com/",
  es: "https://es.novelcool.com/",
  br: "https://br.novelcool.com/",
  it: "https://it.novelcool.com/",
  ru: "https://ru.novelcool.com/",
  de: "https://de.novelcool.com/"
}
