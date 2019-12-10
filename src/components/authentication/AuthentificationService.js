class AuthenticationService {
    registerSuccessfullLogin(username, userId) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('userId', userId);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLogedIn(){
        let userItem = sessionStorage.getItem('authenticatedUser');
        return userItem !== null;
    }

    getUserId(){
        return sessionStorage.getItem('userId');
    }

    authenticatedLocation(locationUserId){
        return parseInt(this.getUserId()) === parseInt(locationUserId);
    }
}

export default new AuthenticationService()