import Image from "next/image";
import Table from "@/components/Table";
import { RiMotorbikeLine } from "react-icons/ri";

export default function VehicleList() {
  const DATA_HEADER = [
    "Nama Pemilik",
    "Nama Kendaraan",
    "Plat Nomor",
    "Lat",
    "Long",
    "Location",
    "Status",
  ];

  const DATA_TABLE = [
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
      deliveryStatus: <p className="text-green-light">ONGOING</p>,
    },
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
      deliveryStatus: <p className="text-orange-secondary">WAITING</p>,
    },
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
      deliveryStatus: <p className="text-mono-600">UNASSIGNED</p>,
    },
  ];

  return (
    <main className="flex flex-col relative justify-between p-24">
      <div className="text-[32px] w-fit text-purple-secondary flex items-center gap-3 font-bold mb-8">
        <RiMotorbikeLine />
        <p className="text-[32px]">Vehicle List</p>
      </div>
      <div>
        <Table data={DATA_TABLE} header={DATA_HEADER} />
      </div>
    </main>
  );
}
