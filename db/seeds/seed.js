const format = require("pg-format");
const db = require("../connection");
const {
  convertTimestampToDateUsers,
  convertTimestampToDateTrips,
  convertTimestampToDateEvents,
} = require("./utils");

const seed = ({
  interestsData,
  tripsData,
  usersData,
  friendsData,
  friendRequestsData,
  events_usersData,
  eventsData,
  interests_usersData,
  commentsData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS friends;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS friendsRequests;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events_users;`);
    })

    .then(() => {
      return db.query(`DROP TABLE IF EXISTS trips;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS interests_users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS interests;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE trips (
            trip_id SERIAL PRIMARY KEY,
            creator_id VARCHAR NOT NULL,
            country VARCHAR NOT NULL,
            location VARCHAR NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            latitude FLOAT,
            longitude FLOAT
        );`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_id VARCHAR PRIMARY KEY,
        username VARCHAR,
        name VARCHAR,
        profile_pic VARCHAR,
        created_at TIMESTAMP,
        email VARCHAR
      );`);

      const interestsTablePromise = db.query(`
      CREATE TABLE interests (
          interest_id integer PRIMARY KEY,
          interest VARCHAR
      );`);

      const eventsTablePromise = db.query(`
      CREATE TABLE events (
          event_id integer PRIMARY KEY,
          creator_id VARCHAR,
          date TIMESTAMP,
          short_description VARCHAR,
          description VARCHAR,
          location VARCHAR,
          latitude FLOAT,
          longitude FLOAT,
          event_picture VARCHAR
      );`);
      return Promise.all([
        usersTablePromise,
        interestsTablePromise,
        eventsTablePromise,
      ]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE friends (
        friend_a VARCHAR references users(user_id) ON DELETE CASCADE,
        friend_b VARCHAR references users(user_id) ON DELETE CASCADE
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE friendsRequests (
        friend_a VARCHAR references users(user_id) ON DELETE CASCADE,
        friend_b VARCHAR references users(user_id) ON DELETE CASCADE
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE interests_users (
        user_id VARCHAR references users(user_id) ON DELETE CASCADE,
        interest_id INT references interests(interest_id)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE events_users (
          event_id integer references events(event_id) ON DELETE CASCADE,
          user_id VARCHAR references users(user_id) ON DELETE CASCADE
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body VARCHAR,
        user_id VARCHAR references users(user_id) ON DELETE CASCADE,
        event_id INT references events(event_id) ON DELETE CASCADE,
        created_at TIMESTAMP
      );`);
    })
    .then(() => {
      const formattedUsers = usersData.map(convertTimestampToDateUsers);
      const insertUserRows = format(
        `INSERT INTO users
          (user_id, username, name, profile_pic, created_at, email)
          VALUES %L RETURNING *;`,
        formattedUsers.map((user) => {
          return [
            user.user_id,
            user.username,
            user.name,
            user.profile_pic,
            user.created_at,
            user.email
          ];
        })
      );
      const insertUserRowsPromise = db.query(insertUserRows);

      const insertInterestRows = format(
        `INSERT INTO interests
            (interest_id, interest)
            VALUES %L RETURNING *;`,
        interestsData.map((interest) => {
          return [interest.interest_id, interest.interest];
        })
      );
      const insertInterestRowsPromise = db.query(insertInterestRows);

      const formattedEvents = eventsData.map(convertTimestampToDateEvents);
      const insertEventsRows = format(
        `INSERT INTO events
            (event_id, creator_id, date, short_description, description, location, latitude, longitude, event_picture)
            VALUES %L RETURNING *;`,
        formattedEvents.map((event) => {
          return [
            event.event_id,
            event.creator_id,
            event.date,
            event.short_description,
            event.description,
            event.location,
            event.latitude,
            event.longitude,
            event.event_picture,
          ];
        })
      );
      const insertEventsRowsPromise = db.query(insertEventsRows);

      return Promise.all([
        insertUserRowsPromise,
        insertInterestRowsPromise,
        insertEventsRowsPromise,
      ]);
    })
    .then(() => {
      const formattedTrips = tripsData.map(convertTimestampToDateTrips);
      const insertTripRows = format(
        `INSERT INTO trips
          (creator_id, country, location, start_date, end_date, latitude, longitude)
          VALUES %L RETURNING *;`,
        formattedTrips.map((trip) => {
          return [
            trip.creator_id,
            trip.country,
            trip.location,
            trip.start_date,
            trip.end_date,
            trip.latitude,
            trip.longitude,
          ];
        })
      );
      return db.query(insertTripRows);
    })
    .then(() => {
      const insertFriendsRows = format(
        `INSERT INTO friends
              (friend_a, friend_b)
              VALUES %L RETURNING *;`,
        friendsData.map((friend) => {
          return [friend.friend_a, friend.friend_b];
        })
      );
      return db.query(insertFriendsRows);
    })
    .then(() => {
      const insertFriendsRequestRow = format(
        `INSERT INTO friendsRequests
              (friend_a, friend_b)
              VALUES %L RETURNING *;`,
        friendRequestsData.map((friend) => {
          return [friend.friend_a, friend.friend_b];
        })
      );
      return db.query(insertFriendsRequestRow);
    })
    .then(() => {
      const insertEventsUsersRows = format(
        `INSERT INTO events_users
                (event_id, user_id)
                VALUES %L RETURNING *;`,
        events_usersData.map((event) => {
          return [event.event_id, event.user_id];
        })
      );
      return db.query(insertEventsUsersRows);
    })
    .then(() => {
      const insertInterestsUsersRows = format(
        `INSERT INTO interests_users
              (user_id, interest_id)
              VALUES %L RETURNING *;`,
        interests_usersData.map((interest) => {
          return [interest.user_id, interest.interest_id];
        })
      );
      return db.query(insertInterestsUsersRows);
    })
    .then(() => {
      const commentFormatted = commentsData.map(convertTimestampToDateUsers);
      const insertCommentsRows = format(
        `INSERT INTO comments
                (comment_id, body, user_id, event_id, created_at)
                VALUES %L RETURNING *;`,
        commentFormatted.map((comment) => {
          return [
            comment.comment_id,
            comment.body,
            comment.user_id,
            comment.event_id,
            comment.created_at,
          ];
        })
      );
      return db.query(insertCommentsRows);
    });
};

module.exports = seed;
