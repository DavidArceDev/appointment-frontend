export const getToken = () => {
  return localStorage.getItem('token')
}

export const getCurrentUser = () => {
    const patient =
        localStorage.getItem('patient')

    return patient
        ? JSON.parse(patient)
        : null
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('patient')
}