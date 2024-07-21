import { notification } from "antd";
import {
  createBlog,
  getBlog,
  getBlogCategories,
  getProductCategories,
  updateBlog,
} from "apis";
import { createProduct, getProduct, updateProduct } from "apis/product";
import InputForm from "components/Form/InputForm";
import MarkdownEditor from "components/Form/MarkdownEditor";
import SelectForm from "components/Form/SelectForm";
import withBaseComponent from "hocs";
import QueryString from "qs";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { showModal } from "redux/slicers/common.slicer";
import Swal from "sweetalert2";
import { convertBase64ToImage, convertImageToBase64 } from "utils/file";
import { validate } from "utils/helper";
import ICONS from "utils/icons";
import path from "utils/path";

function UpdateBlog({ dispatch, location }) {
  const { search } = location;
  let searchParams = QueryString.parse(search, { ignoreQueryPrefix: true });

  const [currentBlog, setCurrentBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImageUpload] = useState(null);
  const [payload, setPayload] = useState({ description: "" });
  const [invalidFields, setInvalidFields] = useState([]);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  // fetch blog category
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getBlogCategories();
      if (response?.success) setCategories(response?.data);
      setValue("category", response?.data[0]?.title);
    };
    fetchCategories();
  }, []);

  // fetch blog
  useEffect(() => {
    const fetchBlog = async (pid) => {
      const response = await getBlog(pid);
      if (response?.success) setCurrentBlog(response.data);
    };

    if (!!searchParams?.edit && !!searchParams?.bid)
      fetchBlog(searchParams?.bid);
  }, []);

  // filter product update to form
  useEffect(() => {
    const handleFillToForm = async () => {
      if (currentBlog) {
        setValue("category", currentBlog?.category);
        setValue("title", currentBlog?.title);
        setValue("numberViews", currentBlog?.numberViews);
        setValue("totalReaction", currentBlog?.totalReaction);
        payload.description = currentBlog?.description;
        if (currentBlog?.thumb) {
          setImageUpload(null);
          setPreviewImg(currentBlog?.thumb);
          let file = await convertBase64ToImage(currentBlog?.thumb);
          setImageUpload(file);
        }
      }
    };
    handleFillToForm();
  }, [currentBlog]);

  const handleConvertFile = async (file) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      notification.error({ message: "File not supported..." });
      return;
    }

    let base64 = await convertImageToBase64(file);
    setPreviewImg(base64);
    setImageUpload(file);
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleUpdateBlog = async (data) => {
    if (!imgUpload) {
      notification.error({ message: "Please upload an image" });
      return;
    }
    const invalids = validate(payload, setInvalidFields);
    if (!invalids || invalids === 0) {
      dispatch(showModal({ isShowModal: true, isAction: true }));
      const dataPayload = {
        ...data,
        ...payload,
      };

      const formData = new FormData();
      for (let i of Object.entries(dataPayload)) formData.append(i[0], i[1]);
      formData.append("image", imgUpload);

      try {
        let response;
        if (currentBlog)
          response = await updateBlog(currentBlog?._id, formData);
        else response = await createBlog(formData);

        if (response.success)
          Swal.fire(
            "Action Blogs",
            `${!!currentBlog ? "Updated" : "Created"} successfully`,
            "success"
          );
        else Swal.fire("Action Blogs", "Something went wrong", "error");
      } catch (error) {
        Swal.fire("Action Blogs", error?.response?.data?.message, "error");
      } finally {
        dispatch(showModal({ isShowModal: false }));
      }
    }
  };

  return (
    <div className="w-full p-4 flex flex-col overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        <div>{currentBlog ? "Update " : "Create "} Blog</div>
        <Link
          to={path.ADMIN.BLOG_MANAGEMENT}
          className="flex items-center gap-2 text-main cursor-pointer"
        >
          Back to list <ICONS.AiFillProduct />
        </Link>
      </div>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(handleUpdateBlog)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-6 ">
            <div className="font-bold">Thumb Image:</div>
            <label
              htmlFor="thumbnail"
              className="border border-main w-[200px] h-[30vh] flex justify-center items-center"
            >
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="preview"
                  className={`w-[200px]  h-[30vh] `}
                />
              ) : (
                <div className="font-bold ">Click to up image</div>
              )}
            </label>
          </div>
          <input
            type="file"
            placeholder="chose image product..."
            id={"thumbnail"}
            onChange={(e) => handleConvertFile(e.target.files[0])}
            multiple
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
          <div className="flex gap-3 flex-col">
            <InputForm
              errors={errors}
              id={"title"}
              register={register}
              fullWidth
              validate={{
                required: `Require this field`,
              }}
            />
          </div>

          <SelectForm
            errors={errors}
            id={"category"}
            register={register}
            validate={{ required: `Require this field` }}
            fullWidth
            options={categories?.reduce((prev, category) => {
              return { ...prev, [category?.title]: category?.title };
            }, {})}
          />
          {currentBlog && (
            <>
              <InputForm
                errors={errors}
                id={"numberViews"}
                register={register}
                fullWidth
                validate={{
                  required: `Require this field`,
                  pattern: {
                    value: /^[0-9]\d*$/,
                    message: "This field greater than 0",
                  },
                }}
              />
              <InputForm
                errors={errors}
                id={"totalReaction"}
                register={register}
                fullWidth
                validate={{
                  required: `Require this field`,
                  pattern: {
                    value: /^[0-9]\d*$/,
                    message: "This field greater than 0",
                  },
                }}
              />
            </>
          )}
          <MarkdownEditor
            label={"Description : "}
            name={"description"}
            value={payload.description.toString()}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <button className="w-full p-2 bg-main text-white" type="submit">
            {currentBlog ? `Update` : "Create"} Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default withBaseComponent(UpdateBlog);
