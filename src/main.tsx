import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AdminContext } from './contexts/AdminContext.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<AdminContext>
				<App />
			</AdminContext>
		</StrictMode>
	</BrowserRouter>
)
