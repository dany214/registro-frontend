import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterCreditPage from '../pages/RegisterCreditPage';
import CreditListPage from '../pages/CreditListPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Registrar Crédito</Link> | <Link to="/credits">Consultar Créditos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RegisterCreditPage />} />
        <Route path="/credits" element={<CreditListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
