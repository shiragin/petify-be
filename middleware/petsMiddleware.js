function getPictureUrl(req, res, next) {
  if (req.file) {
    req.body.picture = req.file.path;
  }
  next();
}

module.exports = { getPictureUrl };
