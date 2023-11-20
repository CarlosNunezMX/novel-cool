import { HTMLElement } from "node-html-parser";
export type RequestQuery = {
    url: string;
    domParse?: boolean;
    debug?: boolean;
};
export declare function getResource(req: {
    domParse: true;
    url: string;
    debug?: boolean;
}): Promise<HTMLElement>;
export declare function getResource(req: {
    domParse: false;
    url: string;
    debug?: boolean;
}): Promise<string>;
export declare const Urls: {
    en: string;
    es: string;
    br: string;
    it: string;
    ru: string;
    de: string;
};
