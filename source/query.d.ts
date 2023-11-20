import { HTMLElement } from "node-html-parser";

export type lang = "en" | "es" | "br" | "it" | "ru" | "de";
export type QueryType = { lang: lang, id: string }
export type PageQuery = { $: HTMLElement}
export type SpecialQuery = Partial<QueryType & PageQuery>;

