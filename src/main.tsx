import { createRoot } from 'react-dom/client'
import {StrictMode} from "react";
import AppWrapper from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
)
