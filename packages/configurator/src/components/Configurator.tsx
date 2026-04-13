'use client';

import React, { useState } from 'react';
import { useConfigStore } from '../store/useConfigStore';
import { TrailerSVG } from '../visualizer/TrailerSVG';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STEPS = [
  'Base Model',
  'Dimensions',
  'Axle Config',
  'Exterior',
  'Doors',
  'Interior',
  'Accessories',
  'Summary'
];

interface ConfiguratorProps {
  sourceDomain: string;
  accentColour?: string;
  onCommission?: (config: any) => void;
  supabaseUrl?: string;
  supabaseKey?: string;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ 
  sourceDomain, 
  accentColour = '#E8500A',
  onCommission 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const store = useConfigStore();

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg text-text-primary font-inter overflow-hidden">
      {/* Left Panel - Control panel */}
      <div className="w-full lg:w-[40%] flex flex-col bg-surface-raised border-r border-border h-screen">
        <div className="p-8 border-b border-border">
          <div className="flex justify-between items-center mb-6">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="font-mono text-accent font-bold">
              EST. £{store.estimatedPrice.toLocaleString()}
            </span>
          </div>
          <h2 className="text-3xl font-syne font-bold uppercase tracking-tight">
            {STEPS[currentStep]}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <BaseModelStep />}
              {currentStep === 1 && <DimensionsStep />}
              {currentStep === 2 && <AxleStep />}
              {currentStep === 3 && <FinishStep />}
              {currentStep === 4 && <DoorsStep />}
              {currentStep === 5 && <InteriorStep />}
              {currentStep === 6 && <AccessoriesStep />}
              {currentStep === 7 && <SummaryStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-8 border-t border-border flex justify-between gap-4">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex-1 py-4 border border-border hover:border-accent transition-colors disabled:opacity-30 disabled:hover:border-border font-mono uppercase text-sm tracking-widest"
          >
            ← Back
          </button>
          <button 
            onClick={nextStep}
            className="flex-1 py-4 bg-accent text-white hover:bg-opacity-90 transition-all font-mono uppercase text-sm tracking-widest"
          >
            {currentStep === STEPS.length - 1 ? 'Finish & Save' : 'Next Step →'}
          </button>
        </div>
      </div>

      {/* Right Panel - Visualizer */}
      <div className="w-full lg:w-[60%] bg-bg relative flex items-center justify-center h-screen lg:h-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        <TrailerSVG />
        
        <div className="absolute bottom-12 right-12 text-right">
          <p className="font-mono text-[10px] text-text-muted mb-2 tracking-[0.2em] uppercase">Current Specification</p>
          <p className="text-xl font-syne font-bold">{store.baseModel} // {store.dimensions.length}ft LUXURY BUILD</p>
        </div>
      </div>
    </div>
  );
};


const AxleStep = () => {
  const { axleConfig, setAxleConfig, baseModel } = useConfigStore();
  const options = [
    { id: 'single', label: 'Single Axle', desc: 'Up to 1,500kg. Lighter.' },
    { id: 'twin-std', label: 'Twin Axle Standard', desc: 'Up to 3,500kg. Stable.' },
    { id: 'twin-hd', label: 'Twin Axle Heavy Duty', desc: 'Up to 3,500kg+. Performance.' },
    { id: 'triple', label: 'Triple Axle', desc: 'Commercial grade. 28ft+ only.' },
  ];

  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setAxleConfig(opt.id as any)}
          disabled={opt.id === 'triple' && baseModel === 'JPC-CH'}
          className={cn(
            "w-full p-6 text-left border transition-all disabled:opacity-30",
            axleConfig === opt.id ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-text-muted"
          )}
        >
          <div className="font-mono text-[10px] text-accent mb-1 uppercase tracking-widest">{opt.id}</div>
          <h3 className="text-xl font-syne font-bold mb-1">{opt.label}</h3>
          <p className="text-sm text-text-muted">{opt.desc}</p>
        </button>
      ))}
    </div>
  );
};

const FinishStep = () => {
  const { exteriorFinish, setExteriorFinish } = useConfigStore();
  const finishes = [
    { id: 'MILL ALUMINIUM', hex: '#666' },
    { id: 'BRUSHED ALUMINIUM', hex: '#999' },
    { id: 'GLOSS BLACK', hex: '#000' },
    { id: 'SATIN WHITE', hex: '#ddd' },
    { id: 'CUSTOM RAL', hex: 'linear-gradient(45deg, red, blue, green)' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {finishes.map((f) => (
        <button
          key={f.id}
          onClick={() => setExteriorFinish(f.id)}
          className={cn(
            "flex items-center gap-6 p-6 border transition-all text-left",
            exteriorFinish === f.id ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-text-muted"
          )}
        >
          <div 
            className="w-16 h-16 border border-white/10" 
            style={{ 
              background: f.hex.startsWith('linear') ? f.hex : f.hex,
            }} 
          />
          <div>
            <h3 className="font-syne font-bold text-lg">{f.id}</h3>
            <p className="text-xs text-text-muted font-mono tracking-widest">+£{f.id.includes('BLACK') || f.id.includes('WHITE') ? '900' : '0'}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const DoorsStep = () => {
  const { doors, setDoors, baseModel } = useConfigStore();
  if (baseModel === 'JPC-CH') return <div className="py-20 text-center text-text-muted font-mono text-sm">Doors not applicable to Car Hauler.</div>;

  return (
    <div className="space-y-8">
      <div>
        <label className="block font-mono text-[10px] text-text-muted mb-4 uppercase tracking-widest">Rear Access</label>
        <div className="flex gap-4">
          <button onClick={() => setDoors({ rear: 'ramp' })} className={cn("flex-1 py-4 border", doors.rear === 'ramp' ? "border-accent bg-accent/5" : "border-border bg-surface")}>RAMP DOOR</button>
          <button onClick={() => setDoors({ rear: 'barn' })} className={cn("flex-1 py-4 border", doors.rear === 'barn' ? "border-accent bg-accent/5" : "border-border bg-surface")}>BARN DOORS</button>
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] text-text-muted mb-4 uppercase tracking-widest">Front Profile</label>
        <div className="flex gap-4">
          <button onClick={() => setDoors({ front: 'v-nose' })} className={cn("flex-1 py-4 border", doors.front === 'v-nose' ? "border-accent bg-accent/5" : "border-border bg-surface")}>V-NOSE</button>
          <button onClick={() => setDoors({ front: 'flat' })} className={cn("flex-1 py-4 border", doors.front === 'flat' ? "border-accent bg-accent/5" : "border-border bg-surface")}>FLAT FRONT</button>
        </div>
      </div>
      <button 
        onClick={() => setDoors({ side: !doors.side })}
        className={cn("w-full py-4 border flex items-center justify-between px-6", doors.side ? "border-accent bg-accent/5" : "border-border bg-surface")}
      >
        <span className="font-syne font-bold">SIDE PERSONAL DOOR</span>
        <div className={cn("w-4 h-4 border", doors.side ? "bg-accent border-accent" : "border-border")} />
      </button>
    </div>
  );
};

const InteriorStep = () => {
  const { interiorPackage, setInteriorPackage } = useConfigStore();
  const pkgs = [
    { id: 'bare', label: 'Bare Shell', price: 0 },
    { id: 'workshop', label: 'Workshop Ready', price: 1200 },
    { id: 'motorsport', label: 'Motorsport Spec', price: 2800 },
    { id: 'luxury', label: 'Luxury Car Storage', price: 3800 },
  ];

  return (
    <div className="space-y-4">
      {pkgs.map((pkg) => (
        <button
          key={pkg.id}
          onClick={() => setInteriorPackage(pkg.id as any)}
          className={cn("w-full p-6 border text-left flex justify-between items-center", interiorPackage === pkg.id ? "border-accent bg-accent/5" : "border-border bg-surface")}
        >
          <div>
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight">{pkg.label}</h3>
            <p className="text-xs font-mono text-text-muted italic tracking-widest">Base interior configuration</p>
          </div>
          <span className="font-mono text-accent">+£{pkg.price.toLocaleString()}</span>
        </button>
      ))}
    </div>
  );
};

const AccessoriesStep = () => {
  const { accessories, setAccessories } = useConfigStore();
  const items = [
    'Electric Winch', 'Solar Panel Prep', 'Tyre Rack', 'Tool Storage', 'LED Exterior Lighting', 'Engraved Build Plate'
  ];

  const toggle = (item: string) => {
    if (accessories.includes(item)) setAccessories(accessories.filter(a => a !== item));
    else setAccessories([...accessories, item]);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => toggle(item)}
          className={cn("p-4 border text-left flex justify-between items-center transition-all", accessories.includes(item) ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-text-muted")}
        >
          <span className="font-mono text-xs uppercase tracking-widest">{item}</span>
          <div className={cn("w-4 h-4 border", accessories.includes(item) ? "bg-accent border-accent" : "border-border")} />
        </button>
      ))}
    </div>
  );
};

const SummaryStep = () => {
  const store = useConfigStore();
  const [isSaving, setIsSaving] = useState(false);
  const [configRef, setConfigRef] = useState<string | null>(null);

  const handleDownload = async () => {
    const { generateSpecSheet } = await import('../utils/generatePdf');
    generateSpecSheet(store, configRef || 'DRAFT');
  };

  const handleShare = async () => {
    setIsSaving(true);
    // Simulate Supabase save or real save if creds provided
    const ref = `JPC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    await new Promise(r => setTimeout(r, 1000));
    setConfigRef(ref);
    setIsSaving(false);
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?config=${ref}`);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 border border-border">
        <p className="font-mono text-[10px] text-accent mb-4 tracking-widest uppercase">Specification Summary</p>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
            <span className="text-text-muted">Model</span>
            <span className="font-mono uppercase">{store.baseModel}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
            <span className="text-text-muted">Dimensions</span>
            <span className="font-mono">{store.dimensions.length}x{store.dimensions.width}x{store.dimensions.height}ft</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
            <span className="text-text-muted">Axles</span>
            <span className="font-mono uppercase">{store.axleConfig}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
            <span className="text-text-muted">Finish</span>
            <span className="font-mono uppercase">{store.exteriorFinish}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
            <span className="text-text-muted">Interior</span>
            <span className="font-mono uppercase">{store.interiorPackage}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-accent/10 p-6 border border-accent/20">
        <p className="text-sm text-center mb-1 text-text-muted italic">Estimated Total Build</p>
        <p className="text-4xl text-center font-syne font-bold text-accent">£{store.estimatedPrice.toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={handleDownload}
          className="w-full py-4 border border-border hover:border-text-primary transition-all font-mono text-xs tracking-widest uppercase"
        >
          Download PDF Spec Sheet
        </button>
        <button 
          onClick={handleShare}
          disabled={isSaving}
          className="w-full py-4 border border-border hover:border-text-primary transition-all font-mono text-xs tracking-widest uppercase"
        >
          {isSaving ? 'Saving...' : 'Share This Build'}
        </button>
        <button 
          className="w-full py-5 bg-accent text-white font-syne font-bold tracking-tight hover:scale-[1.02] transition-transform uppercase"
        >
          Commission This Build →
        </button>
      </div>
      
      <p className="text-[10px] text-text-muted font-mono leading-relaxed text-center italic">
        * Pricing is indicative and includes VAT. Final quote confirmed at technical specification stage.
      </p>
    </div>
  );
};
