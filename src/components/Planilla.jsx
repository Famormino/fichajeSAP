import React, { useCallback, useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

import { obtenerFechasSinFeriadosYSabadosDomingos } from "../helpers/diasHabiles";

import "./Planilla.css";

const Planilla = ({ fechaInicio, fechaFin }) => {
    const [diasPlanilla, setDíasPlanilla] = useState([]);
    const dias = obtenerFechasSinFeriadosYSabadosDomingos(
        fechaInicio,
        fechaFin
    );

    const copyTable = () => {
        const elTable = document.querySelector("table");

        let range, sel;

        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            // unselect any element in the page
            sel.removeAllRanges();

            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }

            document.execCommand("copy");
        }

        sel.removeAllRanges();

        console.log("Element Copied! Paste it in a file");
    };

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
                <caption>Días a Copiar</caption>
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
            <button onClick={copyTable}>Copiar tabla</button>
        </div>
    );
};

export default Planilla;