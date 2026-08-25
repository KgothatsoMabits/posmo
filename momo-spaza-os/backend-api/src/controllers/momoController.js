const { collections } = require('../config/momoConfig');
const { v4: uuidv4 } = require('uuid');

const initializeSandboxUser = async (req, res) => {
    try {
        const referenceId = uuidv4();
        console.log(`Generating API User with UUID: ${referenceId}`);

        // 1. Create the API User
        await collections.createApiUser(referenceId);
        
        // 2. Generate the API Key for this user
        const apiKey = await collections.createApiKey(referenceId);
        
        res.status(201).json({
            status: 'success',
            message: 'Sandbox API User and Key generated successfully. SAVE THESE DETAILS.',
            data: {
                apiUserId: referenceId,
                apiKey: apiKey.apiKey
            }
        });
    } catch (error) {
        console.error('MoMo API Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = { initializeSandboxUser };