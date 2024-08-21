import { useCallback, useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

import { obtenerFechasSinFeriadosYSabadosDomingos } from "../helpers/diasHabiles";

import "./Planilla.css";

// eslint-disable-next-line react/prop-types
const Planilla = ({ fechaInicio, fechaFin }) => {
    const [diasPlanilla, setDíasPlanilla] = useState([]);
    const [legajo, setLegajo] = useState("");
    const [copied, setCopied] = useState(false);
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

    const inputLegajoHandler = (e) => {
        setLegajo(e.target.value);
    };

    const dias = obtenerFechasSinFeriadosYSabadosDomingos(
        fechaInicio,
        fechaFin
    );

    const copyTable = () => {
        setCopied(true);
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
                    Fecha: dia.toLocaleDateString().replaceAll("/", "."),
                    Hora: "07:00",
                    ClaseHechoTemporal: "P10",
                    Descripcion: "",
                    TP: "+",
                },
                {
                    Fecha: dia.toLocaleDateString().replaceAll("/", "."),
                    Hora: "16:00",
                    ClaseHechoTemporal: "P20",
                    Descripcion: "",
                    TP: "+",
                },
            ])
        );
        setCopied(false);
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

    const handleRestart = () => {
        setDíasPlanilla([]);
        setLegajo("");
        setCopied(!copied);
    };

    return (
        <div>
            <section className="hora__container">
                <label htmlFor="legajo">Legajo ► </label>
                <input
                    type="number"
                    id="legajo"
                    name="legajo"
                    value={legajo}
                    onChange={inputLegajoHandler}
                    min={1}
                />
                <label htmlFor="hora">
                    Modificar todos los horarios de salida ►{" "}
                </label>
                <input
                    type="time"
                    id="hora"
                    name="hora"
                    onChange={inputHandler}
                    defaultValue={"16:00"}
                />
            </section>
            <table>
                <thead>
                    <tr>
                        {legajo ? <th>Legajo</th> : undefined}
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
                            {legajo ? <td>{legajo}</td> : undefined}
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
                <button
                    className={`${copied ? "buttonsGreen" : "buttons"} `}
                    onClick={copyTable}
                >
                    <img src="copy.png" alt="" width={20} height={20} />
                    {!copied ? "Copy to Clipboard" : "Copied!"}
                </button>
                {copied && (
                    <button
                        className={`${copied ? "buttonsRed" : "buttons"} `}
                        onClick={handleRestart}
                    >
                        <img src="restart.png" alt="" width={20} height={20} />
                        Restart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Planilla;
