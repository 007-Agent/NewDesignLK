import React, {useState, useEffect} from 'react';
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

export interface MainSelectEvent {
  name: string;
  data?: any;
  item: Department | null;
  value: number | null;
}

interface SelectDepartmentProps {
  value: MainSelectEvent | null;
  onChange: (event: MainSelectEvent) => void;
  disabled?: boolean;
  options: Department[];
  
  name: string;
  branchId: number;
  departmentId: number;
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

function filter(items: any, branchId : number) {
    if (items) {
        return items.filter((v : any) => {
            return !branchId || v.branch.id === branchId;
        });
    } else {
        return [];
    }
}

const formatOptionLabel = (option: any) => {
  console.log('formatOptionLabel called with:', option);
  return (
    <div>
      <div className="font-medium text-gray-800">{option.label}</div>
      <div className="text-xs text-gray-400">{option.item?.branch?.name}</div>
    </div>
  );
};

export const SelectDepartment: React.FC<SelectDepartmentProps> = ({ 
  value, 
  onChange, 
  disabled, 
  options,
  branchId,
  name,
}) => {
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
    useEffect(() => {
  const filtered = filter(options, branchId);
  setFilteredOptions(filtered);
}, [options, branchId]);
//   const filteredOptions = branchId 
//     ? options.filter(opt => opt.branch.id === branchId)
//     : options;

  // ✅ Правильно: сохраняем item (полный объект)
  const selectOptions = filteredOptions.map((opt) => ({
    value: opt.id,
    label: opt.name,
    item: opt,  // ← ключевое исправление!
  }));

  const selectedOption = selectOptions.find(opt => opt.value === value?.value);
  console.log(selectOptions, "result 11")
  console.log('filteredOptions length:', filteredOptions.length);
  console.log('options length:', options.length);
  console.log('value?.value:', value?.value);
console.log('selectedOption:', selectedOption);


  const handleChange = (option: any) => {
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