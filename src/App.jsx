import { addDays, isToday } from "date-fns";
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

    return (
        <main className="container">
            <div className="titulo">
                Planillarda{" "}
                <img src="sapTitulo.png" width={70} height={70} alt="" />
            </div>
            <DateRangePicker
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                locale={es}
                onChange={(item) => setState([item.selection])}
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
                <p className="ingreso-info">
                    ▶ La selección excluye los fines de semana. 
                    <span
                        style={{
                            padding: "10px",
                            color: "rgba(11, 117, 255, 0.74)",
                            fontWeight: "500",
                        }}
                    >
                         Try It!
                    </span>
                </p>
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
