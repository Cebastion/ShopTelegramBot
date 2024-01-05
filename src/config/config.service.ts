import { IConfigService } from './config.interface'
import { config , DotenvParseOutput } from 'dotenv'

export class ConfigService implements IConfigService{
  private config: DotenvParseOutput

  constructor() {
    const { error, parsed } = config()

    if(error) {
      throw new Error("don't found .env")
    }
    if(!parsed){
      throw new Error("empty .env")
    }
    this.config = parsed
  }

  get(key: string): string {
    const res = this.config[key]
    if(!res){
      throw new Error("don't found key")
    }
    return res
  }
}