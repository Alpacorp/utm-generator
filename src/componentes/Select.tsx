const Select = ({ data, infoText, setData }: any) => {
  const handleChangeOption = (event: any) => {
    const option = event.target.value;
    setData && setData(option);
  };

  const saveId = () => {
    const id = data.map((item: any) => item.id);
    return id;
  };

  return (
    <>
      <select onChange={handleChangeOption}>
        <option value={-1}>{infoText}</option>
        {data &&
          data?.map((value: any, index: number) => (
            <option value={value.id} key={value.id}>
              {value.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default Select;
