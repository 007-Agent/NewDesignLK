import React from "react";
import Observation from "./Observation/Observation";
import "./observations.scss";
import { Usernow } from "../../../../redux/slice/authSlice";
import { Patient } from "../PatientFull";
import { Spinner } from "../../../Spinner/Spinner";
import axios from "axios";
interface ObservationProps {
  patient: Patient;
  user: Usernow | null;
  setIsLoading: (loading: boolean) => void;
}
interface AnalyzesState {
  items: any[]; // лучше заменить на конкретный тип анализа, если есть
}

class Observations extends React.Component<ObservationProps, AnalyzesState> {
  mounted: boolean = false;
  constructor(props: ObservationProps) {
    super(props);
    this.state = {
      items: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.refresh();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  refresh() {
    const patientId = this.props.patient.id;

    this.props.setIsLoading(true);
    axios
      .post("/rest/office/patient/observations", { patientId })
      .then((response) => {
        if (this.mounted) {
          this.setState({ items: response.data.data });

          this.props.setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки анализов:", error);

        this.props.setIsLoading(false);
      });
  }

  render() {
    // if (this.state.wait) {
    //   return (
    //     <div className="relative min-h-[200px]">
    //       <Spinner />
    //     </div>
    //   );
    // }

    const results = this.state.items;

    let items = null;
    if (this.state.items) {
      items = this.state.items.map((v, i) => {
        return (
          <>
            <Observation observation={v} />
          </>
        );
      });
    }

    return <div className="pl-4">{items}</div>;
  }
}

export default Observations;
