"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const rental_routes_1 = __importDefault(require("./routes/rental.routes"));
const vote_routes_1 = __importDefault(require("./routes/vote.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
mongoose_1.default.connect('mongodb://localhost:27017/library');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/books', book_routes_1.default);
router.use('/rentals', rental_routes_1.default);
router.use('/votes', vote_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map