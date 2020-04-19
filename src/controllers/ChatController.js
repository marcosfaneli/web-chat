const path = require('path')

module.exports = {
  async index(request, response) {
    return response.sendFile(path.join(__dirname, '..', '/views/chat.html'));
  }
}