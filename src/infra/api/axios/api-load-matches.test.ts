import { IUserInfoModel } from "../../../domain/models/userinfo"
import { ApiLoadMatches } from "./api-load-matches"

const makeInput = (): IUserInfoModel => {
    return {
        username: 'NormanFrieman',
        mounth: 11,
        year: 2021
    }
}

const makeSut = (): SutTypes => {
    return {
        sut: new ApiLoadMatches()
    }
}

interface SutTypes {
    sut: ApiLoadMatches
}

describe('ApiLoadMatches Test', () => {
    test('Should return games with correct values', async () => {
        const { sut } = makeSut();

        const input = makeInput();

        const res = await sut.load(input);

        expect(res).not.toBeNull();
    })
})