export const FETCH_All_SERVICE = (`
  select * 
  from services
  where project_id = ? ;
  `);

export const FETCH_A_SERVICE = (`
  select * 
  from services
  where id = ?
  AND project_id = ?;
  `);

export const DELETE_A_SERVICE = (`
  delete 
  from services
  where id = ?
  AND project_id = ?;
  `);

export const UPDATE_A_SERVICE_SERVICES = (`
  update services
  set name = ? , 
  url = ?,
  type=?
  where id=? AND project_id=?;
  `);
