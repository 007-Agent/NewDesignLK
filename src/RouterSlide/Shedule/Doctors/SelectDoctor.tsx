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

export interface MainSelectEvent {
  name: string;
  data?: any;
  item: Personal | null;
  value: number | null;
}

interface SelectDoctorProps {
  value: MainSelectEvent | null;
  onChange: (event: MainSelectEvent) => void;
  disabled?: boolean;
  options: Personal[];
  name: string;
  branchId?: number;
  departmentId?: number;
  personId?: number;
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
function filter(items: any[], branchId?: number, departmentId?: number) {
    if (items) {
        return items.filter((v:any) => {
            return (!branchId || v.branch.id === branchId) && (!departmentId || v.department.id === departmentId);
        });
    } else {
        return [];
    }
}

const formatOptionLabel = (option: any) => (
  <div>
    <div className="font-medium text-gray-800">{option.label}</div>
    <div className="text-xs text-gray-400">{option.item?.department?.name}</div>
  </div>
);




export const SelectDoctor: React.FC<SelectDoctorProps> = ({ 
  value, 
  onChange, 
  disabled, 
  options,
  name,
  departmentId,
  branchId,
}) => {
    const filteredDoctors = filter(options, branchId, departmentId);
  const selectOptions = filteredDoctors.map((doctor : any) => ({
    value: doctor.id,
    label: doctor.name,
    item: doctor,  // ← сохраняем полный объект врача
  }));
  console.log('options length:', options.length);
  const selectedOption = selectOptions.find((opt) => opt.value === value?.value);
  console.log(selectOptions, "proverka")
  const handleChange = (option: any) => {
    const event: MainSelectEvent = {
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
        <User className="w-4 h-4 text-gray-400" />
        Врач
      </label>
      <Select
        options={selectOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Выберите врача"
        isDisabled={disabled}
        isClearable
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
};