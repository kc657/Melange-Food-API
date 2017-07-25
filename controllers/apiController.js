function index (req, res) {
  res.json({
    message: 'Welcome to Melange, our food searching API that mashes up two or more ingredients to product something awesome!',
    creators: 'Kevin & Mary',
    github: 'https://github.com/kc657/melange-food-api'
  })
}

module.exports = {
  index: index
}
