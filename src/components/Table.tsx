"use client";
import { BiSolidPencil } from "react-icons/bi";
import { BsBarChartFill, BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Table({
  data,
  header,
  tipe,
  page,
  isLoading,
}: {
  data: any[];
  header: any[];
  tipe?: string;
  page?: string;
  isLoading?: boolean;
}) {
  const [showAssignModal, setShowAssignModal] = useState(false);

  //   const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  //   const [idDelete, setIdDelete] = useState(0);

  //   const navigate = useNavigate();

  //DETAIL PM
  //   const [detailIdPm, setDetailIdPm] = useState("")
  //   const [detailStatus, setDetailStatus] = useState<ReactNode>()
  //   const [detailPlan, setDetailPlan] = useState("")
  //   const [detailWilayah, setDetailWilayah] = useState("")
  //   const [detailArea, setDetailArea] = useState("")
  //   const [detailJenis, setDetailJenis] = useState("")
  //   const [detailKategori, setDetailKategori] = useState("")
  //   const [detailPengerjaan, setDetailPengerjaan] = useState("")
  //   const [detailNamaPop, setDetailNamaPop] = useState("")

  let assigned = true;

  const Load = () => {
    const dummy = [1, 2, 3, 4, 5];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        {header.map((idx: number) => {
          return (
            <td
              key={idx}
              className="h-auto w-auto border-collapse border-b-2 border-mono-300 px-4 py-1 text-center"
            >
              <div className="h-4 w-full animate-pulse bg-mono-600"></div>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <div className="flex overflow-hidden rounded-[8px] w-full">
        <table className="w-full overflow-visible">
          <thead>
            <tr>
              {header.map((item: any, idx: number) => {
                return (
                  <th
                    key={idx}
                    className="h-auto w-auto border-2 text-black bg-purple-secondary p-[8px] text-center truncate"
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="overflow-visible">
            {
              data.length > 0 ? (
                Object.values(data).map((obj: any, idx: number) => {
                  let isUnassigned = Object.values(obj).some(
                    (item) => item === "UNASSIGNED"
                  );
                  // Check if "UNASSIGNED" is found in any property of the current object
                  if (isUnassigned) {
                    assigned = false;
                  }

                  return (
                    <tr key={idx} className="overflow-visible">
                      {Object.values(obj).map((item: any, idx: number) => {
                        return (
                          <td
                            key={idx}
                            className="h-auto w-auto border-collapse border-2 border-mono-300 p-[8px] text-center min-w-max"
                          >
                            {item === "SAFE" || item === "ONGOING" ? (
                              <p className="text-green-light">{item}</p>
                            ) : item === "WAITING" ? (
                              <p className="text-orange-secondary">{item}</p>
                            ) : item === "WARNING" ? (
                              <p className="text-error">{item}</p>
                            ) : item === "UNASSIGNED" ? (
                              <p className="text-mono-600">{item}</p>
                            ) : (
                              item
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <td colSpan={header.length}>
                  <p className="text-center text-[20px] py-5">
                    Data tidak ditemukan
                  </p>
                </td>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
