const authorize = require("./authorize"),
    tools = require('./tools')

module.exports = {
    ...authorize,
    ...tools
}