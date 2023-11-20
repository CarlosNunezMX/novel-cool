"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = exports.Episode = exports.Manga = exports.Search = void 0;
var search_js_1 = require("./search.js");
Object.defineProperty(exports, "Search", { enumerable: true, get: function () { return search_js_1.Search; } });
exports.Manga = __importStar(require("./MangaInfo.js"));
var GetEpisode_js_1 = require("./GetEpisode.js");
Object.defineProperty(exports, "Episode", { enumerable: true, get: function () { return GetEpisode_js_1.Episode; } });
var HomePage_js_1 = require("./HomePage.js");
Object.defineProperty(exports, "Home", { enumerable: true, get: function () { return HomePage_js_1.Home; } });
