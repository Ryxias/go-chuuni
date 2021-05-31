/* global localStorage */
export const THEME_KEY = 'theme'
export const AUTH_TOKEN_KEY = 'authToken'

export const setValue = (key, value) => localStorage.setItem(key, value)

export const getValue = key => localStorage.getItem(key)

export const loadTheme = () => {
  return getValue(THEME_KEY)
}

export const saveTheme = ({ theme }) => {
  setValue(THEME_KEY, theme)
  return theme
}

// export const loadAuthToken = () => {
//   return getValue(AUTH_TOKEN_KEY)
// }

// export const saveAuthToken = ({ authToken }) => {
//   setValue(AUTH_TOKEN_KEY, authToken)
//   return authToken
// }
