import DataTypeForm1 from "./DataTypeForm1";
import DataTypeForm2 from "./DataTypeForm2";
import DataTypeForm3 from "./DataTypeForm3";

interface PropsNewDataForm {
  type?: number;
  title?: string;
  createData?: any;
  storeData?: any;
}

const NewDataForm = ({
  type,
  title,
  createData,
  storeData,
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
      break;
    case 2:
      return (
        <>
          <DataTypeForm2 title={title} />
        </>
      );
      break;
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
      break;
    default:
      break;
  }

  return <></>;
};

export default NewDataForm;
