import { icons } from "@/constants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  buttonLabel: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Search = (props: Props) => {
  return (
    <div className="w-[353px] h-[64px] lg:w-[458px] max-w-full flex items-center justify-between border-[0.8px] border-grey px-4 py-3 rounded-[10px] hover:border-purple hover:border-[1px] ">
      <span className="flex items-center gap-3">
        <Image
          src={icons.search}
          alt="search icon"
          className="w-6 h-6 text-lightGrey"
        />

        <input
          type="search"
          placeholder={props.placeholder}
          className="lg:w-[180px] w-[140px] h-7 outline-none text-lightGrey"
          onChange={props.onChange}
        />
      </span>

      <button
        type="button"
        className="bg-purple text-white px-6 py-2 lg:px-8 lg:py-3 text-sm  font-semibold rounded-[10px] hover:bg-blue"
      >
        {props.buttonLabel}
      </button>
    </div>
  );
};

export default Search;
