import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker, defaultStaticRanges, defaultInputRanges } from "react-date-range";
import es from "date-fns/locale/es";

import "react-date-range/dist/styles.css"; // main css file
import "./App.css";
import Planilla from "./components/Planilla";

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

            <div className="container_planilla">
                {state.map((fecha) => (
                    <Planilla
                        key={fecha.key}
                        fechaInicio={fecha.startDate}
                        fechaFin={fecha.endDate}
                    />
                ))}
            </div>
        </main>
    );
};

export default App;