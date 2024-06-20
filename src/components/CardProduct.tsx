import { FC, ReactEventHandler } from "react";
import NumberFormatter from "./NumberFormatter";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AlertDelete from "./AlertDelete";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { toast } from "./ui/use-toast";
import { deleteKos } from "@/utils/apis/kos/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/koskitaa.png";

export interface searchKos {
  hidden: boolean;
  kos_name: string | undefined;
  rating: string | undefined;
  price: number | undefined;
  rooms?: string | undefined;
  category?: string | undefined;
  address?: string | undefined;
  kos_facilities?: {
    id: number;
    facility: string;
  }[];
  photo_kos: string | any | undefined;
  direct?: ReactEventHandler | undefined;
  id?: any | undefined;
  refetchData?: () => void;
}

const getSentencesAfterNCommas = (text: string | any, n: number) => {
  const sentences = text.split(". "); // Pisahkan kalimat
  const resultSentences = sentences.map((sentence: any) => {
    const commaIndex = [];
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] === ",") {
        commaIndex.push(i);
      }
      if (commaIndex.length === n) {
        break;
      }
    }
    const result = commaIndex.length >= n ? sentence.slice(commaIndex[n - 1] + 1) : sentence;
    return result.trim();
  });

  return resultSentences;
};

const CardProduct: FC<searchKos> = (props: searchKos) => {
  const { hidden, kos_name, rating, category, price, rooms, address, kos_facilities, photo_kos, direct, refetchData } = props;
  const navigate = useNavigate();
  const handleDeleteKos = async () => {
    try {
      const result = await deleteKos(props.id);
      toast({
        description: result.message,
      });
      refetchData!();
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className=" md:pr-20 mt-11 overflow-hidden bg-zinc-100 rounded-[60px_60px_60px_12px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-3 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full overflow-hidden">
            <img loading="lazy" srcSet={photo_kos ? photo_kos : logo} className="w-full md:h-[20rem] h-[12rem]  border-2 border-slate-100 " />
          </div>
          <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow py-5 md:py-11 max-md:px-5">
              <div className="flex items-center justify-between">
                <h2 onClick={direct} className="cursor-pointer font-bold text-xl hover:text-2xl">
                  {kos_name}
                </h2>
                {hidden ? (
                  <>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="max-w-32 space-1 p-0">
                        <div className="w-full flex items-center gap-x-2 cursor-pointer px-3 py-2 hover:bg-slate-100" onClick={() => navigate(`/edit-kos/${props.id}`)}>
                          <Edit className="size-4 text-teal-500" /> Edit
                        </div>
                        <Separator />
                        <AlertDelete title="Delete Kos" description={"Apakah yakin ingin menghapus ?"} onAction={handleDeleteKos}>
                          <div className="w-full flex items-center gap-x-2 cursor-pointer px-3 py-2 hover:bg-slate-100">
                            <Trash2 className="size-4 text-red-500" /> Delete
                          </div>
                        </AlertDelete>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : null}
              </div>
              <div className="flex items-center w-full gap-5 mt-4 md:mt-8 flex-wrap">
                <div className="text-sm leading-4 gap-5 whitespace-nowrap text-neutral-900">
                  {kos_facilities?.slice(0, 3).map((item, index) => (
                    <span key={index}>
                      {item.facility}
                      {index !== 2 && " | "}
                    </span>
                  ))}
                </div>
                {!hidden && <div className="text-sm py-1 px-4 bg-white/50 shadow rounded-lg">{category}</div>}
              </div>

              <div>
                <div className="flex gap-3 justify-between mt-3.5 text-base whitespace-nowrap">
                  {!hidden && <div className=" justify-center px-5 py-1 text-white bg-lime-600 rounded-[30px]">AVAILABLE</div>}
                  <div className="grow my-auto text-neutral-900">
                    dari <NumberFormatter value={price ? price : 0} /> /bulan
                  </div>
                </div>
              </div>

              <div className="mt-6  text-base whitespace-nowrap text-neutral-900 max-md:ml-2.5 flex gap-3 justify-start items-center">
                <img width="20" height="20" src="https://img.icons8.com/ios/50/marker--v1.png" alt="marker--v1" /> <span className="text-xs w-full whitespace-pre-line">{getSentencesAfterNCommas(address, 4)}</span>
              </div>
              <div className="flex gap-5 justify-between mt-8 text-xs font-bold leading-5">
                <div className="flex gap-2 justify-between whitespace-nowrap text-stone-950">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3064243ec75f1730094f8347466f60fab0cc73015f1520a7cd67831cd2fbc934?" className="w-5 aspect-square" />
                  <div className="my-auto">{rating}</div>
                </div>
                {!hidden && <div className="flex-auto text-black">Tersisa : {rooms} kamar</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
