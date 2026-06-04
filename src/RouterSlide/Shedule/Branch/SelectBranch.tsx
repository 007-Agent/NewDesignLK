import React from 'react';
import Select from 'react-select';
import { MapPin } from 'lucide-react';

export interface Branch {
  address: string;
  id: number;
  name: string;
}
export interface MainSelectEvent {
  name: string;
  data?: any;
  item: Branch | null;
  value: number | null;
}

interface SelectBranchProps {
  value: MainSelectEvent  | null;  // ← теперь храним весь объект Branch
  onChange: (event: MainSelectEvent) => void;  // ← передаём весь объект
  options: Branch[];
  disabled?: boolean;
  name: string;
  branchId:number;

}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? '#2197ed' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 1px #2197ed' : 'none',
    '&:hover': { borderColor: '#2197ed' },
    padding: '2px 0',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#9ca3af',
  }),
};

export const SelectBranch: React.FC<SelectBranchProps> = ({ 
  name,
  value, 
  onChange, 
  options, 
  disabled 
}) => {
  const branchOptions = options.map((branch) => ({
    value: branch.id,
    label: branch.name,
    item: branch,
  }));

  const selectedOption = branchOptions.find(opt => opt.value === value?.value);

  const handleChange = (option: any) => {
    console.log('SelectBranch option:', option); 
    const event = {
      name: name,
      data: undefined,
      item: option?.item || null,
      value: option?.value || null,
    };
    onChange(event);
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
        <MapPin className="w-4 h-4 text-gray-400" />
        Филиал
      </label>
      <Select
        options={branchOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Выберите филиал"
        isDisabled={disabled}
        isClearable
        styles={customStyles}
      />
    </div>
  );
};