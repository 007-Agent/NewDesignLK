import React from 'react';
import Select from 'react-select';
import { User } from 'lucide-react';

export interface Personal {
  id: number;
  name: string;
  branch: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
}


interface SelectDoctorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  doctors: Personal[];
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? '#2197ed' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 1px #2197ed' : 'none',
    '&:hover': { borderColor: '#2197ed' },
  }),
};

export const SelectDoctor: React.FC<SelectDoctorProps> = ({ 
  value, 
  onChange, 
  disabled, 
  doctors 
}) => {
  const options = doctors.map(d => ({
    value: d.name,
    label: d.name,
  }));
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div>
      <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
        <User className="w-4 h-4 text-gray-400" />
        Врач
      </label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => onChange((option as any)?.value || '')}
        placeholder="Выберите врача"
        isDisabled={disabled}
        styles={customStyles}
      />
    </div>
  );
};
