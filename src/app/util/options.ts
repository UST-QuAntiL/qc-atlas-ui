import { Option } from '../components/generics/property-input/select-input.component';

export const sketchOptions: Option[] = [
  { value: 'PSEUDOCODE', label: 'Pseudocode' },
  { value: 'CIRCUIT', label: 'Circuit' },
  { value: 'ISING_MODEL', label: 'Ising model' },
];
export const quantumComputationModelOptions: Option[] = [
  { value: 'GATE_BASED', label: 'Gate based' },
  { value: 'MEASUREMENT_BASED', label: 'Measurement based' },
  { value: 'QUANTUM_ANNEALING', label: 'Quantum Annealing' },
];
