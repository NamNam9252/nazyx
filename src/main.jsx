import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'
import App from './App'
import { ClickProvider } from "./context/ClickContext";
import Temp from './Temp.jsx';


createRoot(document.getElementById('root')).render(
  
<ClickProvider>
  <App/>
</ClickProvider>

)

