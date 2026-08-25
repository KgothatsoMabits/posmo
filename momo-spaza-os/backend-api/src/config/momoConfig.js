const momo = require('mtn-momo');

const { Collections } = momo.create({
    environment: process.env.MTN_MOMO_ENV || 'sandbox',
    callbackHost: process.env.PROVIDER_CALLBACK_HOST_SANDBOX
});

const collections = Collections({
    userId: process.env.USER_ID_SANDBOX,  
    userSecret: process.env.USER_SECRET_SANDBOX,
    primaryKey: process.env.SUBSCRIPTION_KEY_SANDBOX
});

module.exports = { collections };