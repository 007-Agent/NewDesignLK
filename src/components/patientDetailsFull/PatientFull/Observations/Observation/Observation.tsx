import React, { useState } from "react";
import { Detail } from "./Detail/Detail";
import { Visit } from "./Visit/Visit";
import "./observation.scss";

interface ObservationData {
  id: number;
  year: number;
  department: string;
  departmentId: number;
  speciality: string;
  specialityId: number;
  result?: string; // необязательное поле
  resultId?: number; // необязательное поле
}
interface Observation {
  observation: ObservationData;
}

const Observation = (props: Observation) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  const ob = props.observation;
  console.log(ob, "ob name");
  const year = ob.year;
  const department = ob.department + ",";
  const speciality = ob.speciality;
  const result = ob.result && ob.result.trim() !== "" ? `(${ob.result})` : null;

  let detail = [];
  if (show) {
    detail.push(<Detail id={ob.id} key={1} />);
    detail.push(<Visit id={ob.id} key={2} />);
  }

  return (
    <div>
      <div
        onClick={toggleShow}
        className="flex flex-wrap my-4 gap-x-[16px] text-[16px] cursor-pointer  max-[450px]:text-[14px] pl-[10px]"
      >
        <h2 className="text-[rgb(8,161,54)]">{year}</h2>
        <p>{department}</p>
        <div>{speciality}</div>
        <div>{result}</div>
      </div>
      <div>{detail}</div>
    </div>
  );
};

export default Observation;
