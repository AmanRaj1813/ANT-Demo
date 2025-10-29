# AI Agent Instructions for my-react-app

## Project Overview
This is a React application built with Vite, using Ant Design (antd) components and Redux Toolkit for state management. The app implements a user management system with CRUD operations.

## Architecture

### Core Technologies
- React 19 with Vite for build tooling
- Redux Toolkit for state management
- Ant Design for UI components
- Axios for API calls
- Recharts for data visualization

### Key Structural Patterns
1. **Feature-based Organization**
   - Features are organized under `src/features/` (e.g., `users/`)
   - Each feature contains its components and Redux slice
   - Example: `features/users/` contains `UsersPage.jsx`, `UserForm.jsx`, `UserChart.jsx`, and `usersSlice.js`

2. **Redux Pattern**
   - Redux slices use `createSlice` and `createAsyncThunk` from Redux Toolkit
   - Async operations are handled via thunks (see `usersSlice.js`)
   - Store configuration in `src/app/store.js`

3. **API Integration**
   - Centralized API client in `src/api/client.js`
   - Uses Axios with base configuration
   - Backend expects JSON server at `http://localhost:9600`

## Development Workflow

### Getting Started
```bash
npm install
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # Run ESLint
```

### Development Server Requirements
- JSON server must be running at port 9600 (`db.json`)
- Vite dev server will start on port 5173 by default

## Common Patterns and Conventions

### Component Structure
- Layout components go in `components/layout/`
- Feature components are co-located with their feature
- Components use Ant Design elements
- Forms should use Ant Design Form components

### State Management
- Use Redux for global state
- Follow Redux Toolkit patterns for actions and reducers
- Async operations should use `createAsyncThunk`

### API Calls
- Always use the centralized `client` from `api/client.js`
- Handle loading and error states in components
- Follow RESTful patterns for endpoints

## Tips for AI Agents
1. When adding new features:
   - Create a new directory under `src/features/`
   - Include Redux slice if state management is needed
   - Follow existing patterns in `users` feature as reference

2. When modifying existing features:
   - Check `usersSlice.js` for state management patterns
   - Follow Ant Design component patterns from existing components

3. Error handling:
   - API errors should be handled in thunks and components
   - Use Ant Design's message/notification system for user feedback