import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container: HTMLElement = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
