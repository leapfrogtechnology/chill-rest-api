export const FETCH_All_PROJECTS = `
<<<<<<< HEAD
    SELECT * 
    FROM users u 
    LEFT JOIN user_project up on up.user_id = u.id 
    LEFT JOIN projects p on up.project_id = p.id 
    WHERE u.id = :id ;
    `;

export const FETCH_A_PROJECT = `
    SELECT * 
    FROM users u 
    LEFT JOIN user_project up on up.user_id = u.id 
    LEFT JOIN projects p on up.project_id = p.id 
    WHERE u.id = :userId 
    AND p.id = :projectId ;
    `;

export const DELETE_A_PROJECT_PROJECTS = `
    DELETE
    FROM projects
    WHERE id= :projectId ;
    `;

export const DELETE_A_PROJECT_USERPROJECT = `
    DELETE
    FROM user_project
    WHERE project_id= :projectId ;
    `;

export const UPDATE_A_PROJECT_PROJECTS = `
    UPDATE projects
    SET name = :name , description = :description
    WHERE id = :projectId ;
    `;
=======
  SELECT * 
  FROM users u 
  LEFT JOIN user_project up on up.user_id = u.id 
  LEFT JOIN projects p on up.project_id = p.id 
  WHERE u.id = ? ;
  `;

export const FETCH_A_PROJECT = `
  SELECT * 
  FROM users u 
  LEFT JOIN user_project up on up.user_id = u.id 
  LEFT JOIN projects p on up.project_id = p.id 
  WHERE u.id = ? 
  AND p.id = ?;
  `;

export const DELETE_A_PROJECT_PROJECTS = `
  DELETE
  FROM projects
  WHERE id=?
  `;

export const DELETE_A_PROJECT_USERPROJECT = `
  DELETE
  FROM user_project
  WHERE project_id=?
  `;

export const UPDATE_A_PROJECT_PROJECTS = `
  UPDATE projects
  SET name = ? , description = ?
  WHERE id = ?
  `;
>>>>>>> c917e834d8bd4648c9160b6e2eb1e796b815a5e2
