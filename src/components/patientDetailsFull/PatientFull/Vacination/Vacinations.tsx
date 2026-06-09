import React from "react";
import "./vacin.scss";
import { Printer } from "lucide-react";
import { Usernow } from "../../../../redux/slice/authSlice";
import { Patient } from "../PatientFull";
import { download } from "../../../../utils/utils";
import { Spinner } from "../../../Spinner/Spinner";
import Vaccinacya from "./Vacinacya/Vaccinacya";
import axios from "axios";
interface AnalyzesProps {
  patient: Patient;
  user: Usernow | null;
}
interface AnalyzesState {
  items: any[]; // лучше заменить на конкретный тип анализа, если есть
  orderId: null;
  wait: boolean;
}
class Vaccinations extends React.Component<AnalyzesProps, AnalyzesState> {
  mounted: boolean = false;
  constructor(props: AnalyzesProps) {
    super(props);
    this.state = {
      items: [],
      orderId: null,
      wait: true,
    };
    this.refresh = this.refresh.bind(this);
    // this.handleDownload = this.handleDownload.bind(this)
  }

  componentDidMount() {
    this.mounted = true;
    this.refresh();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleDownload = async () => {
    const patientId = this.props.patient.id;
    const orderId = this.state.orderId;
    const fileName = "Vaccination.pdf";

    try {
      const response = await axios.get(
        `/api/office/vaccination/pdf?patientId=${patientId}&analyzeId=${orderId}&fileName=${fileName}`,
        {
          responseType: "blob",
        },
      );
      const blob = response.data;
      const link = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Ошибка скачивания PDF:", error);
      // показать уведомление пользователю
    }
  };

  refresh() {
    const patientId = this.props.patient.id;
    this.setState({ wait: true });
    axios
      .post("/api/office/patient/vaccinations", { patientId })
      .then((response) => {
        if (this.mounted) {
          this.setState({ items: response.data.data });
        }
        this.setState({ wait: false });
      })
      .catch((error) => {
        console.error("Ошибка загрузки анализов:", error);
        if (this.mounted) {
          this.setState({ wait: false });
        }
      });
  }

  render() {
    if (this.state.wait) {
      return <Spinner />;
    }

    let items = this.state.items.map((v, i) => {
      return <Vaccinacya key={i} vaccination={v} />;
    });

    if (items.length === 0) {
      return null; // или <div>Нет данных</div>
    }
    console.log(this.props.patient.id);
    return (
      <div className="relative max-[450px]:w-[400px] max-[450px]: p-[3px] flex flex-col gap-y-[10px]">
        <div>
          <Printer className="print_vac" onClick={this.handleDownload} />
        </div>
        {items}
      </div>
    );
  }
}

export default Vaccinations;
