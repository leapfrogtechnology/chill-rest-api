export const FETCH_All_SERVICE = `
  SELECT * 
  FROM services
  WHERE project_id = ? ;
  `;

export const FETCH_A_SERVICE = `
  SELECT * 
  FROM services
  WHERE id = ?
  AND project_id = ?;
  `;

export const DELETE_A_SERVICE = `
  DELETE 
  FROM services
  WHERE id = ?
  AND project_id = ?;
  `;

export const UPDATE_A_SERVICE_SERVICES = `
  UPDATE services
  SET name = ?, url = ?, type=?
  WHERE id=? 
  AND project_id=?;
  `;
