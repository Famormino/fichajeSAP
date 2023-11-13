import { useCallback, useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

import { obtenerFechasSinFeriadosYSabadosDomingos } from "../helpers/diasHabiles";

import "./Planilla.css";

const Planilla = ({ fechaInicio, fechaFin }) => {
    const [diasPlanilla, setDíasPlanilla] = useState([]);

    const inputHandler = (e) => {
        setDíasPlanilla((prevDias) => {
            return prevDias.map((dia) => {
                if (dia.ClaseHechoTemporal === "P20") {
                    return {
                        ...dia,
                        Hora: e.target.value,
                    };
                }
                return dia;
            });
        });
    };
    const dias = obtenerFechasSinFeriadosYSabadosDomingos(
        fechaInicio,
        fechaFin
    );

    const copyTable = () => {
        const elTable = document.querySelector("tbody");

        let range, sel;

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
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
            <label htmlFor="hora">Modificar Horario de Salida</label>
            <input
                type="time"
                id="hora"
                name="hora"
                step={2}
                onChange={inputHandler}
                
            />
            <table>
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
            <div className="planilla-buttons">
                <button className="buttons" onClick={exportFile}>
                    <img src="excel.png" alt="" width={20} height={20} />
                    Exportar a Excel
                </button>
                <button className="buttons" onClick={copyTable}>
                    <img src="copy.png" alt="" width={20} height={20} />
                    Copy to Clipboard
                </button>
            </div>
        </div>
    );
};

export default Planilla;
