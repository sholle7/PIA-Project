import express from 'express'
import { VoteController } from '../controllers/vote.controller';

const voteRouter = express.Router();

voteRouter.route('/getAllVotes').get(
    (req, res)=>new VoteController().getAllVotes(req, res)
)

voteRouter.route('/addComment').post(
    (req, res)=>new VoteController().addComment(req, res)
)
voteRouter.route('/hasUserCommented').post(
    (req, res)=>new VoteController().hasUserCommented(req, res)
)

voteRouter.route('/updateComment').post(
    (req, res)=>new VoteController().updateComment(req, res)
)

voteRouter.route('/deleteAllVotesFromUser').post(
    (req, res)=>new VoteController().deleteAllVotesFromUser(req, res)
)

voteRouter.route('/deleteAllVotesForBook').post(
    (req, res)=>new VoteController().deleteAllVotesForBook(req, res)
)



export default voteRouter;