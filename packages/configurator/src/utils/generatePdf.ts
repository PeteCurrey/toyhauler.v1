import { jsPDF } from 'jspdf';
import { ConfiguratorState } from '@jpc/types';

export const generateSpecSheet = (state: ConfiguratorState, configRef: string) => {
  const doc = new jsPDF();
  const accent = '#E8500A';

  // Header
  doc.setFillColor(8, 8, 8);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('JPC TRAILERS // SPEC SHEET', 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(accent);
  doc.text(`CONFIG REF: #${configRef}`, 150, 25);

  // Body
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  let y = 60;
  const addRow = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label.toUpperCase(), 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 100, y);
    y += 10;
    doc.setDrawColor(230, 230, 230);
    doc.line(20, y - 5, 190, y - 5);
    y += 5;
  };

  addRow('Base Model', state.baseModel);
  addRow('Dimensions', `${state.dimensions.length}ft x ${state.dimensions.width}ft x ${state.dimensions.height}ft`);
  addRow('Axle Config', state.axleConfig);
  addRow('Exterior Finish', state.exteriorFinish);
  addRow('Interior Pkg', state.interiorPackage);
  addRow('Doors', `${state.doors.rear} rear, side: ${state.doors.side ? 'yes' : 'no'}`);
  addRow('Accessories', state.accessories.join(', ') || 'None selected');

  y += 10;
  doc.setFontSize(16);
  doc.setTextColor(accent);
  doc.text(`ESTIMATED TOTAL: £${state.estimatedPrice.toLocaleString()}`, 20, y);

  y += 20;
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  const disclaimer = [
    'This is an indicative specification generated at toyhauler.co.uk / jpctrailers.co.uk.',
    'All prices include VAT. Final specification and pricing subject to technical review.',
    'Build slots are only confirmed upon payment of deposit.'
  ];
  disclaimer.forEach((line, i) => {
    doc.text(line, 20, y + (i * 5));
  });

  doc.save(`JPC-SPEC-${configRef}.pdf`);
};
