# NovelCool Scrapper 📖
Dependecy-Lowest NovelCool scrapper for nodejs, just using `node-html-parser` for DOM parsing
using ES6 for Classes and Modules

## Now in npm 🥳
Install this module with
```bash
# npm
npm i novel-cool

#pnpm
pnpm add novel-cool
```

## RoadMap
This is our RoadMap ⏲️

- [x] Select Languaje
- [x] Search
- [x] Get Manga Info
- [x] Get Episode Images
- [x] View home page manga (Working in it)

## Using
Just import from the module and instance it, then run exec method

### Home Page
```js
import {Home} from "novel-cool";
const Books = await Home({lang: "es"})
console.log(Books);
/***
 {
  Title: 'Popular',
  Books: [
    {
      Id: 'Guia-De-La-Reencarnaci-n',
      Name: 'Guia De La Reencarnación',
      Views: 5630,
      Description: 'Información no completada',
      Review: 4.7,
      Image: 'https://img.novelcool.com/logo/202302/8c/Guia_De_La_Reencarnaci_n3429.jpg'
    },
  ]
 }
*/
```

### Manga
There has three methods
```js
import {Manga} from "novel-cool";
// getMangaInfo -> Just Get Manga Metadata
const Manga_info_results = await Manga.getMangaInfo({
  lang: "es",
  id: "Yumemiru-Danshi-Wa-Genjitsushugisha"
})
console.log(Manga_info_results)
/***
 {
    Image: 'https://img.novelcool.com/logo/202104/92/Yumemiru_Danshi_Wa_Genjitsushugisha7510.jpg',
    Type: 'Manga',
    Name: 'Yumemiru Danshi Wa Genjitsushugisha',
    Description: '***',
    Author: '',
    Followers: 643,
    Review: 4.8,
    Reviews: 0,
    OnGoing: true,
    Tags: [...] (string)
  }
**/
// getEpisodes -> Just get episodes from id
const Manga_episode_results = await Manga.getEpisodes({
  lang: "es",
  id: "Yumemiru-Danshi-Wa-Genjitsushugisha"
})

console.log(Manga_episode_results)
/**
 [
    {
      Name: ' Capítulo 27.10Nuevo',
      Id: 'Cap-tulo-27-10/11024482',
      Views: 199,
      Date: 'Jul 10, 2023'
  ]
**/
```
`Manga.getBoth` returns the same but in one request

### Search
```js
import {Search} from "novel-cool";
const results = await Search({
  lang: "es",
  id: "yumemiru danshi"
});

console.log(results);

/**
[
  {
    Image: 'https://img.novelcool.com/logo/202104/92/Yumemiru_Danshi_Wa_Genjitsushugisha7510.jpg',
    Name: 'Yumemiru Danshi Wa Genjitsushugisha',
    Review: '4.8',
    Date: 'Jul 01, 2023',
    Views: '0',
    Type: 'Manga',
    Tags: [ 'Comedia', 'Drama' ],
    ID: 'Yumemiru-Danshi-Wa-Genjitsushugisha'
  }
]
**/
```

### Episode
Give full episode resources
```js
import {Episode} from "novel-cool"
const results = await Episode({
  lang: "es",
  id: "Cap-tulo-27/11024480"
})

console.log(results) // string[] -> Just a string array 😄
```

## Note ⚠️
For use this module is needed set `"type": "module"` -> on your `package.json`
Please if you find a issue please 🙏 report it into GitHub [`CarlosNunezMX/novel-cool`](https://www.github.com/CarlosNunezMX/novel-cool)

Made with ❤️ from 🇲🇽 by CarlosNunexMX