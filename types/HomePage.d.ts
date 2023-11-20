import type { Section } from "./Home";
import type { QueryType } from "./query";
export declare function Home({ lang }: Omit<QueryType, "id">): Promise<Section[]>;
