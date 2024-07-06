import { memo, useEffect, useState } from "react";
import { getProducts } from "apis/product";
import ICONS from "utils/icons";
import { formatMoney, renderStars, secondsToHms } from "utils/helper";
import CountDown from "./Countdown";
import moment from "moment";

let interval;
function DealDaily() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const [dealProducts, setDealPoducts] = useState([]);

  const fetchDealDaily = async () => {
    const response = await getProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response?.success) {
      setDealPoducts(response.data[0]);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    if (expireTime) {
      interval && clearInterval(interval);
      fetchDealDaily();
    }
    setExpireTime(false);
  }, [expireTime]);

  useEffect(() => {
    interval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(true);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [hour, minute, second]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4">
        <span className="flex-2 flex text-main justify-center">
          {<ICONS.AiFillStar size={20} />}
        </span>
        <span className="flex-5 font-bold text-[20px]  flex justify-center">
          Deal Daily
        </span>
        <span className="flex-3"></span>
      </div>
      <div className="w-full flex flex-col items-center">
        <img
          src={
            dealProducts?.thumb ||
            "https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
          }
          alt={dealProducts?.title}
          className="w-full  object-cover"
        />
        <span className="line-clamp-1 text-center">{dealProducts?.title}</span>
        <span className="flex ">
          {renderStars(dealProducts?.totalRatings, 20).map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span>{formatMoney(dealProducts?.price)} VNĐ</span>
      </div>
      <div className="px-4 pt-4">
        <div className="flex justify-center gap-2 items-center mb-4">
          <CountDown unit={"hours"} number={hour} />
          <CountDown unit={"minutes"} number={minute} />
          <CountDown unit={"seconds"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <ICONS.AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
}

export default memo(DealDaily);
