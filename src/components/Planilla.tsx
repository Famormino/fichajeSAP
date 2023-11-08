import React, { useCallback, useEffect, useState } from "react";
import { read, utils, write, writeFile, writeFileXLSX } from "xlsx";

import { obtenerFechasSinFeriadosYSabadosDomingos } from "../helpers/diasHabiles";

const Planilla = ({ fechaInicio, fechaFin }) => {
    const [diasPlanilla, setDíasPlanilla] = useState([]);
    console.log(diasPlanilla);
    const dias = obtenerFechasSinFeriadosYSabadosDomingos(
        fechaInicio,
        fechaFin
    );

    useEffect(() => {
        setDíasPlanilla(
            dias.flatMap((dia) => [
                {dia:dia.toLocaleDateString(), hora: "07:00",tipo: "P10"},
                {dia: dia.toLocaleDateString(),hora: "16:00",tipo: "P20"},
            ])
        );
    }, [fechaInicio, fechaFin]);

    const exportFile = useCallback(() => {
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(diasPlanilla);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFile(wb, "SheetJSReactAoO.xlsx");
    }, [dias]);

    return (
        <div>
            <ul>
                {dias.map((dia, index) => (
                    <span key={index}>
                        <li>{`${dia.toLocaleDateString()} 07:00 P10`}</li>
                        <li>{`${dia.toLocaleDateString()} 16:00 P20`}</li>
                    </span>
                ))}
            </ul>
            <button onClick={exportFile}>Exportar a Excel</button>
        </div>
    );
};

export default Planilla;
