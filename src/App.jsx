import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addDays } from "date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

import "./App.css";
import Planilla from "./components/Planilla.tsx";
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
