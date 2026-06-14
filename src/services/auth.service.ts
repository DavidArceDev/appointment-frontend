const API_URL = `${import.meta.env.VITE_API_URL}/auth`
export const register = async (data:any) => {
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const login = async (data:any) => {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}