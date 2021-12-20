import { ERules, ETimeClass } from "../domain/models/games";
import { generateGames } from "./generate-games";

const makeFakeInput = (): any => {
    return {
        games: [
            {
                uuid: 'any uuid',
                pgn: 'any pgn',
                time_class: 'blitz',
                rules: 'chess',
                rated: true,
                url: 'https://www.anyurl.com/',
                any_prop: 'any prop',
                another_prop: 'another prop'
            },
            {
                uuid: 'any uuid 2',
                pgn: 'any pgn 2',
                time_class: 'rapid',
                rules: 'chess',
                rated: true,
                url: 'https://www.anyurl.com/',
                any_prop: 'any prop',
                another_prop: 'another prop'
            }
        ]
    }
}

describe('generateGames test', () => {
    test('Should return a array of games if sucess', () => {
        const input = makeFakeInput();

        const res = generateGames(input);

        expect(res).toEqual({
            games: [
                {
                    uuid: 'any uuid',
                    pgn: 'any pgn',
                    time_class: ETimeClass.blitz,
                    rules: ERules.chess,
                    rated: true,
                    url: new URL('https://www.anyurl.com')
                },
                {
                    uuid: 'any uuid 2',
                    pgn: 'any pgn 2',
                    time_class: ETimeClass.rapid,
                    rules: ERules.chess,
                    rated: true,
                    url: new URL('https://www.anyurl.com')
                }
            ]
        })
    })
})