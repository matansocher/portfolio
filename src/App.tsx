import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BusinessCard, Home, Salaries, Myco, Marketer, Employees, About, Projects, Articles, Article, Contact } from '@/screens';
import { ScrollToTopOnPageLoad, ContactButton } from '@/components';
import '@/styles/_shared.scss';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnPageLoad />
      <ContactButton />
      <Routes>
        <Route path="business-card" element={<BusinessCard />} />
        <Route path="salaries" element={<Salaries />} />
        <Route path="marketer" element={<Marketer />} />
        <Route path="myco" element={<Myco />} />
        <Route path="employees" element={<Employees />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
