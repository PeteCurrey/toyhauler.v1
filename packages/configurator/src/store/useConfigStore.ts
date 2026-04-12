import { create } from 'zustand';
import { ConfiguratorState } from '@jpc/types';

interface ConfigStore extends ConfiguratorState {
  setBaseModel: (model: ConfiguratorState['baseModel']) => void;
  setDimensions: (dims: Partial<ConfiguratorState['dimensions']>) => void;
  setAxleConfig: (axle: ConfiguratorState['axleConfig']) => void;
  setExteriorFinish: (finish: string) => void;
  setDoors: (doors: Partial<ConfiguratorState['doors']>) => void;
  setInteriorPackage: (pkg: ConfiguratorState['interiorPackage']) => void;
  setAccessories: (accessories: string[]) => void;
  calculatePrice: () => void;
  reset: () => void;
}

const BASE_PRICES = {
  'JPC-CH': 4500,
  'JPC-EX': 7500,
  'JPC-BESPOKE': 10000,
};

const INITIAL_STATE: ConfiguratorState = {
  baseModel: 'JPC-EX',
  dimensions: {
    length: 20,
    width: 8.5,
    height: 6.5,
  },
  axleConfig: 'twin-std',
  exteriorFinish: 'MILL ALUMINIUM',
  doors: {
    rear: 'ramp',
    side: true,
    front: 'v-nose',
  },
  interiorPackage: 'workshop',
  accessories: [],
  estimatedPrice: 7500,
};

export const useConfigStore = create<ConfigStore>((set, get) => ({
  ...INITIAL_STATE,

  setBaseModel: (model) => {
    set({ baseModel: model });
    get().calculatePrice();
  },

  setDimensions: (dims) => {
    set((state) => ({ dimensions: { ...state.dimensions, ...dims } }));
    get().calculatePrice();
  },

  setAxleConfig: (axle) => {
    set({ axleConfig: axle });
    get().calculatePrice();
  },

  setExteriorFinish: (finish) => set({ exteriorFinish: finish }),

  setDoors: (doors) => set((state) => ({ doors: { ...state.doors, ...doors } })),

  setInteriorPackage: (pkg) => {
    set({ interiorPackage: pkg });
    get().calculatePrice();
  },

  setAccessories: (accessories) => {
    set({ accessories });
    get().calculatePrice();
  },

  calculatePrice: () => {
    const state = get();
    let total = BASE_PRICES[state.baseModel];

    // Dimensions (very simplified logic for the demo)
    if (state.baseModel === 'JPC-EX') {
      if (state.dimensions.length > 20) total += (state.dimensions.length - 20) * 200;
      if (state.dimensions.width > 7) total += 600;
      if (state.dimensions.height > 6) total += 400;
    }

    // Axles
    if (state.axleConfig === 'twin-std') total += 800;
    if (state.axleConfig === 'twin-hd') total += 1400;
    if (state.axleConfig === 'triple') total += 2200;

    // Interior
    if (state.interiorPackage === 'workshop') total += 1200;
    if (state.interiorPackage === 'motorsport') total += 2800;
    if (state.interiorPackage === 'luxury') total += 3800;

    // Accessories
    total += state.accessories.length * 250; // simple average

    set({ estimatedPrice: total });
  },

  reset: () => set(INITIAL_STATE),
}));
