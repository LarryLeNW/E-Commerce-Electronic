import { notification } from "antd";
import { getCategories } from "apis";
import {
  createProduct,
  createVariant,
  getProduct,
  updateProduct,
} from "apis/product";
import InputForm from "components/Form/InputForm";
import MarkdownEditor from "components/Form/MarkdownEditor";
import SelectForm from "components/Form/SelectForm";
import withBaseComponent from "hocs";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { showModal } from "redux/slicers/common.slicer";
import Swal from "sweetalert2";
import { convertBase64ToImage, convertImageToBase64 } from "utils/file";
import { validate } from "utils/helper";
import ICONS from "utils/icons";
import path from "utils/path";

function VariantForm({
  dispatch,
  variantCurrent,
  productCurrent,
  callbackUpdateAfter,
}) {
  console.log("🚀 ~ VariantForm ~ productCurrent:", productCurrent);
  console.log("🚀 ~ VariantForm ~ variantCurrent:", variantCurrent);

  const [previewImg, setPreviewImg] = useState([]);
  const [imgUpload, setImageUpload] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  const [invalidFields, setInvalidFields] = useState([]);
  const [indexImgHover, setIndexImgHover] = useState(null);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  // filter product update to form
  useEffect(() => {
    const handleFillToForm = async () => {
      if (variantCurrent) {
        setValue("title", variantCurrent?.title);
        setValue("price", variantCurrent?.price);
        setValue("quantity", variantCurrent?.quantity);
        payload.description = variantCurrent?.description.toString();
        if (variantCurrent?.images) {
          setImageUpload([]);
          setPreviewImg(variantCurrent?.images);
          for (let image of variantCurrent?.images) {
            let file = await convertBase64ToImage(image);
            setImageUpload((prev) => [...prev, file]);
          }
        }
      } else {
        setValue("title", productCurrent?.title);
        setValue("price", productCurrent?.price);
        payload.description = productCurrent?.description.toString();
      }
    };

    handleFillToForm();
  }, [variantCurrent]);

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleConvertFile = async (files) => {
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        notification.error({ message: "File not supported..." });
        return;
      }
      let base64 = await convertImageToBase64(file);
      setPreviewImg((prev) => [base64, ...prev]);
      setImageUpload((prev) => [file, ...prev]);
    }
  };

  const handleUpdateVariant = async (data) => {
    if (imgUpload.length == 0) {
      notification.error({ message: "Please upload at least one image..." });
      return;
    }
    const invalids = validate(payload, setInvalidFields);
    console.log("🚀 ~ handleUpdateVariant ~ invalids:", invalids);
    if (invalids === 0) {
      dispatch(showModal({ isShowModal: true, isAction: true }));
      const dataPayload = {
        ...data,
        ...payload,
      };
      const formData = new FormData();
      for (let i of Object.entries(dataPayload)) formData.append(i[0], i[1]);

      if (imgUpload) {
        for (let image of imgUpload) formData.append("images", image);
      }

      for (let x of formData) {
        console.log(x);
      }

      try {
        let response;
        // if (variantCurrent)
        //   response = await updateProduct(variantCurrent?._id, formData);
        response = await createVariant(productCurrent?._id, formData);
        if (response.success)
          Swal.fire(
            "Action Product",
            `Product ${!!variantCurrent ? "updated" : "created"} successfully`,
            "success"
          ).then(() => callbackUpdateAfter(response.data));
        else Swal.fire("Action Product", response.message, "error");
      } catch (error) {
        Swal.fire("Action Product", error?.response?.data?.message, "error");
      } finally {
        dispatch(showModal({ isShowModal: false }));
      }
    }
  };

  const setHoverImgReview = (i) => {
    setIndexImgHover(i);
  };

  const handleRemoveImg = (index) => {
    const uploadImg = [...imgUpload];
    uploadImg.splice(index, 1);
    setImageUpload(uploadImg);
    const newPreviewImg = [...previewImg];
    newPreviewImg.splice(index, 1);
    setPreviewImg(newPreviewImg);
  };

  return (
    <div
      className="w-main p-4  mt-2 flex flex-col  bg-white text-black  overflow-auto "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-[75px] flex justify-between items-center text-sm font-bold px-4 border-b border-blue-300">
        <div>
          {variantCurrent ? `Update ` : "Create "}
          {productCurrent?.title + " Variant"}
        </div>
        <label htmlFor="images">Chọn ảnh cho variant</label>
      </div>
      <div className="p-4">
        <div className="flex gap-2  overflow-auto">
          {!!previewImg &&
            previewImg?.map((img, index) => (
              <div
                onMouseEnter={() => setHoverImgReview(index)}
                key={index}
                className="relative w-[150px] h-[20vh]"
              >
                <img
                  src={img}
                  alt="preview "
                  className={`w-[150px]  h-[20vh] `}
                />
                {indexImgHover != NaN && indexImgHover === index && (
                  <span
                    onClick={() => handleRemoveImg(index)}
                    className="animate-scale-up-center absolute top-2 right-2 text-red-white bg-rose-500 w-10 h-10 text-center cursor-pointer hover:bg-red-600 p-2 rounded-[50%] border-2"
                  >
                    X
                  </span>
                )}
              </div>
            ))}
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateVariant)}
          className="flex flex-col gap-2 text-sm"
        >
          <div>
            <input
              type="file"
              placeholder="chose image product..."
              id={"images"}
              onChange={(e) => handleConvertFile(e.target.files)}
              multiple
              accept=".jpg, .jpeg, .png"
              className="hidden"
            />
            {errors["images"] && (
              <small className="text-xs text-red-500 text-end">
                {errors["images"].message}
              </small>
            )}
          </div>
          <div className="flex gap-3">
            <InputForm
              errors={errors}
              id={"title"}
              register={register}
              fullWidth
              validate={{
                required: `Require this field`,
              }}
            />
            <InputForm
              errors={errors}
              id={"color"}
              register={register}
              fullWidth
              validate={{
                required: `Require this field`,
              }}
            />
          </div>
          <div className="flex gap-3">
            <InputForm
              errors={errors}
              id={"price"}
              register={register}
              fullWidth
              validate={{
                required: `Require this field`,
              }}
              type="number"
              style={"flex-1 "}
            />
            <InputForm
              errors={errors}
              id={"quantity"}
              register={register}
              fullWidth
              validate={{
                required: `Require this field`,
              }}
              type="number"
              style={"flex-1"}
            />
          </div>
          <MarkdownEditor
            label={"Description : "}
            name={"description"}
            value={payload.description.toString()}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            height={300}
          />
          <button className="w-full p-2 bg-main text-white" type="submit">
            {variantCurrent ? `Update` : "Create"} Variant
          </button>
        </form>
      </div>
    </div>
  );
}

export default withBaseComponent(VariantForm);
