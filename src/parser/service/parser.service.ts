import axios from 'axios'
import * as cheerio from 'cheerio'
import { IGame, IGames } from "../interface/game.interface"
import fs from "fs"
import path from "path";

class ParserService {
  private URL_WEBSITE = 'https://www.gog.com/en/games';
  private max_count_product = 12;
  private regex = /([^\s,]+)/;
  private game_list: IGames = {
    games: [],
  };


  private async GetGenreGame(url: string): Promise<string[]> {
    if (url) {
      const response = await axios.get(url)
      if (response.status === 200) {
        const $ = cheerio.load(response.data)
        const genres = $(`div.details__content.table__row-content a`).map((index, element) => $(element).text().trim()).get()
        const filteredGenres = genres.filter(genre => ['Action', 'Adventure', 'Racing', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy'].includes(genre))
        return filteredGenres
      }
    }
    return []
  }

  private async WriteGamesJson(games: IGames): Promise<void> {
    const directory = path.resolve(__dirname, 'json')
    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory)
    }
    const gamesJson = JSON.stringify(games)
    fs.writeFileSync(directory + '/games.json', gamesJson)
  }

  public async GetGames(page: number) {

    const html = await axios.get(this.URL_WEBSITE + `?page=${page}`)

    if (html.status !== 200) {
      throw Error('not found site')
    }

    const $ = cheerio.load(html.data)

    const max_count_page = $('#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > div > small-pagination > div > button:nth-child(4) > span').text()

    if (page > parseInt(max_count_page)) {
      throw Error('not found page')
    }
    const promises: Promise<void>[] = []

    for (let count_product = 1; count_product <= this.max_count_product; count_product++) {
      const card_product = `#Catalog > div > div.catalog__display-wrapper.catalog__grid-wrapper > paginated-products-grid > div > product-tile:nth-child(${count_product}) > a`
      const link_page_product = $(`${card_product}`).attr('href')

      if (!link_page_product) {
        continue
      }

      const promise = (async () => {
        const name_product = $(`${card_product} > div.product-tile__info > div.product-tile__title.ng-star-inserted > product-title > span`).text()
        const price_product = $(`${card_product} > div.product-tile__info > div.product-tile__footer > div > product-price > price-value > span.final-value.ng-star-inserted`).text().replace(/\$/, '')
        const image_product = $(`${card_product} > div.product-tile__image-wrapper > store-picture > picture > source:nth-child(1)`).attr('srcset')
        const url_image_product = image_product?.match(this.regex)?.[1].replace(/\.webp$/, '.png')
        const tags = await this.GetGenreGame(link_page_product)
        const game: IGame = {
          Image: url_image_product || '',
          Name: name_product,
          Tag: tags,
          Price: price_product,
        }
        this.game_list.games.push({ game })
      })()

      promises.push(promise)
    }
    await Promise.all(promises)

    return this.game_list
  }
}

export { ParserService }