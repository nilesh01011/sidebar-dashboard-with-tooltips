import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tooltips = (items, pathname) => {
  const [activeExpand, setActiveExpand] = useState(false);
  const router = useNavigate();
  const handleExpanded = () => {
    setActiveExpand(!activeExpand);
  };

  const handleRoutes = (links) => {
    router(links);
  };

  return (
    <div
      className={`sidebarClosed`}
      style={{
        color: pathname === items.link && "#ff3e5b",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          cursor: "pointer",
        }}
        onClick={() => handleExpanded()}
      >
        <span
          style={{ color: activeExpand && "#ff3e5b" }}
          onClick={() => handleRoutes(items?.items?.link)}
        >
          {items?.items?.name}
        </span>
        {/* arrow icons */}
        {items.items.isFolder && (
          <span
            style={{
              transition: "transform 0.3s ease-in-out",
              color: activeExpand && "#FF3E5B",
              transform: activeExpand && "rotate(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{ transform: "rotate(270deg)" }}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              ></path>
            </svg>
          </span>
        )}
      </div>
      {activeExpand && items.items.isFolder && (
        <ul className="tooltip-sub-menu">
          {items.items.items.map((el, index) => (
            <Tooltips key={index} items={el} pathname={pathname} />
          ))}
        </ul>
      )}
    </div>
  );
};

function MenuItems({ ele, collapsed, setCollapsed }) {
  const [expand, setExpand] = useState(false);
  const [activeTooltips, setActiveTooltips] = useState("");
  const router = useNavigate();

  const pathname = window.location.pathname;

  const handleExpanded = () => {
    if (collapsed === true) {
      setExpand(!expand);
    }
  };

  const handleRoutes = (ele) => {
    router(ele);
  };

  return (
    <li
      style={{
        justifyContent: collapsed ? "space-between" : "center",
      }}
      onMouseLeave={() => collapsed === false && setActiveTooltips("")}
    >
      <div
        style={{
          justifyContent: collapsed ? "" : "center",
        }}
        className="menu-items-heading"
        onClick={() => handleExpanded()}
      >
        <p
          onClick={() => handleRoutes(ele.link)}
          onMouseOver={() => collapsed === false && setActiveTooltips(ele.name)}
          // onMouseLeave={() => collapsed === false && setActiveTooltips("")}
        >
          <small
            style={{
              color: ele.isFolder
                ? expand && "#ff3e5b"
                : pathname === ele.link && "#ff3e5b",
            }}
            // onClick={() => collapsed === false && setCollapsed(true)}
          >
            {ele.icon}
          </small>

          {collapsed === true && (
            <span
              className={`${collapsed ? "" : "sidebarClosed"}`}
              style={{
                color: ele.isFolder
                  ? expand && "#ff3e5b"
                  : pathname === ele.link && "#ff3e5b",
              }}
            >
              {ele.name}
            </span>
          )}
        </p>
        {/* arrow icons */}
        {collapsed && ele.isFolder && (
          <span
            style={{
              transform: expand && "rotate(180deg)",
              transition: "transform 0.3s ease-in-out",
              color: expand && "#FF3E5B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{ transform: "rotate(270deg)" }}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              ></path>
            </svg>
          </span>
        )}
      </div>
      {expand && collapsed === true && ele.isFolder && (
        <ul className="sub-menu">
          {ele.items.map((el, index) => (
            <MenuItems key={index} ele={el} collapsed={collapsed} />
          ))}
        </ul>
      )}

      {/* tooltips */}
      {/* {collapsed === false && (
        <div className="tooltips">
          {ele.isFolder ? (
            ele.items.map((el, index) => (
              <MuiltipleTooltips
                title={ele.name}
                key={index}
                items={el}
                expand={expand}
                pathname={pathname}
              />
            ))
          ) : (
            <Tooltips items={ele} expand={expand} pathname={pathname} />
          )}
        </div>
      )} */}
      {activeTooltips && collapsed === false && (
        <div className="tooltips">
          <Tooltips
            items={ele}
            pathname={pathname}
            handleRoutes={handleRoutes}
          />
        </div>
      )}
    </li>
  );
}

export default MenuItems;
