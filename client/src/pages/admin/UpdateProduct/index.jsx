import { notification } from "antd";
import { getCategories } from "apis";
import { getProduct } from "apis/product";
import InputForm from "components/InputForm";
import MarkdownEditor from "components/MarkdownEditor";
import SelectForm from "components/SelectForm";
import QueryString from "qs";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { convertImgToBase64, validate } from "utils/helper";

function UpdateProduct() {
  const [updateProduct, setUpdateProduct] = useState(null);
  const { search } = useLocation();
  let searchParams = QueryString.parse(search, { ignoreQueryPrefix: true });
  const [categories, setCategories] = useState({ data: [] });
  const [previewImg, setPreviewImg] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  console.log("🚀 ~ UpdateProduct ~ payload:", payload);
  const [invalidFields, setInvalidFields] = useState([]);
  const [indexImgHover, setIndexImgHover] = useState(null);

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response?.success) setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleConvertFile = async (files) => {
    setPreviewImg([]);
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        notification.error({ message: "File not supported..." });
        return;
      }
      const base64 = await convertImgToBase64(file);
      setPreviewImg((prev) => [base64, ...prev]);
    }
    if (previewImg.length > 0)
      setPayload((prev) => ({ ...prev, images: previewImg }));
  };

  useEffect(() => {
    handleConvertFile(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    if (!!searchParams?.edit && !!searchParams?.pid)
      fetchProduct(searchParams?.pid);
  }, []);

  const handleUpdateProduct = (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (!invalids || invalids === 0) {
      const dataPayload = {
        ...data,
        ...payload,
        category: categories?.data[+data?.category]?.title,
      };

      const formData = new FormData();
      for (let i of Object.entries(dataPayload)) formData.append(i[0], i[1]);

      for (var pair of formData.entries()) console.log(pair[0] + " " + pair[1]);
    }
  };

  const fetchProduct = async (pid) => {
    const response = await getProduct(pid);
    if (response?.success) setUpdateProduct(response.data);
  };

  const setHoverImgReview = (i) => {
    setIndexImgHover(i);
  };

  const handleRemoveImg = (index) => {
    reset({
      images: [...watch("images")]?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="w-full p-4 flex flex-col overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        {updateProduct ? "Update " : "Create "} Product
      </div>
      <div className="p-4">
        <div className="flex gap-2 overflow-auto">
          {previewImg?.map((img, index) => (
            <div
              onMouseEnter={() => setHoverImgReview(index)}
              key={index}
              className="relative w-[200px] h-fit"
            >
              <img
                src={img}
                alt="preview "
                className={`w-[200px]  h-[30vh] `}
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
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="flex flex-col gap-2"
        >
          <div>
            <input
              type="file"
              placeholder="chose image product..."
              id={"images"}
              {...register("images", { required: "Require image product" })}
              multiple
              accept=".jpg, .jpeg, .png"
            />
            {errors["images"] && (
              <small className="text-xs text-red-500 text-end">
                {errors["images"].message}
              </small>
            )}
          </div>
          <InputForm
            errors={errors}
            id={"title"}
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
            }}
          />
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
          <div className="flex gap-3">
            <SelectForm
              errors={errors}
              id={"category"}
              register={register}
              validate={{ required: `Require this field` }}
              fullWidth
              options={categories?.data?.reduce((prev, category, index) => {
                return { ...prev, [category?.title]: index };
              }, {})}
            />
            <SelectForm
              errors={errors}
              id={"brand"}
              register={register}
              validate={{ required: `Require this field` }}
              fullWidth
              options={categories?.data[watch("category")]?.brand?.reduce(
                (prev, brand) => {
                  return { ...prev, [brand]: brand };
                },
                {}
              )}
            />
          </div>
          <MarkdownEditor
            label={"Description : "}
            name={"description"}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <button className="w-full p-2 bg-main text-white" type="submit">
            {updateProduct ? `Update` : "Create"} Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
