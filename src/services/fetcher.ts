import { CORS_PROXY_URL } from '../utils/config';

export default async function fetcher(url: string) {
  try {
    const corsProxy = ''
    const res = await fetch(`${CORS_PROXY_URL}/${url}`, {
      mode: 'cors', // no-cors
    });

    if (!res.ok) {
      throw new Error('Network response was not ok.');
    }

    return await res.text();
  } catch (e) {
    throw new Error(e.message);
  }
}
