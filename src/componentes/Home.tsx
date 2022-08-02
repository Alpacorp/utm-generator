import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Grid, TextField } from "@mui/material";
import { useForm } from "../hooks/useForm";

// import { useState } from "react";
import Business from "../data/businessLine.json";
import Channel from "../data/channelType.json";
import TypeAd from "../data/typeAd.json";
import SourceMedia from "../data/sourceMedia.json";

const { businessLineData } = Business;
const { channelTypeData } = Channel;
const { typeAdData } = TypeAd;
const { sourceMediaData } = SourceMedia;

export default function Home() {
  const [formValues, handleInputChange] = useForm({
    url: "",
    businessLine: "",
    typeAd: "",
    channelType: "",
  });

  const { url, businessLine, channelType, typeAd } = formValues;

  const sourceTest = sourceMediaData.filter(
    (item) => item.idChannelType === typeAd
  );
  console.log("typeAd", typeAd);
  console.log("businessLine", businessLine);
  console.log("channelType", channelType);

  return (
    <div>
      <Grid>
        <TextField
          id="url"
          name="url"
          label="url"
          value={url}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          error={false}
          required
          type="url"
          helperText="Coloca la url de la página destino"
          // disabled={statusInput}
        />
        <TextField
          id="businessLine"
          name="businessLine"
          label="Selecciona una línea de negocio"
          variant="outlined"
          select
          size="small"
          value={businessLine}
          onChange={handleInputChange}
          helperText="Selecciona una línea de negocio"
          required
          // disabled={statusInput}
        >
          {businessLineData.map((value: any, index: number) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="typeAd"
          name="typeAd"
          label="Selecciona el tipo de inversión"
          variant="outlined"
          select
          size="small"
          value={typeAd}
          onChange={handleInputChange}
          helperText="Selecciona el tipo de inversión"
          required
          // disabled={statusInput}
        >
          {typeAdData.map((value: any, index: number) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="channelType"
          name="channelType"
          label="Selecciona el tipo de canal"
          variant="outlined"
          select
          size="small"
          value={channelType}
          onChange={handleInputChange}
          helperText="Selecciona el tipo de canal"
          required
          // disabled={statusInput}
        >
          {channelTypeData.map((value: any, index: number) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="channelType"
          name="channelType"
          label="Selecciona"
          variant="outlined"
          select
          size="small"
          value={channelType}
          onChange={handleInputChange}
          helperText="Selecciona la fuente de publicación"
          required
          // disabled={statusInput}
        >
          {sourceTest.map((value: any, index: number) => (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </div>
  );
}

// const Home = () => {
//   const [dataSource, setDataSource] = useState("");
//   const [recolectedData, setRecolectedData] = useState({});

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     console.log("form");
//   };

//   const handleDataSource = (test: any) => {
//     test = parseInt(dataSource);
//     const info = sourceMediaData.filter(
//       (media: any) => media.idChannelType === test
//     );
//     return info;
//   };

//   const [formValues, handleInputChange] = useForm({
//     businessLine: "",
//     typeAd: "",
//     channelType: "",
//   });

//   const { businessLine, typeAd, channelType } = formValues;

//   //create a function to save all values of each select input
//   // const saveId = () => {
//   //   const id = recolectedData.map((item: any) => item.id);
//   //   return id;
//   // };

//   // const handleChangeOption = (event: any) => {
//   //   const option = event.target.value;
//   //   saveId();
//   //   setDataSource && setDataSource(option);
//   // };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h1>Seleccionadores</h1>
//         <input type="url" placeholder="Ingresa la url" />
//         <select
//           onChange={handleInputChange}
//           name="businessLine"
//           value={businessLine}
//         >
//           <option value={-1}>Selecciona una línea de negocioo</option>
//           {businessLineData &&
//             businessLineData?.map((value: any, index: number) => (
//               <option value={value.id} key={value.id}>
//                 {value.name}
//               </option>
//             ))}
//         </select>
//         {/* <Select
//           data={businessLineData}
//           infoText={"Selecciona una línea de negocio"}
//           type={"BusinessLine"}
//         /> */}
//         <select onChange={handleInputChange} name="typeAd" value={typeAd}>
//           <option value={-1}>Selecciona el tipo inversiónnn</option>
//           {typeAdData &&
//             typeAdData?.map((value: any, index: number) => (
//               <option value={value.id} key={value.id}>
//                 {value.name}
//               </option>
//             ))}
//         </select>
//         {/* <Select
//           data={typeAdData}
//           infoText={"Selecciona el tipo inversión"}
//           type={"TypeAd"}
//         /> */}
//         <select
//           onChange={handleInputChange}
//           name="channelType"
//           value={channelType}
//         >
//           <option value={-1}>Selecciona el tipo de canal</option>
//           {channelTypeData &&
//             channelTypeData?.map((value: any, index: number) => (
//               <option value={value.id} key={value.id}>
//                 {value.name}
//               </option>
//             ))}
//         </select>
//         {/* <Select
//           data={channelTypeData}
//           infoText={"Selecciona el tipo de canal"}
//           type={"ChannelType"}
//           setData={setDataSource}
//         /> */}

//         <hr />

//         <select
//           onChange={handleInputChange}
//           name="channelType"
//           value={channelType}
//         >
//           <option value={-1}>Selecciona la fuente de la publicaciónrr</option>
//           {handleDataSource(dataSource) &&
//             handleDataSource(dataSource)?.map((value: any, index: number) => (
//               <option value={value.id} key={value.id}>
//                 {value.name}
//               </option>
//             ))}
//         </select>

//         <Select
//           data={handleDataSource(dataSource)}
//           infoText={"Selecciona la fuente de la publicación"}
//           type={"SourceMedia"}
//         />
//         <button>Generar url</button>
//       </form>
//     </>
//   );
// };

// export default Home;
