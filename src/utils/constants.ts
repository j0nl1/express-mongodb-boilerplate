// Environment
export const PRODUCTION = 'PRODUCTION';

// Protocols
export const MONGO_SECURE = 'mongodb+srv:';
export const MONGO_INSECURE = 'mongodb:';

// Routes
export const PREFIX_API_URL = '/api';

// Patterns
export const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

// Roles
export const ROLE_ADMIN = 'admin';
export const ROLE_USER = 'user';

// Encrypt
export const SALT = 10;

// Error Messages
export const STANDARD_ERROR = 'Something went wrong';
export const NOT_ENOUGH_PERMISSION = "You don't have permissions for this operation";

export const ENCODING_UTF8 = 'utf-8';
