import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";

function Table({ data, header, onButtonClick }: { data: any[]; header: any[]; onButtonClick: (location: { lat: number; lng: number }) => void }) {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const Load = () => {
    const dummy = [1, 2, 3, 4, 5];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        {header.map((item: any, idx: number) => (
          <td
            key={idx}
            className="h-auto w-auto border-collapse border-b-2 border-mono-300 px-4 py-1 text-center"
          >
            <div className="h-4 w-full animate-pulse bg-mono-600"></div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="flex overflow-hidden rounded-[8px] w-full">
      <table className="w-full overflow-visible">
        <thead>
          <tr>
            {header.map((item: any, idx: number) => (
              <th
                key={idx}
                className="h-auto w-auto border-2 text-black bg-purple-secondary p-[8px] text-center truncate"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-visible">
          {data.length > 0 ? (
            data.map((obj: any, idx: number) => (
              <tr key={idx} className="overflow-visible">
                {Object.values(obj).map((item: any, itemIdx: number) => (
                  <td
                    key={itemIdx}
                    className="h-auto w-auto border-collapse border-2 border-mono-300 p-[8px] text-center min-w-max"
                  >
                    {itemIdx === header.length - 1 ? (
                      <button className="hover:text-blue-600" onClick={() => onButtonClick(item)}>
                        <FaExternalLinkAlt />
                      </button>
                    ) : (
                      item
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length}>
                <p className="text-center text-[20px] py-5">
                  Data tidak ditemukan
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
