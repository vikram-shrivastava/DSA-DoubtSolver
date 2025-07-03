import useThemeStore from '../store/useThemeStore.js'
import useAuthStore from '../store/useAuthstore.js'
function Profile() {
  const { user, isLoggedIn, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div>
      <h1>Welcome {isLoggedIn ? user.name : 'Guest'}</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
    </div>
  )
}
