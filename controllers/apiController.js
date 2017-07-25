function index (req, res) {
  res.json({
    message: 'Welcome to our food searching API!',
    creators: 'Kevin & Mary',
    github: 'https://github.com/kc657/food-search-api'
  })
}

module.exports = {
  index: index
}
