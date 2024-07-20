import { notification } from "antd";
import { createCategory, createUser, updateCategory, updateUser } from "apis";
import logo from "assets/logo.png";
import InputForm from "components/Form/InputForm";
import SelectForm from "components/Form/SelectForm";
import { ROLE } from "constant/roleUser";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showModal } from "redux/slicers/common.slicer";
import { convertBase64ToImage, convertImageToBase64 } from "utils/file";

function CategoryForm({ categoryCurrent, callbackUpdateAfter, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImageUpload] = useState(null);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const handleFillToForm = async () => {
      setValue("title", categoryCurrent["title"]);
      if (categoryCurrent?.thumb) {
        setPreviewImg(categoryCurrent?.thumb);
        let file = await convertBase64ToImage(categoryCurrent?.thumb);
        setImageUpload(file);
      }
      setBrands(categoryCurrent.brands);
    };

    if (categoryCurrent) {
      handleFillToForm();
    }
  }, []);

  const handleUpdate = async (data) => {
    if (!imgUpload) {
      notification.error({ message: "Please upload an image" });
      return;
    }
    const dataPayload = {
      ...data,
    };
    const formData = new FormData();
    for (let i of Object.entries(dataPayload)) formData.append(i[0], i[1]);
    for (let brand of brands) formData.append("brands", brand);
    formData.append("image", imgUpload);

    try {
      dispatch(showModal({ isShowModal: true, isAction: true }));
      let response;
      if (categoryCurrent?._id) {
        response = await updateCategory(categoryCurrent._id, formData);
        notification.success({
          message: "Category updated successfully",
        });
      } else {
        try {
          response = await createCategory(formData);
          notification.success({
            message: "Category created successfully",
          });
        } catch (error) {
          notification.error({
            message: "Category created successfully",
          });
        }
      }
      callbackUpdateAfter();
      dispatch(showModal({ isShow: false }));
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      const errorMessage = categoryCurrent?._id
        ? "Category update failed"
        : "Create failed";
      notification.error({
        message: `${errorMessage}: ${error?.message}`,
      });
    } finally {
      dispatch(showModal({ isShowModal: false }));
    }
  };

  let handleDeleteBrand = (index) => {
    const updatedBrands = [...brands];
    updatedBrands.splice(index, 1);
    setBrands(updatedBrands);
  };

  let handleCreateBrand = () => {
    const updatedBrands = [...brands, brand];
    setBrands(updatedBrands);
    setBrand("");
  };

  const handleOnchangeThumb = async (file) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      notification.error({ message: "File not supported..." });
      return;
    }
    let base64 = await convertImageToBase64(file);
    setPreviewImg(base64);
    setImageUpload(file);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
    >
      <div className="flex flex-col justify-center  w-full items-center ">
        <img src={logo} alt="logo" className="w-[300px] object-contain" />
        <h2 className="text-center border border-y-main w-full">
          {categoryCurrent ? `Form Edit Category` : "Form Create Category"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full gap-2"
      >
        <div className="flex items-center gap-8 ">
          <span className="font-bold">Thumb nail : </span>
          <label
            className="h-[200px] w-[200px] border-2 border-main p-2 flex justify-center items-center"
            htmlFor="thumbnail"
          >
            {previewImg ? (
              <img
                src={previewImg}
                alt=""
                className="object-contain w-full h-full"
              />
            ) : (
              <h1 className="font-bold text-blue-600 ">Chọn hình ảnh</h1>
            )}
          </label>
        </div>
        <input
          type="file"
          id="thumbnail"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleOnchangeThumb(e.target.files[0])}
          className="hidden"
        />
        <InputForm
          errors={errors}
          id={"title"}
          register={register}
          fullWidth
          validate={{
            required: `Require this field`,
          }}
        />
        <div className="flex w-full items-center gap-2 p-2 border border-main rounded">
          <label className="flex-1 font-bold" htmlFor="brand">
            Brands :
          </label>
          <input
            type="input"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Create brands..."
            className={`flex-4 w-full p-4  border outline-main  border-main  text-black  `}
          />
          <button
            className="bg-green-500 font-bold text-white"
            onClick={() => handleCreateBrand()}
            type="button"
          >
            Create{" "}
          </button>
        </div>

        <div className="w-full flex gap-2 overflow-auto">
          {brands.map((el, index) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-center bg-main rounded-lg border w-fit text-white  p-2"
            >
              <span className="font-bold">{el}</span>
              <span
                className="h-6 w-6 rounded-[50%] border border-white cursor-pointer bg-red-600 text-sm flex items-center justify-center"
                onClick={() => handleDeleteBrand(index)}
              >
                X
              </span>
            </div>
          ))}
        </div>
        <button className="w-full p-2 bg-main text-white" type="submit">
          {categoryCurrent ? `Update` : "Create"}
        </button>
      </form>
    </div>
  );
}

export default withBaseComponent(CategoryForm);
