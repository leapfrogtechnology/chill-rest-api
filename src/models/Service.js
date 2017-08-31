import Boom from "Boom";
import camelize from "camelize";
import logger from "../utils/logger";
import { getClient } from "../utils/db";
import * as serviceQuery from "../queries/service";
import * as userProjectQuery from "../queries/userProject";

const db = getClient();

export const TYPE_HTTP = "http";
export const TYPE_TCP = "tcp";

class Service extends db.Model {
  get tableName() {
    return "services";
  }

  get hasTimestamps() {
    return true;
  }

  /**
  * Create a new Service.
  *
  * @param  {Object} data
  * @return {Promise}
  */
  static async create(data) {
    let service = new Service({
      name: data.name,
      url: data.url,
      project_id: data.projectId,
      type: data.type
    });

    logger().info("Creating a new service");
    logger().debug("Service data", data);

    await service.save();

    logger().info("Service created", { id: service.get("id") });

    return service;
  }

  static async fetchAll(projectId, userId) {
    logger().info("checking if user has the project", { projectId });
    let ifMatch;

    try {
      ifMatch = await db.knex.raw(userProjectQuery.CHECK_USER_PROJECT, {
        userId,
        projectId
      });
    } catch (err) {
      logger().error("Error while persisting the service into database", err);
    }

    if (ifMatch.rowCount != 0) {
      logger().info("Fetching the services of projects of project id", {
        projectId
      });
      let results = await db.knex.raw(serviceQuery.FETCH_All_SERVICE, {
        projectId
      });

      return camelize(results.rows);
    } else {
      throw new Boom.notFound("User and Project are not related");
    }
  }

  static async get(projectId, serviceId, userId) {
    logger().info("checking if user has the project");
    let ifMatch;

    try {
      ifMatch = await db.knex.raw(userProjectQuery.CHECK_USER_PROJECT, {
        userId,
        projectId
      });
    } catch (err) {
      logger().error("Error while persisting the service into database", err);
    }
    if (ifMatch.rowCount != 0) {
      logger().info("Fetching the service", { serviceId });
      let results = await db.knex.raw(serviceQuery.FETCH_A_SERVICE, {
        serviceId,
        projectId
      });

      return camelize(results.rows);
    } else {
      throw new Boom.notFound("User and Project are not related");
    }
  }

  static async deleteService(projectId, serviceId, userId) {
    logger().info("checking if user has the project");
    let ifMatch;

    try {
      ifMatch = await db.knex.raw(userProjectQuery.CHECK_USER_PROJECT, {
        userId,
        projectId
      });
    } catch (err) {
      logger().error("Error while persisting the service into database", err);
    }

    if (ifMatch.rowCount != 0) {
      logger().info("Fetching the service", { serviceId });
      let result = await db.knex.raw(serviceQuery.FETCH_A_SERVICE, {
        serviceId,
        projectId
      });

      if (!result) {
        throw new Boom.notFound("No service found under the project");
      }
      await db.knex.raw(serviceQuery.DELETE_A_SERVICE, {
        serviceId,
        projectId
      });

      return camelize(result.rows);
    } else {
      throw new Boom.notFound("User and Project are not related");
    }
  }

  static async updateService(projectId, serviceId, data, userId) {
    logger().info("checking if user has the project");
    let ifMatch;

    try {
      ifMatch = await db.knex.raw(userProjectQuery.CHECK_USER_PROJECT, {
        userId,
        projectId
      });
    } catch (err) {
      logger().error("Error while persisting the service into database", err);
    }

    if (ifMatch.rowCount != 0) {
      logger().info(
        "Updating a service of project",
        { projectId },
        "where serviceId is",
        { serviceId }
      );
      let results = await db.knex.raw(serviceQuery.FETCH_A_SERVICE, {
        serviceId,
        projectId
      });

      if (results.rowCount === 0) {
        throw new Boom.notFound("No Service Found");
      }

      let name = data.name;
      let url = data.url;
      let type = data.type;

      await db.knex.raw(serviceQuery.UPDATE_A_SERVICE_SERVICES, {
        name,
        url,
        type,
        serviceId,
        projectId
      });
      let updatedResult = await db.knex.raw(serviceQuery.FETCH_A_SERVICE, {
        serviceId,
        projectId
      });

      logger().info("service updated");

      return camelize(updatedResult.rows);
    } else {
      throw new Boom.notFound("User and Project are not related");
    }
  }
}

export default Service;
