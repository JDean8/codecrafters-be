const db = require("../../db/connection");

exports.selectAllFriendsFromUserByUserId = (user_id) => {
  const SQL = `SELECT users.user_id from users 
    JOIN friends ON users.user_id = friends.friend_b OR users.user_id = friends.friend_a
    WHERE friends.friend_b = $1 AND users.user_id != $1 OR friends.friend_a = $1 AND users.user_id != $1;`;
  return db.query(SQL, [user_id]).then(({ rows }) => {
    return rows;
  });
}

exports.deleteUserFriend = (user_id, friend_id) => {
  const SQL = `DELETE FROM friends WHERE (friend_a = $1 AND friend_b = $2) OR (friend_a = $2 AND friend_b = $1);`;
  return db.query(SQL, [user_id, friend_id]).then(({ rows }) => {
    return rows;
  });
}

exports.selectAllFriendRequestsByUserId = (user_id) => {
  const SQL = `SELECT DISTINCT users.user_id from users 
    JOIN friendsRequests ON users.user_id = friendsRequests.friend_b OR users.user_id = friendsRequests.friend_a
    WHERE friendsRequests.friend_b = $1 AND users.user_id != $1 OR friendsRequests.friend_a = $1 AND users.user_id != $1;`;
  return db.query(SQL, [user_id]).then(({ rows }) => {
    return rows;
  });
}

exports.insertFriendRequest = (user_id, friend_id) => {
  const SQL = `INSERT INTO friendsRequests (friend_a, friend_b) VALUES ($1, $2) RETURNING *;`;
  return db.query(SQL, [user_id, friend_id]).then(({ rows }) => {
    return rows;
  });
}

exports.matchFriendRequests = (user_id) => {
  return db.query(`CREATE TEMP TABLE matched_requests_temp AS 
    SELECT * FROM friendsRequests fr1
    WHERE EXISTS (
        SELECT 1 FROM friendsRequests fr2
        WHERE fr1.friend_a = fr2.friend_b
        AND fr1.friend_b = fr2.friend_a
    );`)
    .then(() => {
      return db.query(`INSERT INTO friends (friend_a, friend_b)
    SELECT friend_a, friend_b FROM matched_requests_temp;`)
    })
    .then(() => {
      return db.query(`DELETE FROM friendsRequests
    WHERE EXISTS (
        SELECT 1 FROM matched_requests_temp
        WHERE friendsRequests.friend_a = matched_requests_temp.friend_a
        AND friendsRequests.friend_b = matched_requests_temp.friend_b
    );`)
    })
    .then((() => {
      return db.query(`DROP TABLE matched_requests_temp;`)
    }))
    .then(() => {
      const SQL = `SELECT DISTINCT users.user_id from users 
    JOIN friends ON users.user_id = friends.friend_b OR users.user_id = friends.friend_a
    WHERE friends.friend_b = $1 AND users.user_id != $1 OR friends.friend_a = $1 AND users.user_id != $1;`;
      return db.query(SQL, [user_id]).then(({ rows }) => {
        return rows;
      });
    })
}