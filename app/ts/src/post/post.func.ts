import { Respond } from './post.interface';

const host = 'http://api.gastom.com.tw:48080/';
export async function sendRequest(url: string, content: any): Promise<Respond> {
    try {
        const response = await fetch(host + url, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const body = await response.json();
        return body;
    } catch (err) {
        throw err;
    }
}

