const {
    selectAllCards,
    selectCardById,
    insertCard,
    updateCard,
    deleteCard
} = require('../models/cardsModel');


exports.getAllCards = (req, res, next) => {
    selectAllCards()
        .then((cards) => {
            res.status(200).send({cards});
        })
        .catch(next);
}

exports.getCardById = (req, res, next) => {
    const {id} = req.params;
    selectCardById(id)
        .then((card) => {
            res.status(200).send({card});
        })
        .catch(next);
}

exports.postCard = (req, res, next) => {
    const {card} = req.body;
    insertCard(card)
        .then((card) => {
            res.status(201).send({card});
        })
        .catch(next);
}

exports.patchCard = (req, res, next) => {
    const {id} = req.params;
    const {card} = req.body;
    updateCard(id, card)
        .then((card) => {
            res.status(200).send({card});
        })
        .catch(next);
}

exports.deleteCard = (req, res, next) => {
    const {id} = req.params;
    deleteCard(id)
        .then((card) => {
            res.status(204).send();
        })
        .catch(next);
}