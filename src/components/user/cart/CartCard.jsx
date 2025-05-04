import React, { useContext } from "react";
import images from "../../../assets/assets";
import { Trash2Icon } from "lucide-react";
import Loading from "../../basic components/Loading";
import { AppContext } from "../../../context/AppContext";

const CartCard = ({ carts }) => {
  const { updateCartQuantity } = useContext(AppContext);

  const handleIncrease = () => {
    updateCartQuantity(carts.bookId, carts.quantity + 1);
  };

  const handleDecrease = () => {
    if (carts.quantity > 1) {
      updateCartQuantity(carts.bookId, carts.quantity - 1);
    }
  };
  return carts ? (
    <div>
      <div className="flex flex-row justify-between border px-6 py-6 gap-24 rounded-xl">
        <div className="flex flex-row gap-10">
          <img className="w-[196px] h-[140px]" src={images.book2} alt="" />
          <div>
            <h1 className="text-[35px] font-semibold">{carts.book.title}</h1>
            <p className="text-3xl font-thin">by {carts.book.author}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex items-center gap-2 border px-3 py-1 rounded-md w-fit">
            <button onClick={handleDecrease} className="text-xl font-semibold">
              -
            </button>
            <span className="w-4 text-center">{carts.quantity}</span>
            <button onClick={handleIncrease} className="text-xl font-semibold">
              +
            </button>
          </div>
          <div className="w-[70px] ">NRS.{carts.book.price}</div>
          <div className="w-24 ">
            <p>Total</p>
            <p>NPS.{carts.book.price * carts.quantity}</p>
          </div>
          <Trash2Icon />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CartCard;
