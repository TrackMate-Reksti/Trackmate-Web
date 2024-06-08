import Image from "next/image";
import Table from "@/components/Table";
import { RiMotorbikeLine } from "react-icons/ri";

export default function VehicleList() {
  const DATA_HEADER = [
    "Nama Pemilik",
    "Nama Kendaraan",
    "Plat Nomor",
    "Location",
  ];

  const DATA_TABLE = [
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
    },
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
    },
    {
      orderNo: 26230000009,
      deliveryNo: 26230000048,
      cabang: "JK2",
      customerNo: 108443,
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
