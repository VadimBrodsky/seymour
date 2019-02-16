export default async function fetcher(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Network response was not ok.');
    }

    return await res.text();
  } catch (e) {
    console.error('Failed to fetch');
  }
}
