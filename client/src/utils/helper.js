import { ROLE } from "constant/roleUser";
import ICONS from "./icons";

let MaxStar = 5;

export const convertSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStars = (number, size) => {
  if (!Number(number)) number = 5;
  const starsRender = [];
  let starEmpty = MaxStar - +number;
  for (let i = 0; i < +number; i++)
    starsRender.push(<ICONS.AiFillStar color="orange" size={size || 16} />);
  for (let i = 0; i < starEmpty; i++)
    starsRender.push(<ICONS.AiOutlineStar color="orange" size={size || 16} />);
  return starsRender;
};

export const secondsToHms = (d) => {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);

  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: `Required ${arr[0]} field` },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = "";
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: "Email invalid" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6 || arr[1].length > 20) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              message: `${arr[0]} minium 6 characters and max 20 characters `,
            },
          ]);
        }
        break;
      default:
        break;
    }
  }
};

export const validateValue = {
  isValidEmail: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  isValidPhoneNumber: (value) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(value);
  },
};

export const validateForm = (payload, setInValidFields) => {
  // let inValidFields = 0;
  setInValidFields({});
  for (let arr of Object.entries(payload)) {
    if (arr[1].trim() === "") {
      // inValidFields++;
      setInValidFields((prev) => {
        return {
          ...prev,
          [arr[0]]: `Vui lòng nhập ${arr[0]} `,
        };
      });
      continue;
    }
    if (arr[0] === "email" && !validateValue.isValidEmail(arr[1])) {
      setInValidFields((prev) => {
        return {
          ...prev,
          [arr[0]]: `Không đúng định dạng email`,
        };
      });
      continue;
    }

    if (arr[0] === "password") {
      setInValidFields((prev) => {
        if (arr[1].length <= 6 || arr[1].length > 20)
          return {
            ...prev,
            [arr[0]]: `Vui lòng nhập mật khẩu lớn 6 và nhỏ hơn 20 `,
          };
        return { ...prev };
      });
    }

    if (arr[0] === "confirmPassword") {
      setInValidFields((prev) => {
        if (payload.password !== payload.confirmPassword)
          return {
            ...prev,
            [arr[0]]: `Mật khẩu xác nhận không khớp nhau`,
          };
        return { ...prev };
      });
    }
  }
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, i) => start + i);
};

export const convertCodeRoleToName = (code) => {
  return (
    Object.keys(ROLE).find((key) => ROLE[key] === code) || "Không xác định..."
  );
};

export const convertImgToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
