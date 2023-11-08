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
                {
                    Fecha: dia.toLocaleDateString(),
                    Hora: "07:00:00",
                    ClaseHechoTemporal: "P10",
                    Descripcion: "",
                    TP: "+",
                },
                {
                    Fecha: dia.toLocaleDateString(),
                    Hora: "16:00:00",
                    ClaseHechoTemporal: "P20",
                    Descripcion: "",
                    TP: "+",
                },
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
        writeFile(wb, "FichajeSap.xlsx");
    }, [dias]);

    return (
        <div>
            <table>
                <caption>Fichaje SAP</caption>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Clase Hecho Temporal</th>
                        <th>Descripcion</th>
                        <th>TP</th>
                    </tr>
                </thead>
                <tbody>
                    {diasPlanilla.map((dia, index) => (
                        <tr key={index}>
                            <td>{dia.Fecha}</td>
                            <td>{dia.Hora}</td>
                            <td>{dia.ClaseHechoTemporal}</td>
                            <td>{dia.Descripcion}</td>
                            <td>{dia.TP}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={exportFile}>Exportar a Excel</button>
        </div>
    );
};

export default Planilla;
