import type { Metadata } from 'next';
import ConfigureClient from './ConfigureClient';

export const metadata: Metadata = {
  title: 'Configure Your JPC Trailer | Industrial Custom Build',
  description: 'Design and specify your professional aluminium trailer online. High-performance multi-axle transporters and custom fleet solutions.',
};

export default function ConfigurePage() {
  return <ConfigureClient />;
}
