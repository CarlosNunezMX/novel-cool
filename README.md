# NovelCool Scrapper 📖
Dependecy-Lowest NovelCool scrapper for nodejs, just using `cheerio` for DOM parsing
using ES6 for Classes and Modules

## RoadMap
This is our RoadMap ⏲️
[x] Select Languaje
[x] Search
[x] Get Manga Info
[x] Get Episode Images
[] View home page manga 

## Using
Just import from the module and instance it, then run exec method

```js
import {Search} from "novel-cool";
const userSearch = new Search("es", "yumemiru danshi");
const results = await exec();

console.log(results);

/**
[
  {
    bookImage: 'https://img.novelcool.com/logo/202104/92/Yumemiru_Danshi_Wa_Genjitsushugisha7510.jpg',
    bookName: 'Yumemiru Danshi Wa Genjitsushugisha',
    bookReview: '4.8',
    bookDate: 'Jul 01, 2023',
    bookViews: '0',
    bookType: 'Manga',
    bookTags: [ 'Comedia', 'Drama' ],
    bookID: 'Yumemiru-Danshi-Wa-Genjitsushugisha'
  }
]
**/
```

## Note ⚠️
For use this module is needed set `"type": "module"` -> on your `package.json`

Made with ❤️ from 🇲🇽 by CarlosNunexMX