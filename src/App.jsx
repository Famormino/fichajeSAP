import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import Planilla from "./components/Planilla";

import es from "date-fns/locale/es";

import "react-date-range/dist/styles.css"; // main css file
import "./App.css";

const App = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: "selection",
        },
    ]);
    console.log(state[0]);
    return (
        <main className="container">
            <div className="titulo">
                Planillarda{" "}
                <img src="sapTitulo.png" width={70} height={70} alt="" />
            </div>
            <DateRangePicker
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                locale={es}
                defaultStaticRanges={[
                    ...defaultStaticRanges,
                    (defaultStaticRanges[0].label = "Hoy"),
                    (defaultStaticRanges[1].label = "Ayer"),
                    (defaultStaticRanges[2].label = "Semana Actual"),
                    (defaultStaticRanges[3].label = "Última Semana"),
                    (defaultStaticRanges[4].label = "Mes Actual"),
                    (defaultStaticRanges[5].label = "Último Mes"),
                ]}
            />
            <div className="container-desc">
                ↪ La selección excluye fines de semana y feriados.{" "}
                <span
                    style={{
                        color: "rgba(11, 117, 255, 0.74)",
                        fontWeight: "500",
                    }}
                >
                    Try It!
                </span>
            </div>
            <div className="container_planilla">
                {
                    <Planilla
                        fechaInicio={state[0].startDate}
                        fechaFin={state[0].endDate}
                    />
                }
            </div>
        </main>
    );
};

export default App;
