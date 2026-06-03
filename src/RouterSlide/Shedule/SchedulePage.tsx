import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Calendar, Clock, MapPin, Building2, User } from 'lucide-react';
import  './SchedulePage.scss'
import { SelectBranch } from './Branch/SelectBranch';
import { SelectDepartment } from './Department/SelectDepartment';
import { SelectDoctor } from './Doctors/SelectDoctor';

export interface Branch {
  address: string;
  id: number;
  name: string;
}
export interface BranchSelectEvent {
  name: string;
  data?: any;
  item: Branch | null;
  value: number | null;
}
export function SchedulePage() {

  const [branchId, setBranchId] = useState<number>(0);
const [departmentId, setDepartmentId] = useState<number>(0);
const [personId, setPersonId] = useState<number>(0);
const [year, setYear] = useState<number>(new Date().getFullYear());
const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
const [items, setItems] = useState<any[]>([]);// или более точный тип вместо any

 const [selectedBranch, setSelectedBranch] = useState<BranchSelectEvent | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const departments = useAppSelector((state) => state.departments.items);

 const personal = useAppSelector((state) => state.personal.items);
  const sheduleList = useAppSelector((state) => state.sheduleList.items);
  const branches = useAppSelector((state) => state.branches.items);

 
  console.log(selectedBranch)
 const handleBranchChange = (event: BranchSelectEvent) => {
  setSelectedBranch(event);  // ← сохраняем весь объект
  console.log('Выбран филиал:', event);
};

  return (
    <div className='shedule__header'>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h2 className="mb-1">Расписание врачей</h2>
          <p className="text-gray-600 text-sm">Выберите врача для просмотра расписания</p>
        </div>
      </div>

      {/* Selection Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectBranch 
            value={selectedBranch} 
            onChange={handleBranchChange}
            options={branches}
            branchId={branchId}
            name={'branchId'}
          />
          
          <SelectDepartment 
            value={selectedDepartment} 
            onChange={setSelectedDepartment}
            disabled={!selectedBranch}
            options={departments}
          />
          
          <SelectDoctor 
            value={selectedDoctor} 
            onChange={setSelectedDoctor}
            disabled={!selectedDepartment}
            doctors={personal}
          />
        </div>
      </div>

     
      
      {/* Empty State */}
      {!selectedDoctor && (
        <div className="bg-white rounded-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 mb-2">Выберите врача</h3>
          <p className="text-gray-400 text-sm">
            Чтобы увидеть расписание, выберите филиал, отделение и врача
          </p>
        </div>
      )}
    </div>
  );
}
