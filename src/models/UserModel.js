import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class UserModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        username: {
          type: String,
          default: null,
        },
        email: {
          type: String,
          default: null,
        },
        password: {
          type: String,
          required: true
        },
        otp: {
          type: String
        }
      
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('testusers', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('testusers');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('testusers');
  }
}

export default UserModel;
