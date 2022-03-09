import Controller from './Controller';
import User from '../models/UserModel';
import UserService from '../services/UserService';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    // this.jwt = this.jwt.bind(this);
    this.changepassword = this.changepassword.bind(this);

    //reset password by email token
    this.sendEmail = this.sendEmail.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    //reset password by email otp
    this.sendEmailotp = this.sendEmailotp.bind(this);
    this.resetPasswordotp = this.resetPasswordotp.bind(this);


    //follow unfollow user methods
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);

  }
  
  async signup(req, res) {
    const response = await this.service.signup(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
  async login(req, res) {
    const response = await this.service.login(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async jwt(req, res) {
    console.log('req.header.authtoken');
    const response = await this.service.login(req.headers.authtoken);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async changepassword(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }
    const response = await this.service.changepassword(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async sendEmail(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }
    const response = await this.service.sendEmail(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
  async resetPassword(req, res) {
    const data = {
      password : req.body.password,
      cpassword : req.body.cpassword,
      // id : req.params.id,
      token : req.params.token
    }
    const response = await this.service.resetPassword(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  //otp email code
  async sendEmailotp(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }

    const response = await this.service.sendEmailotp(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
  async resetPasswordotp(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }
    const response = await this.service.resetPasswordotp(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }


  //follow unfollow user
  async follow(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }
    const response = await this.service.follow(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
  
  async unfollow(req, res) {
    const data = {
      params : req.headers.authtoken,
      body: req.body
    }
    const response = await this.service.unfollow(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

}

export default new UserController(userService);
 