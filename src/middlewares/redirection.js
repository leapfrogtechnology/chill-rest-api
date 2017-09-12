/**
 * Redirect URL to avoid caching
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns redirect URL
 */
export function redirect(req, res, next) {
  if (!req.secure) {
    return res.redirect('http://' + req.get('host') + req.url);
  }
  next();
}
