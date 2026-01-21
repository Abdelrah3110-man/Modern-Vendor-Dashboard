/*
 * @copyright 2026 abdelrahman
 * @license Apache-2.0
 */

/*
 * node modules
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/*
 * style
 */
import './index.css';

/*
 * components
 */
import { App } from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
