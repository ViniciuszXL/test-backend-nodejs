const environments = require('./environments.js')

const sendErrorIntern = (message, err) => {
    return {
        code: environments.CODE.INTERN,
        success: false,
        message: message,
        data: err
    }
}

const sendErrorRequest = (message) => {
    return {
        code: environments.CODE.REQUEST,
        success: false,
        message: message
    }
}

module.exports = {
    sendErrorIntern,
    sendErrorRequest
}
