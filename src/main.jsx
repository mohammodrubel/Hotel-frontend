import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ConfigProvider } from "antd";
import themeConfig from '../theme/themeConfig';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
