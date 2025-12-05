# Authentication Features Added

## New Screens Created

### 1. LoginScreen.js
- Email and password login
- Form validation with Formik + Yup
- Password visibility toggle
- Link to signup page
- Stores login status in AsyncStorage

### 2. SignupScreen.js
- Full name, email, password, and confirm password fields
- Form validation (email format, password match, etc.)
- Password visibility toggles
- Checks for existing users
- Creates user account and auto-login
- Link to login page

## Features

✅ **Form Validation**
- Email format validation
- Password minimum 6 characters
- Password confirmation match
- Name length validation

✅ **User Experience**
- Password show/hide toggle
- Loading states during submission
- Success/error alerts
- Smooth navigation between screens

✅ **Security**
- Passwords stored in AsyncStorage (for demo purposes)
- Login status persistence
- Protected routes

✅ **Design**
- Beautiful gradient-style UI
- Consistent with app theme
- Responsive layout
- Keyboard-aware scrolling

## How It Works

1. **First Time User:**
   - Opens app → Sees Login screen
   - Clicks "Sign Up" → Goes to Signup screen
   - Fills form → Creates account
   - Auto-logged in → Goes to Home screen

2. **Returning User:**
   - Opens app → Checks login status
   - If logged in → Goes directly to Home screen
   - If not logged in → Shows Login screen

3. **Logout:**
   - Click "Logout" button in header
   - Confirms logout
   - Returns to Login screen

## Storage Keys

- `@user` - Stores user data (name, email, password)
- `@isLoggedIn` - Stores login status (true/false)

## Testing

1. **Signup Flow:**
   - Open app
   - Click "Sign Up"
   - Fill all fields
   - Submit → Should create account and go to Home

2. **Login Flow:**
   - Logout from Home
   - Enter credentials
   - Submit → Should login and go to Home

3. **Validation:**
   - Try invalid email → Should show error
   - Try short password → Should show error
   - Try mismatched passwords → Should show error

## Note

⚠️ This is a basic authentication for demo purposes. For production:
- Use secure backend API
- Encrypt passwords
- Use JWT tokens
- Implement proper session management
- Add forgot password feature
- Add email verification
