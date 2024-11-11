export async function fetchSettings() {

    const value = { "subscriptionID": "9790d913-b5da-460d-b167-ac985d5f3b83", "workspaceName": "gabazuresentinel", "resourceGroupName": "azuresentinel", "appClientID": "5ee546a5-ff26-474f-a8eb-70d4f8e14fe9" };
    const response = await fetch('/api/settings');
    //return await response.json();
    return await value;
}