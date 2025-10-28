import { useState } from 'react';
import { createCredit } from '../../api/creditService';
import type { Credit } from '../../types/Credit';
import './creditForm.css';

export default function CreditForm() {
  const [form, setForm] = useState<Credit>({
    clientName: '',
    clientId: '',
    amount: 0,
    interestRate: 0,
    termMonths: 0,
    commercial: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCredit(form);
      alert('Crédito registrado correctamente');
      setForm({ clientName: '', clientId: '', amount: 0, interestRate: 0, termMonths: 0, commercial: '' });
    } catch (err) {
      alert('Error al registrar el crédito');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="credit-form-container">
      <h2>Registro de Crédito</h2>
      <form className="credit-form" onSubmit={handleSubmit}>
        <label>
          Nombre del cliente:
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cédula:
          <input
            type="text"
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Valor del crédito:
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tasa de interés (%):
          <input
            type="number"
            name="interestRate"
            value={form.interestRate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Plazo (meses):
          <input
            type="number"
            name="termMonths"
            value={form.termMonths}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comercial:
          <input
            type="text"
            name="commercial"
            value={form.commercial}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar crédito'}
        </button>
      </form>
    </div>
  );
}
