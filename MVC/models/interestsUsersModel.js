const db = require("../../db/connection");
const { selectAllInterests } = require("./interestsModel");
const { selectUserById } = require("./usersModel");

exports.selectInterestsByUserId = (userId) => {
  return selectUserById(userId)
    .then(() => {
      return db.query(
        `SELECT interests.interest, interests.interest_id FROM interests
        LEFT JOIN interests_users ON interests.interest_id = interests_users.interest_id
        WHERE interests_users.user_id = $1;`,
        [userId]
      );
    })
    .then(({ rows }) => {
      return rows;
    });
};

exports.postUserInterest = (userId, interest) => {
  return selectUserById(userId)
    .then(() => {
      return selectAllInterests();
    })
    .then((response) => {
      const mappedInterests = response.map((singleInterest) => {
        return singleInterest.interest_id;
      });

      if (!mappedInterests.includes(interest.interest_id)) {
        return Promise.reject({ status: 404, msg: "Interest not found" });
      }

      return db
        .query(
          `INSERT INTO interests_users (user_id, interest_id) VALUES ($1, $2) RETURNING *;`,
          [userId, interest.interest_id]
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};

exports.deleteInterest = (userId, interestId) => {
  return selectUserById(userId)
    .then(() => {
      return db.query(
        `SELECT * FROM interests_users WHERE user_id = $1 AND interest_id = $2;`,
        [userId, interestId]
      );
    })
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Interest not found" });
      }
      return db.query(
        `DELETE FROM interests_users WHERE user_id = $1 AND interest_id = $2;`,
        [userId, interestId]
      );
    });
};
