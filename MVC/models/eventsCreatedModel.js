const db = require("../../db/connection");


exports.selectEventsCreatedByUserId = (user_id) => {
    if(!user_id) return Promise.reject({ status: 400, msg: "Bad request" });
    return db
        .query("SELECT * FROM events WHERE creator_id = $1", [user_id])
        .then(({ rows }) => {
        if (!rows.length)
            return [];
        return rows;
        });
    }

exports.selectEventCreatedByEvent_Id = (event_id, user_id) => {
if(!event_id || !user_id) return Promise.reject({ status: 400, msg: "Bad request" });
return db
    .query("SELECT * FROM events WHERE event_id = $1 AND creator_id = $2", [event_id, user_id])
    .then(({ rows }) => {
    if (!rows.length)
        return {};
    return rows[0];
    });
}

exports.eliminateEventCreatedByEvent_Id = (event_id, user_id) => {
if(!event_id || !user_id) return Promise.reject({ status: 400, msg: "Bad request" });
return db
    .query("DELETE FROM events WHERE event_id = $1 AND creator_id = $2 RETURNING *", [event_id, user_id])
    .then(({ rows }) => {
    if (!rows.length)
        return Promise.reject({ status: 404, msg: "We couldn't find any events created by this user" });
    return rows[0];
    });
}