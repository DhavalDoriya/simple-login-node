import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';

class UserService extends Service {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        super(model);
    }

   async signup(item) {
        try {
            console.log(item);
            const data = new this.model(item)
            data.save()
            // const data = await this.model.create(item);
            console.log("data saved");
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
                message: 'Not able to create item'
               , errors: err.errors,
            };
        }
    }

    //login
    async login(item) {
        try {
            // console.log(item.email);
            const inputmail = item.email
            const inputpass = item.password
            let tempuser = await this.model.findOne( { "email": inputmail })
            if (tempuser) {
                if (inputpass == tempuser.password) {
                    return {
                        error: false,
                        statusCode: 202,
                        data: tempuser,
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 402,
                        message: 'password not match'
                        // ,errors: err.errors,
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'user not found'
                    // ,errors: err.errors,
                };
            }
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'server error'
                // ,errors: err.errors,
            };
        }
    }

}

export default UserService;
