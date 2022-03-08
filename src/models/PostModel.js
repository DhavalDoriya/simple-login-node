import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class PostModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          default: null,
        },
        category: {
          type: String,
          required: true,
          unique: true,
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('posts', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('posts');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('posts');
  }
}

export default PostModel;
