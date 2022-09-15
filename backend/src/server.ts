import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.routes';
import bookRouter from './routes/book.routes';
import rentalRouter from './routes/rental.routes';
import voteRouter from './routes/vote.routes';

const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}))


mongoose.connect('mongodb://localhost:27017/library')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/rentals', rentalRouter)
router.use('/votes', voteRouter)


app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));