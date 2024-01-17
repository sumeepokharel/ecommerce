import { Link } from "react-router-dom";
import React from "react";

const category_list = ["LOWEST TO HIGHEST", "HIGHEST TO LOWEST"];

function DropMenu({ handleSortChange }: any) {
  return (
    <>
      <div className="absolute left-0 bg-slate-100 p-2 mt-4 ml-4 z-999">
        <div className="flex flex-col">
          <Link
            to="#"
            onClick={() => handleSortChange("lowerprice")}
            className="mb-2 hover:bg-slate-200 text-sm p-1"
          >
            LOWEST TO HIGHEST
          </Link>

          <Link
            to="#"
            onClick={() => handleSortChange("higherprice")}
            className="text-sm p-1 hover:bg-slate-200"
          >
            HIGHEST TO LOWEST
          </Link>
        </div>
      </div>
    </>
  );
}

export default DropMenu;
