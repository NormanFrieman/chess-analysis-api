import { LoadMatches } from "../../../data/usecases/load-matches";
import { DbSetMatches } from "../../../data/usecases/db-set-matches";
import { ApiLoadMatches } from "../../../infra/api/axios/api-load-matches";
import { SetMatchesRepository } from "../../../infra/db/mongodb/set-matches-repository"
import { SetMatchesController } from "../../../presentation/controllers/set-matches-controller";
import { makeSetMatchesValidation } from "./set-matches-validations";
import { IController } from "../../../presentation/protocols";

export const makeSetMatches = (): IController => {
    const validation = makeSetMatchesValidation();

    const apiLoadMatches = new ApiLoadMatches();
    const loadMatches = new LoadMatches(apiLoadMatches);

    const setMatchesRepository = new SetMatchesRepository('Loaded_Matches');
    const dbSetMatches = new DbSetMatches(setMatchesRepository);


    const setMatchesController = new SetMatchesController(validation, loadMatches, dbSetMatches);
    return setMatchesController;
}