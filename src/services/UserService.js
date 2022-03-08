import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



class UserService extends Service {
    constructor(model) {
        super(model);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    async signup(item) {
        try {
            const hash = await bcrypt.hashSync(item.password, 10);
            item.password = hash;
            const data = await this.model.create(item);
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (err) {
            return {
                error: true,
                statusCode: 501,
                message: 'Error in Signup'
                , errors: err.errors,
            };
        }
    }

    //login
    async login(item) {
        try {
            let tempuser = await this.model.findOne({ "email": item.email })
            if (tempuser) {
                var checkPassword = await bcrypt.compareSync(item.password, tempuser.password);
                if (checkPassword) {
                    const token = jwt.sign({ userID: tempuser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '45m'})
                    return {
                        error: false,
                        token: token,
                        statusCode: 200,
                        data: tempuser
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 401,
                        error: 'wrong Email Or Password'
                    };;
                }
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

        //verify token
        async jwt(token) {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET_KEY );
                console.log(decode);
                // return {
                //     error: true,
                //     statusCode: 500,
                //     message: decode
                //     // ,errors: err.errors,
                // };
                let tempuser = await this.model.findOne({ "email": item.email })
            
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
