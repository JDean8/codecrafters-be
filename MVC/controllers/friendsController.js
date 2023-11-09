const { selectAllFriendsFromUserByUserId, deleteUserFriend } = require("../models/friendsModel");
const { selectUserById } = require("../models/usersModel");


exports.getAllFriendsFromUserByUserId = (req, res, next) => {
    const {user_id} = req.params;
    const promise = [selectUserById(user_id)];
    if(user_id) promise.push(selectAllFriendsFromUserByUserId(user_id));
    Promise.all(promise)
        .then(([user, friends]) => {
            res.status(200).send({friends});
        })
        .catch(next);
}

exports.deleteFriend = (req, res, next) => {
    selectUserById(req.params.user_id)
    .then((user) => {
        if(!user) return Promise.reject({status: 404, msg: "User not found"})
        return selectUserById(req.params.friend_id)
    })
    .then(() => {
        deleteUserFriend(req.params.user_id, req.params.friend_id)
    })
    .then(() => {
        res.status(204).send();
    })
    .catch(next);
}
