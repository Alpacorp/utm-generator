import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Actions from "./Actions";
import { useState, useMemo } from "react";
import NewDataForm from "./NewDataForm";

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
      { field: "_id", headerName: "id", width: 150 },
      { field: "date", headerName: "created date", width: 250 },
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
    [rowId]
  );

  const { businessLine } = useSelector((state: any) => state.businessLine);

  useMemo(() => {
    setData(getStoreData ? getStoreData : []);
  }, [getStoreData]);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <NewDataForm
          type={type}
          title={title}
          storeData={storeData}
          createData={createData}
        />
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
      </div>
    </>
  );
};

export default DataManagement;
