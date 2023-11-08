const { selectIntrestsByUserId, postUserInterest } = require("../models/interestsUsersModel");

exports.getUserInterests = (req, res) => {
    selectIntrestsByUserId(req.params.id)
        .then((userInterests) => {
            res.status(200).send({ userInterests });
        })
        .catch((err) => {
            res.status(404).send({ msg: 'User not found' })
        })
}

exports.postUserInterest = (req, res) => {
    postUserInterest(req.params.id, req.body)
        .then((userInterest) => {
            res.status(201).send({ userInterest });
        })
        .catch(({ status, msg }) => {
            res.status(status).send({ msg })
        })
}