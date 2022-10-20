import React from "react";
import Card from "./common/Card";

function RenderList({ data, status }) {
  const filteredData = data.filter((to) => to.status === status);

  return (
    <div className="list">
      <div className="status">
        <div className={status}></div>
        <div className="status-title">
          {status}({filteredData.length})
        </div>
      </div>
      <div>
        {filteredData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}

export default RenderList;
