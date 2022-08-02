import { useState, ChangeEvent } from "react";
import Business from "../data/businessLine.json";
import Channel from "../data/channelType.json";
import TypeAd from "../data/typeAd.json";
import SourceMedia from "../data/sourceMedia.json";
import Select from "./Select";
import { useForm } from "../hooks/useForm";

const { businessLineData } = Business;
const { channelTypeData } = Channel;
const { typeAdData } = TypeAd;
const { sourceMediaData } = SourceMedia;

const Home = () => {
  const [dataSource, setDataSource] = useState("");
  const [recolectedData, setRecolectedData] = useState({});

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("form");
  };

  const handleDataSource = (test: any) => {
    test = parseInt(dataSource);
    const info = sourceMediaData.filter(
      (media: any) => media.idChannelType === test
    );
    return info;
  };

  const [formValues, handleInputChange] = useForm({
    businessLine: "",
    typeAd: "",
    channelType: "",
  });

  const { businessLine, typeAd, channelType } = formValues;

  //create a function to save all values of each select input
  // const saveId = () => {
  //   const id = recolectedData.map((item: any) => item.id);
  //   return id;
  // };

  // const handleChangeOption = (event: any) => {
  //   const option = event.target.value;
  //   saveId();
  //   setDataSource && setDataSource(option);
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Seleccionadores</h1>
        <input type="url" placeholder="Ingresa la url" />
        <select
          onChange={handleInputChange}
          name="businessLine"
          value={businessLine}
        >
          <option value={-1}>Selecciona una línea de negocioo</option>
          {businessLineData &&
            businessLineData?.map((value: any, index: number) => (
              <option value={value.id} key={value.id}>
                {value.name}
              </option>
            ))}
        </select>
        {/* <Select
          data={businessLineData}
          infoText={"Selecciona una línea de negocio"}
          type={"BusinessLine"}
        /> */}
        <select onChange={handleInputChange} name="typeAd" value={typeAd}>
          <option value={-1}>Selecciona el tipo inversiónnn</option>
          {typeAdData &&
            typeAdData?.map((value: any, index: number) => (
              <option value={value.id} key={value.id}>
                {value.name}
              </option>
            ))}
        </select>
        {/* <Select
          data={typeAdData}
          infoText={"Selecciona el tipo inversión"}
          type={"TypeAd"}
        /> */}
        <select
          onChange={handleInputChange}
          name="channelType"
          value={channelType}
        >
          <option value={-1}>Selecciona el tipo de canal</option>
          {channelTypeData &&
            channelTypeData?.map((value: any, index: number) => (
              <option value={value.id} key={value.id}>
                {value.name}
              </option>
            ))}
        </select>
        {/* <Select
          data={channelTypeData}
          infoText={"Selecciona el tipo de canal"}
          type={"ChannelType"}
          setData={setDataSource}
        /> */}

        <hr />

        <select
          onChange={handleInputChange}
          name="channelType"
          value={channelType}
        >
          <option value={-1}>Selecciona la fuente de la publicaciónrr</option>
          {handleDataSource(dataSource) &&
            handleDataSource(dataSource)?.map((value: any, index: number) => (
              <option value={value.id} key={value.id}>
                {value.name}
              </option>
            ))}
        </select>

        <Select
          data={handleDataSource(dataSource)}
          infoText={"Selecciona la fuente de la publicación"}
          type={"SourceMedia"}
        />
        <button>Generar url</button>
      </form>
    </>
  );
};

export default Home;
