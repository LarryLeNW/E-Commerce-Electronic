import { notification } from "antd";
import { createBlogCategories, updateBlogCategories } from "apis";
import logo from "assets/logo.png";
import InputForm from "components/Form/InputForm";
import withBaseComponent from "hocs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showModal } from "redux/slicers/common.slicer";

function FormModal({ blogCategoryCurrent, callbackUpdateAfter, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const handleFillToForm = async () => {
      setValue("title", blogCategoryCurrent["title"]);
      setValue("totalBlogs", blogCategoryCurrent["totalBlogs"]);
    };

    if (blogCategoryCurrent) {
      handleFillToForm();
    }
  }, []);

  const handleUpdate = async (data) => {
    try {
      dispatch(showModal({ isShowModal: true, isAction: true }));
      let response;
      if (blogCategoryCurrent?._id) {
        response = await updateBlogCategories(blogCategoryCurrent._id, data);
        notification.success({
          message: "Updated successfully",
        });
      } else {
        try {
          response = await createBlogCategories(data);
          notification.success({
            message: "Created successfully",
          });
        } catch (error) {
          notification.error({
            message: "Create failed",
          });
        }
      }
      callbackUpdateAfter();
      dispatch(showModal({ isShow: false }));
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      const errorMessage = blogCategoryCurrent?._id
        ? "Update failed"
        : "Create failed";
      notification.error({
        message: errorMessage,
      });
    } finally {
      dispatch(showModal({ isShowModal: false }));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
    >
      <div className="flex flex-col justify-center  w-full items-center ">
        <img src={logo} alt="logo" className="w-[300px] object-contain" />
        <h2 className="text-center border border-y-main w-full">
          {blogCategoryCurrent ? `Edit Blog Category` : "Create Blog Category"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full gap-2"
      >
        <InputForm
          errors={errors}
          id={"title"}
          register={register}
          fullWidth
          validate={{
            required: `Require this field`,
          }}
        />
        {blogCategoryCurrent && (
          <InputForm
            errors={errors}
            id={"totalBlogs"}
            type="number"
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
              pattern: {
                value: /^[1-9]\d*$/,
                message: "This field greater than 0",
              },
            }}
          />
        )}

        <button className="w-full p-2 bg-main text-white" type="submit">
          {blogCategoryCurrent ? `Update` : "Create"}
        </button>
      </form>
    </div>
  );
}

export default withBaseComponent(FormModal);
