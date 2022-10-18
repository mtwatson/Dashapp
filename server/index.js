const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;
const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
  host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
  user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
  // eslint-disable-next-line max-len
  password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'fics', // database name MYSQL_HOST_IP: mysql_db
});

const db = pool.promise();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/data', (req, res) => {
  const SelectQuery = ' SELECT * FROM fic_todos';
  db.query(SelectQuery)
      .catch((error) => console.error(error))
      .then((result) => {
        console.log(result);
        res.send(result);
      });
});

// add a book to the database
app.post('/insert', (req, res) => {
  // eslint-disable-next-line max-len
  const InsertQuery = `INSERT INTO fic_todos (uuid, fic_name, fic_priority, fic_completion, fic_category, fic_status, fic_details, fic_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const {
    ficName,
    ficPriority,
    ficCompletion,
    ficCategory,
    ficStatus,
    ficDetails,
    ficColor} = req.body;

  const uuid = uuidv4();
  // eslint-disable-next-line max-len
  db.query(InsertQuery, [uuid, ficName, ficPriority, ficCompletion, ficCategory, ficStatus, ficDetails, ficColor])
      .catch((error) => console.error(error))
      .then((result) => {
        res.send(result);
      });
});

// delete a book from the database
app.delete('/delete/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = 'DELETE FROM fic_todos WHERE id = ?';
  // eslint-disable-next-line max-len
  db.query(DeleteQuery, bookId)
      .catch((error) => console.error(error))
      .then((result) => {
        res.send(result);
      });
});

// update a book review
app.put('/update/:bookId', (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = 'UPDATE fic_todos SET book_review = ? WHERE id = ?';

  db.query(UpdateQuery, [bookReview, bookId])
      .catch((error) => console.error(error))
      .then((result) => {
        res.send(result);
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
