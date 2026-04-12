import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Commission | ToyHauler.co.uk',
};

export default function CommissionPage() {
  // Server-side redirect to the parent company commission page
  redirect('https://jpctrailers.co.uk/commission?ref=toyhauler');
}
