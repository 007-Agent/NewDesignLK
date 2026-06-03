import React from 'react';
import Select from 'react-select';
import { Building2 } from 'lucide-react';

export interface Department {
  id: number;
  name: string;
  branch: {
    id: number;
    name: string;
  };
}

interface SelectDepartmentProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  options: Department[];
  selectedBranchId?: number | null;
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

// Кастомный рендер опции (показывает название отделения и филиал под ним)
const formatOptionLabel = (option: Department) => (
  <div>
    <div className="font-medium text-gray-800">{option.name}</div>
    <div className="text-xs text-gray-400">{option.branch.name}</div>
  </div>
);

export const SelectDepartment: React.FC<SelectDepartmentProps> = ({ 
  value, 
  onChange, 
  disabled, 
  options,
  selectedBranchId 
}) => {
  // Фильтруем отделения по выбранному филиалу
  const filteredOptions = selectedBranchId 
    ? options.filter(opt => opt.branch.id === selectedBranchId)
    : options;

  // Преобразуем в формат react-select
  const selectOptions = filteredOptions.map((opt) => ({
    ...opt,
    value: opt.id,
    label: opt.name,
  }));

  const selectedOption = selectOptions.find(opt => opt.value === value);

  const handleChange = (option: typeof selectedOption) => {
    onChange(option?.value ?? null);
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
        <Building2 className="w-4 h-4 text-gray-400" />
        Отделение
      </label>
      <Select
        options={selectOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Выберите отделение"
        isDisabled={disabled || filteredOptions.length === 0}
        isClearable
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
};