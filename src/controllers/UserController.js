
import Controller from './Controller';
import User from '../models/UserModel';
import UserService from '../services/UserService';


const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    // this.signupp = this.signupp.bind(this);
  }
  
  async signup(req, res) {
    console.log(req.body);
    const response = await this.service.signup(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
    // return res.send('panding')
  }
  async login(req, res) {
    // console.log(req.body);
    const response = await this.service.login(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
    // return res.send('panding')
  }

}

export default new UserController(userService);
