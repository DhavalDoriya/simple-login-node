import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import otpGenerator from 'otp-generator'


class UserService extends Service {
    constructor(model) {
        super(model);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.jwt = this.jwt.bind(this);

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

    //reset password by token
    async changepassword(data) {
        try {
            // console.log(data.body)
            const { password, cpassword } = data.body
            const decode = await jwt.verify(data.params, process.env.JWT_SECRET_KEY);
            if (password && cpassword) {
                if (password !== cpassword) {
                    return {
                        error: true,
                        statusCode: 500,
                        message: 'password is not match '
                    };
                }
                else {
                    const newhashPassword = await bcrypt.hash(password, 10)
                    const updatepass = await this.model.findByIdAndUpdate(decode.userID, {
                        $set: {
                            password: newhashPassword
                        }
                    })
                    return {
                        error: false,
                        statusCode: 200,
                        test: updatepass,
                        UserData: "Password Change Successfull..."
                    };
                }
            }
            else {
                return {
                    error: true,
                    statusCode: 400,
                    message: "All Fields are required"
                };
            }
            // const userdata = await this.model.findById(decode.userID).select(['-password']);
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'server error',
                errors: error.message
            };
        }
    }
    //reset email password by token
    async sendEmail(data) {
        const { email } = data.body
        // console.log(email);
        if (email) {
            const user = await this.model.findOne({ email: email })
            if (user) {
                // const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15m'
                })
                console.log(token);
                // const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                const link = `http://127.0.0.1:3000/api/user/reset/${token}`
                // console.log(link);
                //send email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to Reset Your Password`
                })
                //
                return {
                    error: false,
                    statusCode: 200,
                    test: info,
                    UserData: "Password Reset Link Sent in Email.....Please Check Your Email."
                };
            }
            else {
                return {
                    error: false,
                    statusCode: 200,
                    UserData: "Email Does not exists."
                };

            }
        } else {
            return {
                error: false,
                statusCode: 200,
                UserData: "Email Fields are required."
            };
        }
    }
    async resetPassword(data) {
        const decode = jwt.verify(data.token, process.env.JWT_SECRET_KEY);
        const user = await this.model.findById(decode.userID)
        try {
            jwt.verify(data.token, process.env.JWT_SECRET_KEY)
            if (data.password && data.cpassword) {
                if (data.password !== data.cpassword) {
                    return {
                        error: false,
                        statusCode: 200,
                        UserData: "Password And Confirm Password Not Match."
                    };
                }
                else {
                    const salt = await bcrypt.genSalt(10)
                    const newhashPassword = await bcrypt.hash(data.password, salt)
                    await this.model.findByIdAndUpdate(user._id, {
                        $set: {
                            password: newhashPassword
                        }
                    })
                    return {
                        error: false,
                        statusCode: 200,
                        password: newhashPassword,
                        UserData: "Password Reset Successfull..."
                    };

                }
            } else {
                return {
                    error: false,
                    statusCode: 200,
                    UserData: "All Fields are Required."
                };

            }
        } catch (error) {
            console.log(error);
            return {
                error: false,
                statusCode: 200,
                UserData: "Invalid Token."
            };

        }
    }
    // verify token
    async jwt(token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decode);
            return {
                error: true,
                statusCode: 500,
                message: decode
                // ,errors: err.errors,
            };
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

    //email otp
    async sendEmailotp(data) {
        const { email } = data.body
        if (email) {
            const user = await this.model.findOne({ email: email })
            if (user) {
                var otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                const saveotp = await this.model.findByIdAndUpdate(user._id, {
                    $set: {
                        otp: otp
                    }
                })
                if (saveotp) {
                    let info = await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user.email,
                        subject: "Password Reset Otp",
                        html: `<h1>Otp : ${otp}</h1> <h2>to Reset Your Password</h2>`
                    })
                    return {
                        error: false,
                        statusCode: 200,
                        otp: otp,
                        msg: info.response
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 404,
                        UserData: "error in generate otp "
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    UserData: "invalid email"
                };

            }
        }
        else {
            return {
                error: true,
                statusCode: 401,
                UserData: "Email Fields are required."
            };
        }
    }

    async resetPasswordotp(data) {

        const { otp, email, password, cpassword } = data.body

        if (password && cpassword && otp) {
            const useremail = await this.model.findOne({ email: email })
            if (useremail) {
                const user = await this.model.findOne({ otp: otp })
                if (otp) {
                    if (password !== cpassword) {
                        return {
                            error: false,
                            statusCode: 200,
                            UserData: "Password And Confirm Password Not Match."
                        };
                    }
                    else {
                        const salt = await bcrypt.genSalt(10)
                        const newhashPassword = await bcrypt.hash(password, salt)
                        await this.model.findByIdAndUpdate(useremail._id, {
                            $set: { password: newhashPassword }
                        })
                        return {
                            error: false,
                            statusCode: 201,
                            password: newhashPassword,
                            UserData: "Password Reset Successfull..."
                        };
                    }
                } else {
                    return {
                        error: true,
                        statusCode: 401,
                        UserData: "invalid otp"
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 401,
                    UserData: "invalid email"
                };
            }
        } else {
            return {
                error: true,
                statusCode: 400,
                UserData: "All Fields are Required."
            };

        }

    }
}

export default UserService;
