import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Calendar, Clock, MapPin, Building2, User } from 'lucide-react';
import  './SchedulePage.scss'
import { SelectBranch } from './Branch/SelectBranch';
import { SelectDepartment } from './Department/SelectDepartment';
import { SelectDoctor } from './Doctors/SelectDoctor';
import { clone } from '../../utils/utils';

interface ScheduleState {
  branchId: number;
  departmentId: number;
  personId: number;
  year: number;
  month: number;
  items: any[];
}
export interface Branch {
  address: string;
  id: number;
  name: string;
}
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
  item: any | null;
  value: number | null;
}
export interface DepartSelectEvent {
  name: string;
  data?: any;
  item: any | null;
  value: number | null;
}
export function SchedulePage() {
  const [state, setState] = useState<ScheduleState>({
    branchId: 0,
    departmentId: 0,
    personId: 0,
    year: 0,
    month: 0,
    items: []
  });
//   const [branchId, setBranchId] = useState<number>(0);
// const [departmentId, setDepartmentId] = useState<number>(0);
// const [personId, setPersonId] = useState<number>(0);
// const [year, setYear] = useState<number>(new Date().getFullYear());
// const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
// const [items, setItems] = useState<any[]>([]);// или более точный тип вместо any
const departments = useAppSelector((state) => state.departments.items);
const personal = useAppSelector((state) => state.personal.items);
  const sheduleList = useAppSelector((state) => state.sheduleList.items);
  const branches = useAppSelector((state) => state.branches.items);

  const branchValue: MainSelectEvent | null = state.branchId ? {
    name: 'branchId',
    item: branches.find(b => b.id === state.branchId) || null,
    value: state.branchId
  } : null;

  const departmentValue: MainSelectEvent | null = state.departmentId ? {
    name: 'departmentId',
    item: departments.find(d => d.id === state.departmentId) || null,
    value: state.departmentId
  } : null;

  const doctorValue: MainSelectEvent | null = state.personId ? {
    name: 'personId',
    item: personal.find(p => p.id === state.personId) || null,
    value: state.personId
  } : null;
const handleReset = () => {
    setState({
      branchId: 0,
      departmentId: 0,
      personId: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      items: []
    });
  };
 
  
 const handleBranchChange = (event: { name: string; value: number | null; item?: any }) => {
    console.log(event, "shedule event");
    
    // Обновляем состояние
    let newState = {
      ...clone(state),
      [event.name]: event.value
    };
    
    // Каскадная логика
    if (event.name === 'branchId') {
      newState.departmentId = 0;
      newState.personId = 0;
    } else if (event.name === 'departmentId') {
      if (event.item) {
        newState.branchId = event.item.branch.id;
      }
      newState.personId = 0;
    } else if (event.name === 'personId') {
      if (event.item) {
        newState.branchId = event.item.branch.id;
        newState.departmentId = event.item.department.id;
      }
    }
    
    // Фильтрация расписания
    let items: any[] = [];
    if (newState.departmentId && newState.personId) {
      items = sheduleList.filter(v => 
        v.persId === newState.personId && v.cabId === newState.departmentId
      );
    }
    newState.items = items;
    
    setState(newState);
  };
  console.log(state, "show satet")
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
          <button
    onClick={handleReset}
    className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors mb-3"
  >
    Очистить
  </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectBranch 
            key={`branch-${state.branchId}`}
            value={branchValue} 
            onChange={handleBranchChange}
            options={branches}
            branchId={state.branchId}
            name={'branchId'}
          />
          
          <SelectDepartment 
          key={`dept-${state.departmentId}`}
            value={departmentValue} 
           onChange={handleBranchChange}
            disabled={!state.branchId}
            options={departments}
            branchId={state.branchId}
            departmentId={state.departmentId}
            name={'departmentId'}
            
          />
          
          <SelectDoctor 
          key={`doc-${state.personId}`}
            value={doctorValue} 
            onChange={handleBranchChange}
            disabled={!state.departmentId}
            options={personal}
            branchId={state.branchId}
            departmentId={state.departmentId}
            personId={state.personId}
             name={'personId'}
          />
        </div>
      </div>

     
      
      {/* Empty State */}
  
    </div>
  );
}
