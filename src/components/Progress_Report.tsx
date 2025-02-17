import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "../components/ui/table";
import { useReports } from "../utils/api";

export const ProgressReport = () => {
  const { data, isLoading, isError } = useReports();
  const [sectorFilter, setSectorFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  if (isLoading) return <p className="text-center text-gray-400">Carregando...</p>;
  if (isError) return <p className="text-center text-red-500">Erro ao carregar os dados.</p>;

  const { weeksList, technicians } = data.data;

  const selectedWeeks = weeksList.slice(0, 3);

  let filteredData = technicians;
  if (sectorFilter) {
    filteredData = filteredData.filter((tech) => tech.sector === sectorFilter);
  }
  if (areaFilter) {
    filteredData = filteredData.filter((tech) => tech.area_name === areaFilter);
  }

  const formattedData = filteredData.map((tech) => ({
    sector: tech.sector,
    area: tech.area_name,
    technician: tech.technician_name,
    weeks: selectedWeeks.map((week) => {
      const weekRecords = tech.weeks.filter((w) => w.week_start.startsWith(week.slice(0, 10)));

      return {
        left: weekRecords.length > 0 ? weekRecords[0].total_records : 0,
        right: weekRecords.length > 1 ? weekRecords[1].total_records : 0,
      };
    }),
  }));

  const totalRecords = selectedWeeks.map((_, i) => ({
    left: formattedData.reduce((sum, item) => sum + (item.weeks[i]?.left || 0), 0),
    right: formattedData.reduce((sum, item) => sum + (item.weeks[i]?.right || 0), 0),
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6 text-black">Análises - Progresso</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por..."
          className="p-2 border border-gray-700  text-black rounded-md w-1/3"
        />

        <select
          onChange={(e) => setSectorFilter(e.target.value)}
          className="p-2 border border-gray-700 rounded-md"
        >
          <option value="">Selecione o sector</option>
          {Array.from(new Set(technicians.map((tech) => tech.sector))).map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setAreaFilter(e.target.value)}
          className="p-2 border border-gray-700 rounded-md"
        >
          <option value="">Selecione a área</option>
          {Array.from(new Set(technicians.map((tech) => tech.area_name))).map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-700  text-black">
          <TableCaption>Progresso Semanal</TableCaption>
          <TableHeader className="">
            <TableRow className="text-black font-bold">
              <TableHead className="p-3 text-left">SECTOR</TableHead>
              <TableHead className="p-3 text-left">ÁREA</TableHead>
              <TableHead className="p-3 text-left">TÉCNICO</TableHead>
              {selectedWeeks.map((_, index) => (
                <TableHead key={index} className="p-3 text-center">
                  SEMANA {index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedData.map((row, index) => (
              <TableRow key={index} className="border-b border-gray-700">
                <TableCell className="p-3">{row.sector}</TableCell>
                <TableCell className="p-3">{row.area}</TableCell>
                <TableCell className="p-3">{row.technician}</TableCell>
                {row.weeks.map((weekData, i) => (
                  <TableCell key={i} className="p-3 text-center font-semibold">
                    {weekData.left} <span className="text-gray-500 px-8"> | </span> {weekData.right}
                  </TableCell>
                ))}
              </TableRow>
            ))}
  
            <TableRow className="font-bold border-t border-gray-700">
              <TableCell className="p-3"></TableCell>
              <TableCell className="p-3"></TableCell>
              <TableCell className="p-3">Totais</TableCell>
              {totalRecords.map((total, i) => (
                <TableCell key={i} className="p-3 text-center text-black">
                  {total.left} <span className="text-gray-500 px-8"> | </span> {total.right}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
