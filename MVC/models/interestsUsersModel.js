const db = require("../../db/connection");
const { map } = require("../../db/data/test-data/interests");
const { selectAllInterests } = require("./interestsModel");
const { selectUserById } = require("./usersModel");

exports.selectIntrestsByUserId = (userId) => {
    return selectUserById(userId)
        .then((response) => {
            return db.query(`SELECT interests.interest FROM interests
        LEFT JOIN interests_users ON interests.interest_id = interests_users.interest_id
        WHERE interests_users.user_id = $1;`, [userId])
        })
        .then(({ rows }) => {
            const mappedInterests = rows.map((row) => {
                return row.interest
            })
            return mappedInterests;
        })
}

exports.postUserInterest = (userId, interest) => {
    return selectUserById(userId)
        .then(() => {
            return selectAllInterests()
        })
        .then((response) => {
            const mappedInterests = response.map((singleInterest) => {
                return singleInterest.interest_id;
            })

            if (!mappedInterests.includes(interest.interest_id)) {
                return Promise.reject({ status: 404, msg: "Interest not found" });
            }

            return db.query(`INSERT INTO interests_users (user_id, interest_id) VALUES ($1, $2) RETURNING *;`, [userId, interest.interest_id])
                .then(({ rows }) => {
                    return rows[0];
                })
        })
}