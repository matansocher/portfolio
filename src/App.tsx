import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BusinessCard, Home, Salaries, Myco, Marketer, Employees, Articles, Article, NotFound } from '@/screens';
import { Analytics, ScrollToTopOnPageLoad, WebMcp } from '@/components';
import '@/styles/_shared.scss';

export default function App() {
  return (
    <BrowserRouter>
      <a href="#content" className="skip-to-content">
        Skip to content
      </a>
      <Analytics />
      <ScrollToTopOnPageLoad />
      <WebMcp />
      <Routes>
        <Route index element={<Home />} />
        <Route path="business-card" element={<BusinessCard />} />
        <Route path="salaries" element={<Salaries />} />
        <Route path="marketer" element={<Marketer />} />
        <Route path="myco" element={<Myco />} />
        <Route path="employees" element={<Employees />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
