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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserService = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ParserService {
    URL_WEBSITE = 'https://www.gog.com/en/games';
    max_count_product = 12;
    regex = /([^\s,]+)/;
    game_list = {
        games: [],
    };
    async GetGenreGame(url) {
        if (url) {
            const response = await axios_1.default.get(url);
            if (response.status === 200) {
                const $ = cheerio.load(response.data);
                const genres = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text().trim()).get();
                const filteredGenres = genres.filter(genre => ['Action', 'Adventure', 'Racing', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy'].includes(genre));
                return filteredGenres;
            }
        }
        return [];
    }
    async WriteGamesJson(games) {
        const directory = path_1.default.resolve(__dirname, 'json');
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory);
        }
        const gamesJson = JSON.stringify(games);
        fs_1.default.writeFileSync(directory + '/games.json', gamesJson);
    }
    async GetGames(page) {
        const html = await axios_1.default.get(this.URL_WEBSITE + `?page=${page}`);
        if (html.status !== 200) {
            throw Error('not found site');
        }
        const $ = cheerio.load(html.data);
        const max_count_page = $('#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > div > small-pagination > div > button:nth-child(4) > span').text();
        if (page > parseInt(max_count_page)) {
            throw Error('not found page');
        }
        const promises = [];
        for (let count_product = 1; count_product <= this.max_count_product; count_product++) {
            const card_product = `#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`;
            const link_page_product = $(`${card_product}`).attr('href');
            if (!link_page_product) {
                continue;
            }
            const promise = (async () => {
                const name_product = $(`${card_product} > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text();
                const price_product = $(`${card_product} > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text().replace(/\$/, '');
                const image_product = $(`${card_product} > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset');
                const url_image_product = image_product?.match(this.regex)?.[1].replace(/\.webp$/, '.png');
                const tags = await this.GetGenreGame(link_page_product);
                const game = {
                    Image: url_image_product || '',
                    Name: name_product,
                    Tag: tags,
                    Price: price_product,
                };
                this.game_list.games.push({ game });
            })();
            promises.push(promise);
        }
        await Promise.all(promises);
        return this.game_list;
    }
}
exports.ParserService = ParserService;
