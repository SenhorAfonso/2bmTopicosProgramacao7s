export const ExceptionMessage = {
  USERS: {
    NOT_FOUND: 'No users found!',
    DELETE_ID: 'Error deleting user by id!',
    GET_ALL: 'Error getting all users!',
    GET_ID: 'Error getting user by id!',
    GET_BY: (field: string) => `Error getting user by ${field} field!`,
    CREATE: 'Error saving user!',
    UPDATE: 'Error updating user by id!',
    UPDATE_INVALID_PAYLOD: 'New user data is invalid!',
    GENERIC: 'An unexpected error ocurred!',
    ALREADY_EXISTS: 'User already exists!',
    EMAIL_NOT_FOUND: 'There is no user with such email!',
    USERNAME_NOT_FOUND: 'There is no user with such username!',
    MAPPER: {
      LOGIN_REQUEST_TO_LOGIN_MODEL:
        'Error mapping login request to login model!',
      SIGNUP_REQUEST_TO_MODEL_IN:
        'Error mapping signup request to user model in!',
      UPDATE_REQUEST_TO_UPDATE_MODEL:
        'Error mapping update request to update model in!',
      DOCUMENT_TO_MODEL_OUT: 'Error mapping user document to user model out!',
      ARRAY_DOCUMENTS_TO_MODEL_OUT:
        'Error mapping array of user documents to user model out!',
      CHANGE_PASSWORD_REQUEST_TO_MODEL_IN:
        'Error mapping change password request to change password model in!',
    },
  },
  AUTH: {
    JWT: {
      INVALID_TOKEN: 'Invalid token!',
      EXPIRED_TOKEN: 'Expired token!',
      MISSING_TOKEN: 'Missing token!',
      SIGN: 'Jwt sign error!',
    },
    LOGIN: {
      INVALID_CREDENTIALS: 'Invalid credentials!',
    },
    SIGNUP: {
      ALREADY_EXISTS: 'User already exists!',
      EMAIL_TAKEN: 'Email already taken!',
      USERNAME_TAKEN: 'Username already taken!',
      PASSWORD_MISMATCH: 'Passwords do not match!',
    },
    CHANGE_PASSWORD: {
      INVALID_PASSWORD: 'Password does not match the registered one!',
      SAME_PASSWORD: 'New password can not be the same as the old password!',
    },
  },
  BCRYPT: {
    PASS_HASH: 'Error hashing password!',
  },
  CLOUDINARY: {
    UPLOAD_FAILED: 'Error uploading image to cloudinary!',
  },
  AXIOS: {
    SEND_EMAIL: 'Error sending request to email microservice!',
  },
  LOGGER: {
    INVALID_TYPE: (type: string) =>
      `Logger ${type} not found. (perhaps you forget to uppercase it?)`,
  },
};
