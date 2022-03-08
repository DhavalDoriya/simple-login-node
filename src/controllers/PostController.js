import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import Controller from './Controller';
import Post from '../models/PostModel';
import PostService from '../services/PostService';
//import Stripe from '../helpers/Stripe';

const postService = new PostService(new Post().getInstance());

class PostController extends Controller {
  constructor(service) {
    super(service);
  }

}

export default new PostController(postService);
