"use client";

// import "../style.css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaClipboard, FaWhatsapp } from "react-icons/fa";
import { BsThermometerHalf } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { useRef, useEffect, useState } from "react";
// import { supabase } from "../../api/api";
// import { PostgrestError } from "@supabase/supabase-js";
// import { useNavigate } from "react-router-dom";
import Maps from "@/components/Maps";
import Dropdown from "@/components/Dropdown";
import { FaMotorcycle } from "react-icons/fa6";
import { IoChevronForward, IoHomeOutline } from "react-icons/io5";

export default function Track() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const [dataTransaksi, setDataTransaksi] = useState<any[] | null>([]);
  const [dataSuhuProduk, setDataSuhuProduk] = useState<any[] | null>([]);
  const [dataIot, setDataIot] = useState<any[] | null>([]);
  // const [error, setError] = useState<PostgrestError | null>(null);
  // const [errorProduk, setErrorProduk] = useState<PostgrestError | null>(null);
  // const [erroriot, setErroriot] = useState<PostgrestError | null>(null);

  const [suhuIot, setSuhuIot] = useState<number>(0);
  const [kelembabanIot, setKelembabanIot] = useState<number>(0);

  const [dataTemperature, setDataTemperature] = useState<any[]>([0, 0, 0]);
  const [dataHumidity, setDataHumidity] = useState<any[]>([0, 0, 0]);

  // useEffect(() => {
  //   const fetchDataTransaksi = async () => {
  //     const { data, error } = await supabase.from("transaksi").select("order_number, delivery_no");
  //     setDataTransaksi(data);
  //     setError(error);
  //   };

  //   fetchDataTransaksi();
  // }, []);

  // useEffect(() => {
  //   // Check if dataTransaksi has data
  //   if (dataTransaksi && dataTransaksi.length > 0) {
  //     // Iterate over each item in dataTransaksi
  //     dataTransaksi.forEach(async (item) => {
  //         const { data, error } = await supabase.from("master_produk")
  //           .select("pengiriman")
  //           .eq('kode_produk', item.product_code);
  //         let minMaxTemp = {min: 0, max: 0}
  //         if( data![0].pengiriman == "03"){
  //           minMaxTemp = {min: 15, max: 30}
  //         } else if (data![0].pengiriman == "02-A") {
  //           minMaxTemp = {min: 15, max: 25}
  //         } else if (data![0].pengiriman == "02-B") {
  //           minMaxTemp = {min: 8, max: 15}
  //         } else if (data![0].pengiriman == "01") {
  //           minMaxTemp = {min: 2, max: 8}
  //         }
  //         // Use the spread operator to append new data to dataSuhuProduk
  //         if(dataSuhuProduk != null){
  //           setDataSuhuProduk((prevData) => (prevData ? [...prevData, minMaxTemp] : [minMaxTemp]));
  //         }
  //         setErrorProduk(error);
  //     });
  //   }
  // }, [dataTransaksi]);

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
  // [
  //   { value: "26230000009", label: "26230000009" },
  //   { value: "26230000010", label: "26230000010" },
  //   { value: "26230000011", label: "26230000011" },
  // ];

  // let navigate = useNavigate();
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
                <h1 className="text-[24px] font-normal w-fit shrink-0">License Plate:</h1>
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
                {dataTemperature[0]}
              </p>
            </div>
            <div className="px-[24px] py-[12px] box-shadow rounded-[10px] flex justify-center items-center border-2 border-blue-primary bg-[#F6F3FD] relative w-[120px] box-content">
              <div className="flex items-center gap-1 pr-1 absolute -top-3 left-4 bg-gradient-to-b from-white from-45% to-[#F6F3FD] to-50% text-purple-primary font-semibold italic">
                <FaClipboard />
                <p>Total Report</p>
              </div>
              <p className="text-center text-[28px] font-semibold">
                {dataTemperature[0]}
              </p>
              <button className="absolute top-0 bottom-0 right-0 my-auto mr-[24px] text-[28px] ">
                <IoChevronForward />
              </button>
            </div>
          </div>
        </div>
        <div
          id="mapContainer"
          className="rounded-[10px] grow box-shadow overflow-hidden"
          ref={mapContainerRef}
        >
          <Maps aspectHeight={containerHeight} aspectWidth={containerWidth} />
        </div>
      </div>
    </div>
  );
}
