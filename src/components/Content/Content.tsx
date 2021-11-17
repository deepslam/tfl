import React from "react";
import { PageHeader, Typography, List } from "antd";
import { useAppSelector } from "../../redux/hooks";
import css from "./Content.module.css";
import { ServiceIcons } from "../ServiceIcons/ServiceIcons";
import { areThereAnyDisruptions, extractDisruptions } from "../../utils/common";

export const Content: React.FC = () => {
  const currentItem = useAppSelector((state) => state.services.selectedItem);

  if (!currentItem) return null;

  const { Title } = Typography;

  return (
    <div className={css.Root}>
      <PageHeader
        title={currentItem.name}
        tags={<ServiceIcons item={currentItem} />}
        subTitle={currentItem.modeName}
      >
        {areThereAnyDisruptions(currentItem) ? (
          <>
            <Title level={2}>Service currently suffering disruptions</Title>
            <List
              bordered
              dataSource={extractDisruptions(currentItem)}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[{item.statusSeverity}]</Typography.Text> {item.reason}
                </List.Item>
              )}
            />
          </>
        ) : (
          <Title level={2}>There are no disruptions at this moment</Title>
        )}
      </PageHeader>
    </div>
  );
};
