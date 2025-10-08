import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

//import router
import exerciseRouter from './routers/exerciseRouter.js';

//import middlewares
import errorNotFound from './middlewares/errors/notFound.js';
import errorsHandler from './middlewares/errors/errorsHandler.js'
import setImagePath from './middlewares/imagePath.js';

app.use(cors({ origin: 'http://localhost:5173' }));


//body parser
app.use(express.static('public'));
app.use(express.json());
app.use(setImagePath);


app.get('/', (req, res) => {
    res.send("Server root")
})

app.use('/exercise', exerciseRouter)


//middlewares
app.use(errorNotFound);
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server aperto sulla porta ${port}`)
})