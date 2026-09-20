import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Article,
  Articles,
  BusinessCard,
  Employees,
  Faq,
  Home,
  Legal,
  Marketer,
  Myco,
  NotFound,
  Salaries,
} from '@/screens';
import { Analytics, CookieNotice, EasterEgg, ScrollToTopOnPageLoad, WebMcp } from '@/components';
import '@/styles/_shared.scss';

export default function App() {
  return (
    <BrowserRouter>
      <a href="#content" className="skip-to-content">
        Skip to content
      </a>
      <Analytics />
      <CookieNotice />
      <ScrollToTopOnPageLoad />
      <WebMcp />
      <EasterEgg />
      <Routes>
        <Route index element={<Home />} />
        <Route path="business-card" element={<BusinessCard />} />
        <Route path="faq" element={<Faq />} />
        <Route path="legal" element={<Legal document="overview" />} />
        <Route path="privacy" element={<Legal document="privacy" />} />
        <Route path="cookies" element={<Legal document="cookies" />} />
        <Route path="terms" element={<Legal document="terms" />} />
        <Route path="accessibility" element={<Legal document="accessibility" />} />
        <Route path="salaries" element={<Salaries />} />
        <Route path="marketer" element={<Marketer />} />
        <Route path="myco" element={<Myco />} />
        <Route path="employees" element={<Employees />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="he/articles/:slug" element={<Article language="he" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
