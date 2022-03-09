import Controller from '../controllers/UserController';

export default (router) => {
    router.post(`/api/user/login`, Controller.login);
    router.post(`/api/user/signup`, Controller.signup);
    // router.get(`/api/user/verify`, Controller.jwt);
    router.post(`/api/user/changePassword`, Controller.changepassword);
    router.post(`/api/user/sendEmail`, Controller.sendEmail);
    // router.post(`/api/user/resetPassword/:id/:token`, Controller.resetPassword);
    router.post(`/api/user/resetPassword/:token`, Controller.resetPassword);

    //otp routes
    router.post(`/api/user/sendemailotp`, Controller.sendEmailotp);
    router.post(`/api/user/resetpasswordotp`, Controller.resetPasswordotp);




    router.get(`/api/users`, Controller.getAll);
    router.post(`/api/user`, Controller.insert);
    router.get(`/api/user/:id`, Controller.get);
    router.put(`/api/user/:id`, Controller.update);
    router.delete(`/api/user/:id`, Controller.delete);
};
