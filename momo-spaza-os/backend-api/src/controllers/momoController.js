const { collections } = require('../config/momoConfig');
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();
const service = require('../services/momo_user_provision');

// Initialize a new sandbox user and generate an API key
const initializeSandboxUser = async (req, res) => {
    try {
        console.log("Initializing sandbox user...");
        const response = await service.createUserAndApiKey({
            providerHost: process.env.PROVIDER_HOST_SANDBOX,
            subscriptionKey: process.env.SUBSCRIPTION_KEY_SANDBOX
        });
        if (response.user?.status !== 201 || response.apiKey?.status !== 201) {
            return res.status(response.user?.status !== 201 ? (response.user?.status || 400) : (response.apiKey?.status || 400)).json({
                status: 'error',
                message: response.user?.status !== 201 ? (response.user?.message || 'Failed to create user') : (response.apiKey?.message || 'Failed to create API key'),
                data: response
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Sandbox API User and Key generated successfully. SAVE THESE DETAILS.',
            data: response
        });
    } catch (error) {
        console.error('MoMo API Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = { initializeSandboxUser };