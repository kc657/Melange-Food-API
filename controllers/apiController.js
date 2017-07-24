function index (req, res) {
  res.json({
    message: 'Hello'
  })
}

module.exports = {
  index: index
}
