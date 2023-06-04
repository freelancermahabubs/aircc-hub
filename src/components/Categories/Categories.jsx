import React from "react";
import Containers from "../Shared/Containers";
import { categories } from "./categoriesData";
import CategoryBox from "./CategoryBox";
const Categories = () => {
  return (
    <Containers>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox label={item.label} icon={item.icon} key={item.label} />
        ))}
      </div>
    </Containers>
  );
};

export default Categories;
