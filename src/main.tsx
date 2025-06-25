import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Global styles, including body padding for fixed header
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './contexts/AdminContext.tsx'
import Aside from './presentation/components/Aside/Aside.tsx'
import mainLayoutStyles from './main.module.css'; // CSS Modules for main layout
import Header from './presentation/components/Header/Header.tsx'; // Import Header


// This component will manage the main layout including fixed Header, Aside, and dynamic content
function MainLayout() {
    // This state would ideally be managed by Aside's internal logic or a global state if needed elsewhere
    // For now, we assume mainContentWrapperExpanded class would be dynamically added based on Aside's state.
    // This is a simplified example; true state sharing might need Context or Zustand/Redux.
    // const [isAsideExpanded, setIsAsideExpanded] = useState(false);


    // Placeholder: In a real app, Aside would communicate its expanded state
    // to adjust `mainContentWrapper`'s padding. For now, CSS handles initial state.
    // A more robust solution might involve CSS variables updated by JS, or a global layout context.

    // Check if the current route is the login route
    const isLoginRoute = window.location.pathname === '/loggin';

    if (isLoginRoute) {
        return <App />; // Render only App for login page (which routes to LogginPage)
    }

    // For all other routes, render the full layout
    return (
        <>
            <Header /> {/* Header is fixed, App.css/Header.module.css handles its styling */}
            <div className={mainLayoutStyles.appContainer}>
                <Aside />
                {/* The mainContentWrapper class from main.module.css handles padding for desktop Aside */}
                {/* A class like mainLayoutStyles.mainContentWrapperExpanded would be needed if Aside expands */}
                <main className={mainLayoutStyles.mainContentWrapper}>
                    <App /> {/* App component now primarily handles routing for content area */}
                </main>
            </div>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </AdminProvider>
  </React.StrictMode>,
)
