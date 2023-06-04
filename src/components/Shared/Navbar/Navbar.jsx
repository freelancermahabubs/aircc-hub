import Containers from "../Containers";
import Logo from "./Logo";
import Search from "./Search";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Containers>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <MenuDropdown />
          </div>
        </Containers>
      </div>
    </div>
  );
};

export default Navbar;
