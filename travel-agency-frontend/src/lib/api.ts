// ZMIANA: Usuwamy pełny adres URL. Zostawiamy puste stringi lub sam slash.
// Proxy w vite.config.ts zajmie się przekierowaniem na port 5000.
const BASE_URL = '/api'; 

export const api = {
  get: async (endpoint: string) => {
    // endpoint ma format "/tours", więc wynik to "/api/tours"
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include', 
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  post: async (endpoint: string, data: any) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  put: async (endpoint: string, data: any) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  delete: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};
