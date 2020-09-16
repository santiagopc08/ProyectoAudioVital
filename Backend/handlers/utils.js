exports.show = function (res, err, data) {
    if (err) {
        res.status(500).send({
            message: 'Some error occurred while retrieving data.',
            description: err,
        })
    } else {
        res.send(data)
    }
}
exports.error = function (res, err) {
    res.status(500).send({
        message: 'Some error occurred while retrieving data.',
        description: err
    })
}
exports.nada = function (res, message) {
    res.status(404).send({
        message: message,
        description: {}
    })
}