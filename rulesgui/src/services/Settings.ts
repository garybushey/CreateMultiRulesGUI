export async function fetchSettings() {

    const response = await fetch('/api/settings');
    return await response.json();
}