"use client";

// import "../style.css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaClipboard, FaWhatsapp } from "react-icons/fa";
import { BsThermometerHalf } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { useRef, useEffect, useState } from "react";
import Maps from "@/components/Maps";
import Dropdown from "@/components/Dropdown";
import { FaMotorcycle } from "react-icons/fa6";
import { IoChevronForward, IoHomeOutline } from "react-icons/io5";
import DATA_TABLE from "@/lib/table";
import Link from "next/link";

export default function Track() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [dataTransaksi, setDataTransaksi] = useState<any[] | null>([]);
  const [dataSuhuProduk, setDataSuhuProduk] = useState<any[] | null>([]);
  const [dataIot, setDataIot] = useState<any[] | null>([]);
  const [suhuIot, setSuhuIot] = useState<number>(0);
  const [kelembabanIot, setKelembabanIot] = useState<number>(0);
  const [dataTemperature, setDataTemperature] = useState<any[]>([0, 0, 0]);
  const [dataHumidity, setDataHumidity] = useState<any[]>([0, 0, 0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchDataIot = async () => {
        // const { data, error } = await supabase.from("data_iot").select("suhu, kelembaban").order("id", { ascending: false }).limit(1);
        setDataIot([1, 2, 3]);
        // setErroriot(error);
      };

      fetchDataIot();
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, [dataTransaksi]);

  // useEffect(() => {
  // }, [dataIot])

  useEffect(() => {
    // console.log(dataTransaksi);
    // console.log(dataSuhuProduk);
    // {console.log(dataIot)}
    try {
      if (dataIot != null && dataIot != undefined) {
        dataIot.map((item: any) => {
          setSuhuIot(item.suhu);
          setKelembabanIot(item.kelembaban);
        });
      }
    } catch (error) {
      console.log(error);
    }
    if (dataIot && dataIot[0]) {
      let highestTemperature = dataTemperature[2];
      let highestHumidity = dataHumidity[2];
      let lowestTemperature = dataTemperature[0];
      let lowestHumidity = dataHumidity[0];

      if (suhuIot > highestTemperature) {
        highestTemperature = suhuIot;
      } else if (kelembabanIot > highestHumidity) {
        highestHumidity = kelembabanIot;
      } else if (suhuIot < lowestTemperature) {
        lowestTemperature = suhuIot;
      } else if (kelembabanIot < lowestHumidity) {
        lowestHumidity = kelembabanIot;
      }

      setDataTemperature([lowestTemperature, suhuIot, highestTemperature]);
      setDataHumidity([lowestHumidity, kelembabanIot, highestHumidity]);
    }
  }, [dataTransaksi, dataSuhuProduk, dataIot]);

  useEffect(() => {
    const updateContainerSize = () => {
      if (mapContainerRef.current) {
        setContainerWidth(mapContainerRef.current.offsetWidth);
        setContainerHeight(mapContainerRef.current.offsetHeight);
      }
    };

    // Initial setup
    updateContainerSize();

    // Event listener for window resize
    window.addEventListener("resize", updateContainerSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  const options = dataTransaksi?.map((item: any) => {
    return {
      value: item.delivery_no,
      label: item.delivery_no,
    };
  });
  const optionsOrder = dataTransaksi?.map((item: any) => {
    return {
      value: item.order_number,
      label: item.order_number,
    };
  });

  return (
    <div className="w-full h-full">
      <div className="pt-[60px] px-[32px] pb-[32px] w-full h-full flex flex-col gap-5">
        <div className="text-[24px] w-fit text-purple-secondary flex items-center gap-3 font-bold">
          <IoHomeOutline />
          <p className="text-[20px]">Home</p>
        </div>
        <div className="flex w-full gap-1">
          <div className="px-[24px] py-[12px] box-shadow rounded-[10px] flex gap-2 items-center border-2 border-blue-primary bg-[#F6F3FD] relative grow">
            <img
              src="/assets/logo_medicargo.svg"
              alt=""
              className="w-36 object-contain absolute -top-3 left-4 bg-gradient-to-b from-white from-45% to-[#F6F3FD] to-50% px-1"
            />
            <div className="w-full text-blue-dark">
              <div className="flex gap-2 text-[24px] font-semibold items-center">
                <h1 className="text-[24px] font-normal w-fit shrink-0">
                  License Plate:
                </h1>
                {options && (
                  <Dropdown
                    placeholder="Search License Plate!"
                    isMulti={false}
                    tipe="hollow"
                    options={options}
                  />
                )}
              </div>
              {/* <div className="flex gap-2 text-[20px] items-center">
                <h2 className="text-[20px]">Order ID:</h2>
                {options && (
                  <Dropdown
                    placeholder="Search order!"
                    isMulti={false}
                    tipe="hollow"
                    options={optionsOrder}
                  />
                )}
              </div> */}
            </div>
          </div>
          <div className="flex w-fit gap-1 text-blue-dark shrink-0">
            <div className="px-[24px] py-[12px] box-shadow rounded-[10px] flex justify-center items-center border-2 border-blue-primary bg-[#F6F3FD] relative w-[120px] box-content">
              <div className="flex items-center gap-1 pr-1 absolute -top-3 left-4 bg-gradient-to-b from-white from-45% to-[#F6F3FD] to-50% text-purple-primary font-semibold italic text-[20px]">
                <FaMotorcycle />
                <p className="text-[16px]">Total vehicle</p>
              </div>
              <p className="text-center text-[28px] font-semibold">
                25
              </p>
            </div>
            <div className="px-[24px] py-[12px] box-shadow rounded-[10px] flex justify-center items-center border-2 border-blue-primary bg-[#F6F3FD] relative w-[120px] box-content">
              <div className="flex items-center gap-1 pr-1 absolute -top-3 left-4 bg-gradient-to-b from-white from-45% to-[#F6F3FD] to-50% text-purple-primary font-semibold italic">
                <FaClipboard />
                <p>Total Report</p>
              </div>
              <p className="text-center text-[28px] font-semibold">
                {DATA_TABLE.length}
              </p>
              <Link
                href={"/vehicle-list"}
                className="absolute top-5 bottom-0 right-0 my-auto mr-[24px] text-[28px] "
              >
                <IoChevronForward />
              </Link>
            </div>
          </div>
        </div>
        <div
          id="mapContainer"
          className="rounded-[10px] grow box-shadow overflow-hidden"
          ref={mapContainerRef}
        >
          <Maps aspectHeight={500} aspectWidth={500} markers={DATA_TABLE.map((item: any) => {return item.Location})}/>
        </div>
      </div>
    </div>
  );
}
