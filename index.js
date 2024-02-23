import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

const data = [
    {id: 1,name: 'Vatsal'},
    {id: 2,name: 'Shardul'}
]

app.get('/data', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})