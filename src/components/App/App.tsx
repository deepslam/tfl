import React, { useEffect } from "react";
import { Spin, Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import css from "./App.module.css";
import { setLoading, setItems } from "../../redux/services/servicesSlice";
import { getServicesStatus } from "../../api/getServicesStatus";
import { Menu } from "../Menu/Menu";
import { Content } from "../Content/Content";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getServicesStatus()
      .then((result) => {
        dispatch(setLoading(false));
        dispatch(
          setItems(
            result.sort(function (left, right) {
              var modeNameOrder = left.modeName.localeCompare(right.modeName);
              var nameOrder = left.name.localeCompare(right.name);
              return modeNameOrder || -nameOrder;
            })
          )
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const areServicesLoading = useAppSelector((state) => state.services.loading);

  const { Sider } = Layout;
  return (
    <Layout className={css.Root}>
      {areServicesLoading ? (
        <Spin />
      ) : (
        <Layout>
          <Sider>
            <Menu />
          </Sider>
          <Content />
        </Layout>
      )}
    </Layout>
  );
};

export default App;
