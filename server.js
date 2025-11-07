const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors');
const { tests } = require('./data.js')

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.json({ limit: '1gb' }))
app.use(express.urlencoded({ extended: true, limit: '1gb' }))
app.use(
    cors({
      origin: '*',
    })
);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/quiz', (req, res) => {
    res.render('quiz')
})

app.post('/send-data', (req, res) => {
  const { start, end, shuffle, quantity } = req.body;
  const isShuffle = shuffle === "true";
  const min = parseInt(start);
  const max = parseInt(end);
  const total = parseInt(quantity)
  let list = [];

  if (isShuffle) {
    const shuffledIndexes = new Set(); 
    while (shuffledIndexes.size < max - min + 1) {
      const index = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!shuffledIndexes.has(index)) {
        shuffledIndexes.add(index);
        list.push(tests[index]);
      }
    }
  } else {
    for (let i = min; i <= max; i++) {
      list.push(tests[i]);
    }
  }

  if(isNaN(total)){
    res.json(list);
  } else{
    res.json(list.slice(0,total))
  }
});



app.get('/result', (req, res) => {
    let history = {question: '', answer: [], correct: []}
    res.render('result', {history})
}),

app.post('/result', (req, res) => {
        const historyString = req.body.data;
        const decodedHistoryString = decodeURIComponent(historyString);
        const history = JSON.parse(decodedHistoryString);
        res.render('result', { history })
})


app.listen(3000)