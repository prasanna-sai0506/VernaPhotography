const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '')
  }

  return import.meta.env.DEV ? 'http://localhost:5000' : ''
}

const API_BASE = getApiBase()

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return response.json()
}

export const api = {
  getCategories: async () => handleResponse(await fetch(`${API_BASE}/api/categories`)),
  getImages: async (category) => handleResponse(await fetch(`${API_BASE}/api/images/${category}`)),
  getPlans: async () => handleResponse(await fetch(`${API_BASE}/api/plans`)),
  sendContact: async (payload) =>
    handleResponse(
      await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    ),
}
