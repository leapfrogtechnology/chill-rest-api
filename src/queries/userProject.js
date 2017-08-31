export const CHECK_USER_PROJECT = `
	SELECT * 
	FROM user_project 
	WHERE user_id = ?
	AND project_id = ?;
	`;
