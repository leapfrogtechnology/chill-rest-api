// Project Queries
// Select all Projects of a user
export const FETCH_All_PROJECTS = (`
    select * 
    from users u 
    left join user_project up on up.user_id = u.id 
    left join projects p on up.project_id = p.id 
    where u.id = ? ;
    `);

// Select a project from a user when project id id given
export const FETCH_A_PROJECT = (`
    select * 
    from users u 
    left join user_project up on up.user_id = u.id 
    left join projects p on up.project_id = p.id 
    where u.id = ? 
    AND p.id = ?;
    `);

// Delete project entry from projects table
export const DELETE_A_PROJECT_PROJECTS = (`
    Delete
    from projects
    where id=?
    `)

export const DELETE_A_PROJECT_USERPROJECT = (`
    Delete
    from user_project
    where project_id=?
    `)

export const UPDATE_A_PROJECT_PROJECTS = (`
    update projects
    set name = ? , description = ?
    where id = ?
    `)