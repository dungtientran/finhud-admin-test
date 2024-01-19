import { CognitoIdentityProviderClient, AddCustomAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
const client = new CognitoIdentityProviderClient({ region: process.env.REGION });

export default client
