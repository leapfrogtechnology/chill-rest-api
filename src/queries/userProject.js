export const CHECK_USER_PROJECT = (`
	select * 
	from user_project 
	where user_id = ?
	AND project_id = ?;
	`);
