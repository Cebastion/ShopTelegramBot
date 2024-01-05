interface IGame {
    Image: string;
    Name: string;
    Tag: string[];
    Price: string;
}

interface IGames {
    games: {
        game: IGame
    }[]
}

export { IGame, IGames }