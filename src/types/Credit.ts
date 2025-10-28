export interface Credit {
  id?: number;
  clientName: string;
  clientId: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  commercial: string;
  createdAt?: string;
}
