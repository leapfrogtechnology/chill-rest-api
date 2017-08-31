export const FETCH_All_SERVICE = `
  SELECT * 
  FROM services
  WHERE project_id = id ;
  `;

export const FETCH_A_SERVICE = `
  SELECT * 
  FROM services
  WHERE id = serviceId
  AND project_id = projectId;
  `;

export const DELETE_A_SERVICE = `
  DELETE 
  FROM services
  WHERE id = serviceId
  AND project_id = projectId;
  `;

export const UPDATE_A_SERVICE_SERVICES = `
  UPDATE services
  SET name = ?, url = ?, type=?
  WHERE id=serviceId
  AND project_id=projectId;
  `;
