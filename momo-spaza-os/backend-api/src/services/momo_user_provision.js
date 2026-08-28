const { v4: uuidv4 } = require('uuid');

const defaultContentType = 'application/json';

class UserProvisionAPI {
    constructor() {
        if (!UserProvisionAPI.singleton) {
            UserProvisionAPI.singleton = this;
        }
        return UserProvisionAPI.singleton;
    }

    // Create a new sandbox api user
    async createUserApi({ providerHost, subscriptionKey }) {
        const url = `${providerHost}/v1_0/apiuser`;
        const userId = uuidv4();
        const headers = {
            'X-Reference-Id': userId,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': defaultContentType,
        };
        const body = { providerCallbackHost: providerHost };

        try {
            const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Api Request failed with status ${response.status}: ${errorText}`);
                return { userid: null, status: response.status, message: `Api Request failed with status ${response.status}: ${errorText}` };
            }
            return { userid: userId, status: response.status, message: 'User created successfully' };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return { userid: null, status: 500, message: `Error: ${error.message}` };
        }
    }

    // Get the user details for a given userId
    async getUserApi({ providerHost, subscriptionKey, userId }) {
        const url = `${providerHost}/v1_0/apiuser/${userId}`;
        const headers = {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': defaultContentType,
        };

        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Api Request failed with status ${response.status}: ${errorText}`);
                return { userid: null, status: response.status, message: `Api Request failed with status ${response.status}: ${errorText}` };
            }
            const userData = await response.json();
            return { userid: userId, status: response.status, message: 'User data retrieved successfully', data: userData };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return { userid: null, status: 500, message: `Error: ${error.message}` };
        }
    }

    // Create an API key for a given userId
    async createApiKey({ providerHost, subscriptionKey, userId }) {
        const url = `${providerHost}/v1_0/apiuser/${userId}/apikey`;
        const headers = { 'Ocp-Apim-Subscription-Key': subscriptionKey };

        try {
            const response = await fetch(url, { method: 'POST', headers });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Api Request failed with status ${response.status}: ${errorText}`);
                return { userid: null, status: response.status, message: `Api Request failed with status ${response.status}: ${errorText}` };
            }
            const apiKeyData = await response.json();
            return { userid: userId, status: response.status, message: 'API key created successfully', data: apiKeyData };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return { userid: null, status: 500, message: `Error: ${error.message}` };
        }
    }

    // Create a new user and generate an API key for that user
    async createUserAndApiKey({ providerHost, subscriptionKey }) {
        const userResponse = await this.createUserApi({ providerHost, subscriptionKey });
        if (!userResponse.userid) {
            return { user: userResponse, apiKey: null, targetEnvironment: null };
        }

        const apiKeyResponse = await this.createApiKey({ providerHost, subscriptionKey, userId: userResponse.userid });

        let targetEnvironment = null;
        if (apiKeyResponse.status === 201) {
            const userDetails = await this.getUserApi({ providerHost, subscriptionKey, userId: userResponse.userid });
            targetEnvironment = userDetails.data?.targetEnvironment ?? null;
        }

        return { user: userResponse, apiKey: apiKeyResponse, targetEnvironment };
    }
}

// Create a singleton instance of the UserProvisionAPI class
const service = new UserProvisionAPI();
Object.freeze(service);

module.exports = service;