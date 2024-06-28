function SelectOption({ icon }) {
  return (
    <div className="w-10 h-10 cursor-pointer bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white">
      {icon}
    </div>
  );
}

export default SelectOption;
