const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;
const {v4: uuidv4} = require('uuid');
const FicSchema = require('./schemas/FicSchema');

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
        result[0].forEach((entry) => {
          if (entry.fic_details) {
            const newDetails = entry.fic_details.toString();
            entry.fic_details = newDetails;
          }
        });
        res.send(result);
      });
});

// add a fic to the database
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
    ficColor,
    uuid} = req.body;


  FicSchema.validate(req.body)
    .then(response => {
      if (uuid) {
        const SelectQuery = ' SELECT * FROM fic_todos WHERE uuid = ?';
        db.query(SelectQuery, uuid)
            .catch((error) => console.error(error))
            .then((result) => {
              if (result[0][0]) {
                return res.status(400).send({
                  message: 'Record already exists',
                });
              } else {
                return res.status(400).send({
                  message: 'Cannot insert record',
                });
              }
            });
      } else {
        const newEntryUuid = uuidv4();
        // eslint-disable-next-line max-len
        db.query(InsertQuery, [newEntryUuid, ficName, ficPriority, ficCompletion, ficCategory, ficStatus, ficDetails, ficColor])
            .catch((error) => console.error(error))
            .then((result) => {
              res.send(result);
            });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
});

// delete a book from the database
app.delete('/delete/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const DeleteQuery = 'DELETE FROM fic_todos WHERE uuid = ?';
  // eslint-disable-next-line max-len
  db.query(DeleteQuery, uuid)
      .catch((error) => console.error(error))
      .then((result) => {
        res.send(result);
      });
});

// update a book review
app.put('/update/', (req, res) => {
  const {
    ficName,
    ficPriority,
    ficCompletion,
    ficCategory,
    ficStatus,
    ficDetails,
    ficColor,
    uuid} = req.body;

    FicSchema.validate(req.body)
    .then(response => {
        const UpdateQuery = `
        UPDATE
        fic_todos
      SET
        fic_name = ?,
        fic_priority = ?,
        fic_completion = ?,
        fic_category = ?,
        fic_status = ?,
        fic_details = ?,
        fic_color = ?
      WHERE
        uuid = ?
    `;
      // eslint-disable-next-line max-len
      db.query(UpdateQuery, [ficName, ficPriority, ficCompletion, ficCategory, ficStatus, ficDetails, ficColor, uuid])
          .catch((error) => console.error(error))
          .then((result) => {
            res.send(result);
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
