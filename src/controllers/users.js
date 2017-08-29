import * as userService from '../services/user';

/*
create a user
*/
export function create( req, res, next ) {
  userService.createUser(req.user)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/*
fetch a user from id
*/
export function get( req, res, next) {
  userService.fetchById(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));       
}

/*
fetch a user by name
*/
export function getUserByName( req, res, next) {
  userService.fetchByName(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/*
return tokens for logged-in users
*/
export function loginOrSignUp( req, res, next) {
  userService.loginOrSignUp(req.user)
    .then(data => res.json(data))
    .catch(err => next(err));
}

