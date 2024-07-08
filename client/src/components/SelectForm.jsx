function SelectForm({
  label,
  options = {},
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
}) {
  const optionsConvert = Object.keys(options).map((key) => ({
    name: key,
    value: options[key],
  }));

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex w-full items-center">
        {id && (
          <label className="flex-1 font-bold" htmlFor={id}>
            {id.slice(0, 1).toUpperCase() + id.slice(1)} :
          </label>
        )}
        <select
          {...register(id, validate)}
          className={`flex-4 w-full p-2  border outline-main  border-main   `}
          id={id}
        >
          <option value="" disabled>
            Choose Option
          </option>
          {optionsConvert?.map((el) => (
            <option
              className="font-bold text-black"
              key={el.value}
              value={el.value}
            >
              {el.name}
            </option>
          ))}
        </select>
      </div>
      {errors[id] && (
        <small className="text-xs text-red-500 text-end">
          {errors[id].message}
        </small>
      )}
    </div>
  );
}

export default SelectForm;
