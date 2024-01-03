import dotenv from "dotenv"
import path from "path"
import { Config } from '../interface/config.interface'
import { ENV } from '../interface/env.interface'

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") })

function GetConfig(): ENV {
  return {
    TOKEN: process.env.TOKEN,
    URL_WEBSITE: process.env.URL_WEBSITE
  }
}

function getSanitzedConfig(config: ENV): Config {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`)
    }
  }
  return config as Config
}

const config = GetConfig()

const sanitizedConfig  = getSanitzedConfig(config)

export default sanitizedConfig