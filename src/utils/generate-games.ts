import { ERules, ETimeClass, IGames } from "../domain/models/games";

export const generateGames = (data: any): IGames => {
    const matches = [];
    data.games.forEach(game => {
        matches[matches.length] = {
            uuid: game.uuid,
            pgn: game.pgn,
            time_class: ETimeClass[game.time_class],
            rules: ERules[game.rules],
            rated: game.rated,
            url: new URL(game.url)
        };
    })

    return {
        games: matches
    };
}