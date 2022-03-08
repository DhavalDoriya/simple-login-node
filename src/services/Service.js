import mongoose from 'mongoose';

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
  }

  async getAll(query) {
    let { skip, limit } = query;
    // console.log(query);
    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    // eslint-disable-next-line no-param-reassign
    delete query.skip;
    // eslint-disable-next-line no-param-reassign
    delete query.limit;
    // console.log(skip);
    // console.log(limit);
    // eslint-disable-next-line no-underscore-dangle
    let id = query._id;
    if (id) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }

    try {
      const items = await this.model
        .find(query)
        .select(['-password'])
        .skip(skip)
        .limit(limit);
      const total = await this.model.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      // console.error(errors);
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async insert(item) {
    try {
      console.log(this.model);
      const data = await this.model.create(item);
      // console.log(data);
      return {
        error: false,
        statusCode: 202,
        data: data,
      };
    } catch (err) {
      // console.log('errors ssdsds',err);
      return {
        error: true,
        statusCode: 500,
        message: 'Not able to create item',
        errors: err.errors,
      };
    }
  }

  async update(id, item) {
    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error,
      };
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: 'item not found',
        };

      return {
        error: false,
        deleted: true,
        statusCode: 200,
        message: 'record delete successfullly!',
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error,
      };
    }
  }

  async get(id) {
    try {
      const items = await this.model.findById(id).select(['-password']);
      return {
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }


}

export default Service;
