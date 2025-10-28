import axios from 'axios';
import type { Credit } from '../types/Credit';
const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7196/api';

export const getCredits = async (filters?: {
  clientName?: string;
  clientId?: string;
  commercial?: string;
}) => {
  const res = await axios.get(`${API_URL}/credits`, { params: filters });
  return res.data;
};

export const createCredit = async (credit: Credit) => {
  const res = await axios.post(`${API_URL}/credits`, credit);
  return res.data;
};

export const getCreditById = async (id: number) => {
  const res = await axios.get(`${API_URL}/credits/${id}`);
  return res.data;
};
