import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/styles/global.css'
import Router from '../src/components/Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
)
