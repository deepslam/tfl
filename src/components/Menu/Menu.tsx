import React, { useState } from "react";
import { Menu as AntMenu } from "antd";
import css from "./Menu.module.css";
import { serviceStatusType } from "../../api/getServicesStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ServiceIcons } from "../ServiceIcons/ServiceIcons";
import { selectItem } from "../../redux/services/servicesSlice";

export const Menu: React.FC = () => {
  const loadedItems = useAppSelector((state) => {
    const result: Record<string, serviceStatusType[]> = {};
    state.services.items.forEach((item) => {
      if (!result[item.modeName]) {
        result[item.modeName] = [];
      }
      result[item.modeName].push(item);
    });
    return result;
  });
  const dispatch = useAppDispatch();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { SubMenu } = AntMenu;

  return (
    <AntMenu mode="inline" openKeys={openKeys} className={css.Menu}>
      {Object.keys(loadedItems).map((modeName) => (
        <SubMenu
          key={modeName}
          title={modeName}
          onTitleClick={() => {
            if (openKeys.includes(modeName)) {
              setOpenKeys([...openKeys.filter((item) => item !== modeName)]);
            } else {
              setOpenKeys([...openKeys.concat([modeName])]);
            }
          }}
        >
          {loadedItems[modeName].map((item, key) => (
            <AntMenu.Item
              key={`${item.id}${key}`}
              icon={<ServiceIcons item={item} />}
              onClick={() => {
                dispatch(selectItem(item));
              }}
            >
              {item.name}
            </AntMenu.Item>
          ))}
        </SubMenu>
      ))}
    </AntMenu>
  );
};
