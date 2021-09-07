import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import styles from './Left.module.scss';

const Left = () => {
    const location = useLocation();
    return (
        <Menu mode="inline" defaultSelectedKeys={[location.pathname]} className={styles.menu}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/people" icon={<UserOutlined />}>
                <Link to="/people">People</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Left;
