import React from "react";
import axios from "axios";

import { Usernow } from "../../../../redux/slice/authSlice";
import { Patient } from "../PatientFull";
import Analysis from "./Analysis/Analysis";
import { Spinner } from "../../../Spinner/Spinner";

interface AnalyzesProps {
  patient: Patient;
  user: Usernow | null;
}
interface AnalyzesState {
  items: any[]; // лучше заменить на конкретный тип анализа, если есть
  wait: boolean;
}
class Analyzes extends React.Component<AnalyzesProps, AnalyzesState> {
  mounted: boolean = false;
  constructor(props: AnalyzesProps) {
    super(props);
    this.state = {
      items: [],
      wait: true,
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
    this.setState({ wait: true });
    axios
      .post("/api/office/patient/analyzes", { patientId })
      .then((response) => {
        if (this.mounted) {
          this.setState({ items: response.data.data, wait: false });
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки анализов:", error);
        if (this.mounted) {
          this.setState({ wait: false });
        }
      });
  }

  render() {
    // 1. Сначала проверяем, идёт ли загрузка
    if (this.state.wait) {
      return <Spinner />;
    }

    // 2. Загрузка окончена, данных нет
    // if (!this.state.items || this.state.items.length === 0) {
    //   return <div className="no-data-message">Нет доступных данных</div>;
    // }

    // 3. Данные есть – отображаем
    const items = this.state.items.map((v, i) => (
      <Analysis key={i} patientId={this.props.patient.id} analysis={v} />
    ));

    return (
      <div className="flex flex-col mx-auto w-full text-center gap-y-[15px]">
        {items}
      </div>
    );
  }
}

export default Analyzes;
