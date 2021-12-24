import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSetMatches } from "../factories/set-matches/set-matches";

export default (router: Router): void => {
    router.post('/matches', adaptRoute(makeSetMatches()));
};