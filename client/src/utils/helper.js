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
