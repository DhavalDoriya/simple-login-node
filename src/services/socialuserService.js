import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



class socialuserserService extends Service {
    constructor(model) {
        super(model);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        //follow unfollow user methods
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);

    }
    //signup
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
                    const token = jwt.sign({ userID: tempuser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '45m' })
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
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 401,
                    error: 'wrong Email Or Password'
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
    //follow unfollow code
   
    async follow(data) {
        if (data.body.userId !== data.id) {
            try {
                const user = await this.model.findById(data.id);
                const currentUser = await this.model.findById(data.body.userId);
                if (!user.followers.includes(data.body.userId)) {
                    await user.updateOne({ $push: { followers: data.body.userId } });
                    await currentUser.updateOne({ $push: { followings: data.id } });
                    return {
                        error: false,
                        statusCode: 200,
                        error: ' user has been followed '
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 403,
                        error: ' you allready follow this user '
                    };
                }
            } catch (err) {
                return {
                    error: true,
                    statusCode: 500,
                    error: ' Server Error '
                };
            }
        } else {
            return {
                error: true,
                statusCode: 403,
                error: ' you cant follow yourself '
            };
        }
    }


    // unfollow

    async unfollow(data) {
        if (data.body.userId !== data.id) {
            try {
                const user = await this.model.findById(data.id);
                const currentUser = await this.model.findById(data.body.userId);
                if (!user.followers.includes(data.body.userId)) {
                    await user.updateOne({ $pull: { followers: data.body.userId } });
                    await currentUser.updateOne({ $pull: { followings: data.id } });
                    return {
                        error: false,
                        statusCode: 200,
                        error: ' user has been unfollowed '
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 403,
                        error: ' you allready unfollow this user '
                    };
                }
            } catch (err) {
                return {
                    error: true,
                    statusCode: 500,
                    error: ' Server Error '
                };
            }
        } else {
            return {
                error: true,
                statusCode: 403,
                error: ' you cant unfollow yourself '
            };
        }
    }
    


}

export default socialuserserService;
