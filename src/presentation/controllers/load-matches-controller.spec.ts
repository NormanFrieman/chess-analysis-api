import { IHttpRequest } from "../protocols"
import { LoadMatchesController } from "./load-matches-controller"

const makeFakeInput = (): IHttpRequest => {
    return {
        body: {
            username: 'any username',
            mounth: 12
        }
    };
};

const makeSut = (): SutTypes => {
    return {
        sut: new LoadMatchesController()
    }
}

interface SutTypes {
    sut: LoadMatchesController
}

describe('LoadMatchesController Tests', () => {
    test('Should return null', async () => {
        const { sut } = makeSut();

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toBe(null);
    })
})
