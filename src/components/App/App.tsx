import React, { useEffect } from 'react';
import { Spin, Layout, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import css from './App.module.css';
import { setLoading, setItems } from '../../redux/services/servicesSlice';
import { getServicesStatus } from '../../api/getServicesStatus';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(setLoading(true));
      getServicesStatus()
        .then(result => {
          dispatch(setLoading(false));
          dispatch(setItems(result));
        })
        .catch( e=> console.error(e));
    }, []);

    const areServicesLoading = useAppSelector(state => state.services.loading);
    const loadedItems = useAppSelector(state => state.services.items);
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;
    return (
      <Layout className={css.Root}>
        {areServicesLoading ? <Spin /> : (
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {loadedItems.map(item => (
                  <Menu.Item key="1">{item.modeName}</Menu.Item>              
                ))}
              </Menu>
            </Sider>
            <Content></Content>
          </Layout>
        )}
      </Layout>
    );
  }

export default App;
