"use client";

import HamburgerIcon from "./components/HumbergerIcon";
import WrapperHamburger from "./components/WrapperHumberger";

const Header = ({ onOpen, open }: { onOpen: () => void; open: boolean }) => {
  return (
    <div
      style={{ filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.15))" }}
      className="w-full h-[78px] bg-[#FFF] fixed -top-0 right-0 flex justify-between align-center px-[24px] z-[1000]"
    >
      <div className="gap-4 flex items-center">
        <WrapperHamburger onClick={onOpen} open={open}>
          <HamburgerIcon />
        </WrapperHamburger>
        <h1 className="flex items-center font-bold text-[1.8em]">
          Internal HFG
        </h1>
      </div>
      <div className="flex items-center">Hello, Indra</div>
    </div>
  );
};

export default Header;
