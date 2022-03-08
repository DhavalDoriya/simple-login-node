import Controller from '../controllers/UserController';

export default (router) => {
    router.post(`/api/user/login`, Controller.login);
    router.post(`/api/user/signup`, Controller.signup);
    // router.get(`/api/user/signup`, Controller.signupp);

    router.get(`/api/users`, Controller.getAll);
    router.post(`/api/user`, Controller.insert);
    router.get(`/api/user/:id`, Controller.get);
    router.put(`/api/user/:id`, Controller.update);
    router.delete(`/api/user/:id`, Controller.delete);
};
