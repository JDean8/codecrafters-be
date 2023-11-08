const {
    selectAllUsers,
    selectUserById,
    insertUser,
    updateUser,
    deleteUser,
    selectAllEventsToAttendByUserId,
} = require("../models/usersModel");


exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
        .then((users) => {
            res.status(200).send({users});
        })
        .catch(next);
}

exports.getUserById = (req, res, next) => {
    const {id} = req.params;
    selectUserById(id)
        .then((user) => {
            res.status(200).send({user});
        })
        .catch(next);
}

exports.postUser = (req, res, next) => {
    const {user} = req.body;
    insertUser(user)
        .then((user) => {
            res.status(201).send({user});
        })
        .catch(next);
}

exports.patchUser = (req, res, next) => {
    const {id} = req.params;
    const {user} = req.body;
    updateUser(id, user)
        .then((user) => {
            res.status(200).send({user});
        })
        .catch(next);
}

exports.deleteUser = (req, res, next) => {
    const {id} = req.params;
    deleteUser(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
}

exports.getAllEventsToAttendByUserId = (req, res, next) => {
    const {sortBy, order, limit, page} = req.query;
    const {user_id} = req.params;
    const promise = [selectUserById(user_id)];
    if(user_id) promise.push(selectAllEventsToAttendByUserId(user_id, sortBy, order, limit, page));
    Promise.all(promise)
        .then(([user, events]) => {
            res.status(200).send({events});
        })
        .catch(next);
}