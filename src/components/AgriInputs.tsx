import { useQuery } from "@tanstack/react-query";
import { fetchAgriInputs } from "../utils/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export function AgriInputs() {
  const { data, status, error } = useQuery({
    queryKey: ["inputs"],
    queryFn: fetchAgriInputs,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  const totalProdutores = data.sectors.reduce(
    (sum, sector) => sum + sector.totalFarmers,
    0
  );

  const totalSementeX = Number(
    data.sectors.reduce(
      (sum, sector) =>
        sum +
        Number((sector.packages.find((p) => p.name === "Semente X")?.received || 0)),
      0
    )
  );

  const totalSementeY = Number(
    data.sectors.reduce(
      (sum, sector) =>
        sum +
        (sector.packages.find((p) => p.name === "Semente Y")?.received || 0),
      0
    )
  );

  return (
    <div className="max-w-7xl mx-auto pt-18">
      <div className="flex justify-between mb-8">
        <h2 className="text-4xl font-semibold">Insumos</h2>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex justify-center  w-full rounded-md border border-input bg-black text-white px-3 py-3 text-base cursor-pointer">
            Adicionar Distribuição
          </button>
          <button className="flex justify-center w-full rounded-md border border-input bg-black text-white px-6 py-3 text-base cursor-pointer">
            Exportar Distribuição
          </button>
        </div>
      </div>

      <Table>
        <TableCaption>Distribuição Viveiros</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sector</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>Produtores</TableHead>
            <TableHead>Semente X</TableHead>
            <TableHead>Semente X</TableHead>
            <TableHead>Semente Y</TableHead>
            <TableHead>Semente Y</TableHead>
          </TableRow>

          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Distribuídos (Semente X)</TableHead>
            <TableHead>Recebidos (Semente X)</TableHead>
            <TableHead>Distribuídos (Semente Y)</TableHead>
            <TableHead>Recebidos (Semente Y)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.sectors.map((sector, index) => {
            const sementeX = sector.packages.find(
              (p) => p.name === "Semente X"
            ) || { sent: 0, received: 0 };
            const sementeY = sector.packages.find(
              (p) => p.name === "Semente Y"
            ) || { sent: 0, received: 0 };

            return (
              <TableRow key={index}>
                <TableCell>{sector.name}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{sector.totalFarmers}</TableCell>
                <TableCell>{sementeX.sent}</TableCell>
                <TableCell>{sementeX.received}</TableCell>
                <TableCell>{sementeY.sent}</TableCell>
                <TableCell>{sementeY.received}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="font-bold">
            <TableCell>Totais</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{totalProdutores}</TableCell>
            <TableCell>0.00</TableCell>
            <TableCell>{totalSementeX}</TableCell>
            <TableCell>0.00</TableCell>
            <TableCell>{totalSementeY}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
