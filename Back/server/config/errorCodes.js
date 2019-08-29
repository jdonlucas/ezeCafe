module.exports = {
    Unauthorized: {
        Code: 401,
        Message: 'Unauthorized'
    },
    UsernamePassword: {
        Code: 452,
        Message: 'Invalid username or password'
    },
    Role: {
        Code: 453,
        Message: 'Invalid role for login'
    },
    Tfa: {
        Code: 454,
        Message: 'Invalid TFA token'
    },
    OauthCode: {
        Code: 455,
        Message: 'Invalid oauth token'
    },
    UsernameTaken: {
        Code: 456,
        Message: 'This username has already been taken'
    },
    UserNotFound: {
        Code: 457,
        Message: 'User not found'
    },
    InvalidToken: {
        Code: 458,
        Message: 'Invalid token'
    },
    ExpiredToken: {
        Code: 459,
        Message: 'The token has been expired'
    },
    ExpiredToken: {
        Code: 500,
        Message: 'Insert failed'
    }
};