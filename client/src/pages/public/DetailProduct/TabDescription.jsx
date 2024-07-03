import { DescriptionProductTabs } from "constant";
import { useState } from "react";

const activeTabStyle = "bg-white border border-b-0";

function TabDescription() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {DescriptionProductTabs.map((el) => (
          <span
            className={`p-2 cursor-pointer px-4   ${
              activeTab === el.id ? activeTabStyle : "bg-gray-300"
            }`}
            key={el.id}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full min-h-[300px] border p-2">
        {DescriptionProductTabs[activeTab]?.content}
      </div>
    </div>
  );
}

export default TabDescription;
