import { useEffect, useState } from 'react';
import { getCredits } from '../api/creditService';
import type { Credit } from '../types/Credit';
import CreditTable from '../components/creditView/CreditTable';

export default function CreditListPage() {
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    getCredits().then(setCredits);
  }, []);

  return (
    <div>
      <CreditTable credits={credits} />
    </div>
  );
}
