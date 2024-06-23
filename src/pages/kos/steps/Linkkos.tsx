import { IKosType } from "@/utils/apis/kos/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface LinkProps {
  register: UseFormRegister<IKosType>;
  errors: FieldErrors<IKosType>;
}
const Linkkos = ({ register, errors }: LinkProps) => {
  return (

    <div className="max-w-6xl  mx-auto flex flex-col gap-y-[40px] p-3">
      <div className="flex flex-col  items-start  gap-x-3">
        <div className="flex w-full">
          <label htmlFor="Traveloka" className="w-52 whitespace-nowrap">
            Traveloka
          </label>
          <input
            {...register("traveloka")}
            type="text"
            id="Traveloka"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        {errors.traveloka && (
          <p className="text-red-500 text-sm whitespace-nowrap ml-44 mt-3">
            {errors.traveloka.message}
          </p>
        )}
      </div>
     
      <div className="flex flex-col  items-start  gap-x-3">
        <div className="flex w-full">
          <label htmlFor="Agoda" className="w-52 whitespace-nowrap">
            Agoda
          </label>
          <input
            {...register("agoda")}
            type="text"
            id="Agoda"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        {errors.agoda && (
          <p className="text-red-500 text-sm whitespace-nowrap ml-44 mt-3">
            {errors.agoda.message}
          </p>
        )}
      </div>
      <div className="flex flex-col  items-start  gap-x-3">
        <div className="flex w-full">
          <label htmlFor="Hotelcom" className="w-52 whitespace-nowrap">
           Hotel.com
          </label>
          <input
            {...register("hotelcom")}
            type="text"
            id="Hotelcom"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        {errors.hotelcom && (
          <p className="text-red-500 text-sm whitespace-nowrap ml-44 mt-3">
            {errors.hotelcom.message}
          </p>
        )}
      </div>
      <div className="flex flex-col  items-start  gap-x-3">
        <div className="flex w-full">
          <label htmlFor="Tiketcom" className="w-52 whitespace-nowrap">
            Tiket.com
          </label>
          <input
            {...register("tiketcom")}
            type="text"
            id="Tiketcom"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        {errors.tiketcom && (
          <p className="text-red-500 text-sm whitespace-nowrap ml-44 mt-3">
            {errors.tiketcom.message}
          </p>
        )}
      </div>

      </div>
  
  );
};

export default Linkkos;
