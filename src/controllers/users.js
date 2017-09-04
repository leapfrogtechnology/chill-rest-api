import * as userService from '../services/user';

/** 
 * Create a user.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
export function create(req, res, next) {
  userService
    .createUser(req.user)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a user from id.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
export function get(req, res, next) {
  userService
    .fetchById(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a user by name.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
export function getUserByName(req, res, next) {
  userService
    .fetchByName(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Return tokens for logged-in users.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
export function loginOrSignUp(req, res, next) {
  userService
    .loginOrSignUp(req.user)
    .then(data => res.json(data))
    .catch(err => next(err));
  // res.redirect('/profile');
}

export function postData(req, res, next) {
  let data = req.body;
  res.json({ data });
}
