module.exports = async function (context, req) {

    const subscriptionID = process.env.REACT_APP_SUBSCRIPTION_ID;
    const workspaceName =  process.env.REACT_APP_WORKSPACE_NAME;
    const resourceGroupName = process.env.REACT_APP_RESOURCE_GROUP_NAME;
    const appClientID = process.env.REACT_APP_CLIENT_ID

    context.res = {
        status: 200,
        body: {subscriptionID, workspaceName, resourceGroupName, appClientID}
    };
};
