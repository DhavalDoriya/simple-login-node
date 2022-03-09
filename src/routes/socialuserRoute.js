import Controller from '../controllers/socialuserController';

export default (router) => {
    router.post(`/api/socialuser/login`, Controller.login);
    router.post(`/api/socialuser/signup`, Controller.signup);

    //follow/unfollow socialuser
    router.post(`/api/Socialsocialuser/:id/follow`, Controller.follow);
    router.post(`/api/Socialsocialuser/:id/unfollow`, Controller.unfollow);
    
    //socialuser curd
    router.get(`/api/socialusers`, Controller.getAll);
    router.post(`/api/socialuser`, Controller.insert);
    router.get(`/api/socialuser/:id`, Controller.get);
    router.put(`/api/socialuser/:id`, Controller.update);
    router.delete(`/api/socialuser/:id`, Controller.delete);
};
