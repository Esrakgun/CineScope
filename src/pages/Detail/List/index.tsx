import * as React from "react";


interface Props {
  title: string;
  arr: { name: string }[];
}

const List: React.FC<Props> = ({ title, arr }) => {
  return (
    <div className="mb-4">
      {/* Başlık */}
      <h4 className="text-lg font-semibold mb-1 text-yellow-300">{title}</h4>
      
      {/* Liste */}
      <ul className="list-disc list-inside space-y-1 flex flex-wrap gap-5">
        {arr.map((item, i) => (
          <li 
            key={i} 
            className="text-sm border py-1 px-2 rounded-md"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
