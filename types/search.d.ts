import type { QueryType } from "./query";
import type { SearchResult } from "./Home";
export declare function Search({ lang, id }: QueryType): Promise<SearchResult[]>;
