class AuthenticationService {
    registerSuccessfullLogin(username, userId, token) {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('token', token);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
    }

    isUserLogedIn() {
        let userItem = sessionStorage.getItem('authenticatedUser');
        return userItem !== null;
    }

    getUserId() {
        return sessionStorage.getItem('userId');
    }

    authenticatedLocation(locationUserId) {
        return parseInt(this.getUserId()) === parseInt(locationUserId);
    }
}

export default new AuthenticationService()