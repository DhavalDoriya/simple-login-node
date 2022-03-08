import Controller from '../controllers/PostController';
import auth from '../middleware/auth.middleware';

export default (router) => {
    router.get(`/api/posts`, Controller.getAll);
    router.post(`/api/post`, Controller.insert);
    router.get(`/api/post/:id`, Controller.get);
    router.put(`/api/post/:id`, Controller.update);
    router.delete(`/api/post/:id`, Controller.delete);
};
