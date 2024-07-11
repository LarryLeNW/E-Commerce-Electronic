function Fieldset({ options }) {
  return (
    <div className="flex gap-5">
      <legend className="font-bold">Giới tính :</legend>
      <div className="flex gap-5">
        {options?.map((option, index) => (
          <div className="flex gap-2 ">
            <label htmlFor={index} key={option}>
              {option}
            </label>
            <input type="radio" id={index} name="gender" value={option} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fieldset;
