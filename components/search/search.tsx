import { icons } from "@/constants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  buttonLabel: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onClickSearchButton: () => void;
  lgFrameWidth: string;
  lgInputWidth: string;
};

const Search = (props: Props) => {
  return (
    <div
      className={`w-[353px] h-[64px] lg:w-[${props.lgFrameWidth}] lg:h-[72px] max-w-full flex items-center justify-between border-[0.8px] border-grey px-4 py-3 rounded-[10px] hover:border-purple hover:border-[1px] `}
    >
      <span className="flex items-center gap-3">
        <Image
          src={icons.search}
          alt="search icon"
          className="w-6 h-6 text-lightGrey"
        />

        <input
          type="search"
          placeholder={props.placeholder}
          className={`lg:w-[${props.lgInputWidth}] w-[150px] h-7 outline-none text-lightGrey`}
          onChange={props.onChange}
          value={props.value}
          name={props.value}
          id={props.value}
        />
      </span>

      <button
        type="submit"
        disabled={!props.value}
        onClick={props.onClickSearchButton}
        className="signup_button"
      >
        {props.buttonLabel}
      </button>
    </div>
  );
};

export default Search;