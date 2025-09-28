import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import {
  AuthProvider,
  BuyerProvider,
  ContractProvider,
  IpfsProvider,
  SellerProvider,
  SidebarProvider,
  ThemeProvider,
  ToastProvider
} from './context';
import './index.css';
import { AboutPage } from './pages/AboutPage';
import { ActivityPage } from './pages/ActivityPage';
import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true, pt: Tailwind }}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ContractProvider>
              <IpfsProvider>
                <SellerProvider>
                  <BuyerProvider>
                    <SidebarProvider>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Layout />}>
                            <Route index element={<BuyPage />} />
                            <Route path="sell" element={<SellPage />} />
                            <Route path="activity" element={<ActivityPage />} />
                            <Route path="about" element={<AboutPage />} />
                          </Route>
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </BrowserRouter>
                    </SidebarProvider>
                  </BuyerProvider>
                </SellerProvider>
              </IpfsProvider>
            </ContractProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </PrimeReactProvider>
  </StrictMode>
);
