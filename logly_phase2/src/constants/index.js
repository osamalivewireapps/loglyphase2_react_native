/* eslint-disable prettier/prettier */
//import {Colors} from './../theme'
// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';
export const TIME_FORMAT1 = 'H:mm';
export const TIME_FORMAT2 = 'HH:mm:ss';

export const IMAGE_MAX_WIDTH = 400;
export const IMAGE_MAX_HEIGHT = 400;

// Message types
export const MESSAGE_TYPES = {
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success'
};

// File Types
export const FILE_TYPES = { VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi' };

// Navbar theme
//export const NAVBAR_THEME = { GREEN: Colors.green, WHITE: "white", TRANSPERENT: "rgba(0,0,0,0)" };

// Match types
export const MATCH_TYPES = { POTY: 'POTY', LCL: 'LCL', LMP: 'LMP', DMP: 'DMP' };

// Error Messages
export const ERROR_MESSAGES = {
    // Server messages
    invalid_credentials: 'Username or password is invalid',

    // Local messages
    location_permission_denied_error2:
        'Location permission required, please go to app settings to allow access',
    invalid_name_error: 'Invalid name',
    invalid_email_error: 'Invalid email',
    invalid_password_error: 'Invalid password',
    internet_error: 'Please connect to the working internet',
    session_expired_error: 'Session expired, Please login again',
    invalid_field: 'Invalid field'
};

export const POLLING_TIME = 60000;

export const NOT_SHOW_MSG = 'not_show';
export const ERROR_API = 'error';
export const REFRESH_DATA = 'refresh';

export const userObject = 'userObject';
export const userPreferences = 'userPreferences';
export const accountType = 'accountType';
export const BUS_SERVICES = 'bus_services';

export const TYPES_OF_SERVICES = [
    {
        name: 'Pet Grooming',
        url: require('../assets/Images/img_pet_grooming/img_pet_grooming.png'),
        bg: '#39A8D6',
        id: 1,
    },
    {
        name: 'Veterinary',
        url: require('../assets/Images/img_veterinary/img_veterinary.png'),
        bg: '#45D685',
        id: 2,
    },
    {
        name: 'Transportation',
        url: require('../assets/Images/img_transportation/img_transportation.png'),
        bg: '#E6A32F',
        id: 3,
    },
    {
        name: 'Pet Training',
        url: require('../assets/Images/img_pet_training/img_pet_training.png'),
        bg: '#C737AF',
        id: 4,
    },
    {
        name: 'Pet Walking / Sitting',
        url: require('../assets/Images/img_pet_walking/img_pet_walking.png'),
        bg: '#32288B',
        id: 5,
    },
    {
        name: 'Breeding',
        url: require('../assets/Images/img_breeding/img_breeding.png'),
        bg: '#E58C45',
        id: 6,
    },
    {
        name: 'Pet Boarding',
        url: require('../assets/Images/img_pet_boarding/img_pet_boarding.png'),
        bg: '#C90F22',
        id: 7,
    }
];

export const PET_LOVER = "PET_LOVER";
export const CHARITY_ACCOUNT = "CHARITY_ACCOUNT";
export const PET_LOVER_ID = "5fac021fbd5c030e375233ad";
export const CHARITY_ID = "5fd18456787db01efbd05fab";
export const INDIVIDUAL = "Individual";
export const BUS_LISTING = "Business Listing";
export const BUS_SER_PROVIDER = "Business Service Provider";
export const BUSINESS = "Business";


export const TERMS = "terms";
export const POLICY = "policy";
