import { useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Actions from "./Actions";
import NewDataForm from "./NewDataForm";
import { Skeleton } from "@mui/material";

interface PropsDataManagement {
  type?: number;
  title?: string;
  storeData?: any;
  createData?: any;
  updateData?: any;
  deleteData?: any;
  getStoreData?: any;
}

const DataManagement = ({
  type,
  title,
  storeData,
  createData,
  updateData,
  deleteData,
  getStoreData,
}: PropsDataManagement) => {
  const [rowId, setRowId] = useState(null);
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "id", width: 250 },
      { field: "date", headerName: "created date", width: 250 },
      { field: "name", headerName: "name", width: 250, editable: true },
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
        width: 200,
        renderCell: (params: any) => {
          return (
            <Actions
              {...{
                params,
                rowId,
                setRowId,
                updateData,
                storeData,
                deleteData,
              }}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  );

  useMemo(() => {
    setData(getStoreData ? getStoreData : []);
  }, [getStoreData]);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        {data.length > 0 && (
          <NewDataForm
            type={type}
            title={title}
            storeData={storeData}
            createData={createData}
          />
        )}

        {data.length > 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            getRowId={(row: any) => row._id}
            rowsPerPageOptions={[5, 10, 20, 50]}
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
        )}
      </div>
    </>
  );
};

export default DataManagement;
