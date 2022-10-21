import DataTypeForm1 from "./DataTypeForm1";
import DataTypeForm2 from "./DataTypeForm2";
import DataTypeForm3 from "./DataTypeForm3";

interface PropsNewDataForm {
  type?: number;
  title?: string;
  storeData?: any;
  createData?: any;
  getStoreData?: any;
}

const NewDataForm = ({
  type,
  title,
  storeData,
  createData,
}: PropsNewDataForm) => {
  switch (type) {
    case 1:
      return (
        <>
          <DataTypeForm1
            title={title}
            createData={createData}
            storeData={storeData}
          />
        </>
      );
    case 2:
      return (
        <>
          <DataTypeForm2 title={title} />
        </>
      );
    case 3:
      return (
        <>
          <DataTypeForm3
            title={title}
            createData={createData}
            storeData={storeData}
          />
        </>
      );
    default:
      break;
  }

  return <></>;
};

export default NewDataForm;
