import Controller from './Controller';
import SocialUser from '../models/socialuserModel';
import UserService from '../services/socialuserService';

const userService = new UserService(new SocialUser().getInstance());

class socialuserController extends Controller {
  constructor(service) {
    super(service);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    //follow unfollow user methods
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);

  }
  //login sigup methods
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
  //follow unfollow user
  async follow(req, res) {
    const data = {
      id: req.params.id,
      body: req.body
    }
    const response = await this.service.follow(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async unfollow(req, res) {
    const data = {
      id: req.params.id,
      body: req.body
    }
    const response = await this.service.unfollow(data);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

}

export default new socialuserController(userService);
