const { selectAllFriendsFromUserByUserId, deleteUserFriend, selectAllFriendRequestsByUserId, insertFriendRequest, matchFriendRequests } = require("../models/friendsModel");
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

exports.getAllFriendRequests = (req, res, next) => {
    selectUserById(req.params.user_id)
    .then((user) => {
        if(!user) return Promise.reject({status: 404, msg: "User not found"})
        return selectAllFriendRequestsByUserId(req.params.user_id)
    })
    .then((friendRequests) => {
        res.status(200).send({friendRequests});
    })
    .catch(next);
}

exports.postFriendRequest = (req, res, next) => {
    selectUserById(req.params.user_id)
    .then((user) => {
        if(!user) return Promise.reject({status: 404, msg: "User not found"})
    })
    .then(() => {
        return selectAllFriendRequestsByUserId(req.params.user_id)
    })
    .then((friendRequests) => {
        const friendRequest = friendRequests.find((friendRequest) => {
            return friendRequest.user_id === req.body.friend_id
        })
        if(friendRequest) return Promise.reject({status: 400, msg: "Friend request already exists"})
        return selectAllFriendsFromUserByUserId(req.params.user_id)
    })
    .then((friends) => {
        const friend = friends.find((friend) => {
            return friend.user_id === req.body.friend_id
        })
        if(friend) { 
            return Promise.reject({status: 400, msg: "Friend already exists"})
        } else {
            return insertFriendRequest(req.params.user_id, req.body.friend_id)
        }
    })
    .then((rows) => {
        res.status(201).send({friendRequest: rows[0]});
    })
    .catch(next);
}

exports.matchFriends = (req, res, next) => {
    return selectUserById(req.params.user_id)
    .then((user) => {
        if(!user) return Promise.reject({status: 404, msg: "User not found"})
    })
    .then(() => {
        return matchFriendRequests(req.params.user_id)
    })
    .then((friends)=> {
        res.status(200).send({friends});
    })
    .catch(error => {
        next(error)
    });
}