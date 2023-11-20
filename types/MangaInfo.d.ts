import type { HTMLElement } from "node-html-parser";
import type { QueryType, SpecialQuery } from "./query";
import type { TEpisode, TManga } from "./manga";
export declare function getMangaInfo({ lang, id }: QueryType): Promise<{
    Manga: TManga;
    $: HTMLElement;
}>;
export declare function getEpisodes({ $, id, lang }: SpecialQuery): Promise<TEpisode[]>;
export declare function GetManga({ lang, id }: QueryType): Promise<{
    Episodes: TEpisode[];
    Manga: TManga;
}>;
