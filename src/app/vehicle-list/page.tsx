"use client";

import { useState } from "react";
import Table from "@/components/Table";
import Maps from "@/components/Maps";
import { RiMotorbikeLine } from "react-icons/ri";
import DATA_TABLE from "@/lib/table";
import { useRouter } from "next/navigation";

export default function VehicleList() {
  const router = useRouter();
  const DATA_HEADER = [
    "Nama Pemilik",
    "Nama Kendaraan",
    "Plat Nomor",
    "Location",
  ];

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleButtonClick = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    router.push("/")
  };

  return (
    <main className="flex flex-col relative justify-between p-24">
      <div className="text-[32px] w-fit text-purple-secondary flex items-center gap-3 font-bold mb-8">
        <RiMotorbikeLine />
        <p className="text-[32px]">Vehicle Report</p>
      </div>
      <div>
        <Table
          data={DATA_TABLE}
          header={DATA_HEADER}
          onButtonClick={handleButtonClick}
        />
      </div>
      {/* <div>
        <Maps
          aspectHeight={500}
          aspectWidth={500}
          markerPosition={selectedLocation}
        />
      </div> */}
    </main>
  );
}
