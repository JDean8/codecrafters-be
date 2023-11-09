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