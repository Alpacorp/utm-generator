import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Actions from "./Actions";
import { useState, useMemo } from "react";
import { MenuItem, TextField } from "@mui/material";

const DataManagement = () => {
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "id", width: 250 },
      { field: "name", headerName: "name", width: 150, editable: true },
      {
        field: "shortname",
        headerName: "shortname",
        width: 100,
        editable: true,
      },
      {
        field: "idchanneltype",
        headerName: "idchanneltype",
        width: 150,
        editable: true,
      },
      {
        field: "actions",
        headerName: "actions",
        type: "actions",
        width: 150,
        renderCell: (params: any) => {
          return <Actions {...{ params, rowId, setRowId }} />;
        },
      },
    ],
    [rowId]
  );

  const { businessLine } = useSelector((state: any) => state.businessLine);

  let dataRows = 1;

  const getDataRows = () => {
    switch (dataRows) {
      case 1:
        console.log("caso 1");
        return businessLine?.businessLines;
        break;
      default:
        break;
    }
  };

  getDataRows();

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={businessLine?.businessLines ? businessLine.businessLines : []}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          onCellEditCommit={(params: any) => {
            setRowId(params.id);
          }}
        />
      </div>
    </>
  );
};

export default DataManagement;
