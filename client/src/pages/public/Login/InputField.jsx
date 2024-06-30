function InputField({
  value,
  setValue,
  nameKey,
  type,
  invalidField,
  setInvalidField,
}) {
  return (
    <div className="w-full relative">
      {!!value?.trim() && (
        <label
          htmlFor={nameKey}
          className="text-[12px] absolute top-[-12px] left-[12px] block bg-white px-1 animate-slide-topsm"
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}

      <input
        type={type || "text"}
        className="px-6 py-4 rounded-sm w-full border placeholder:text-sm placeholder:italic outline-main"
        placeholder={
          "Enter your " +
          nameKey?.slice(0, 1).toUpperCase() +
          nameKey?.slice(1) +
          "..."
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
}

export default InputField;
