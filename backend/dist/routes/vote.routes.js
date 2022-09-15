"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vote_controller_1 = require("../controllers/vote.controller");
const voteRouter = express_1.default.Router();
voteRouter.route('/getAllVotes').get((req, res) => new vote_controller_1.VoteController().getAllVotes(req, res));
voteRouter.route('/addComment').post((req, res) => new vote_controller_1.VoteController().addComment(req, res));
voteRouter.route('/hasUserCommented').post((req, res) => new vote_controller_1.VoteController().hasUserCommented(req, res));
voteRouter.route('/updateComment').post((req, res) => new vote_controller_1.VoteController().updateComment(req, res));
voteRouter.route('/deleteAllVotesFromUser').post((req, res) => new vote_controller_1.VoteController().deleteAllVotesFromUser(req, res));
voteRouter.route('/deleteAllVotesForBook').post((req, res) => new vote_controller_1.VoteController().deleteAllVotesForBook(req, res));
exports.default = voteRouter;
//# sourceMappingURL=vote.routes.js.map