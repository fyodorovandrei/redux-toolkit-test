import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, selectPeople } from '../store/slices/people';
import moment from 'moment';
import { Link, Route } from 'react-router-dom';
import { Row, Col, Table, Input, notification } from 'antd';

const { Search } = Input;

import styles from './People.module.scss';
import Planet from './Planet';

let searchTimeout;
const SEARCH_TIMEOUT = 500;
const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Height', dataIndex: 'height', key: 'height' },
    { title: 'Mass', dataIndex: 'mass', key: 'mass' },
    {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
        render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
        title: 'Edited',
        dataIndex: 'edited',
        key: 'edited',
        render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
        title: 'Planet',
        dataIndex: 'homeworld',
        key: 'homeworld',
        render: (str) => {
            const id = str
                .split('/')
                .filter((i) => i)
                .reverse()[0];

            return <Link to={`/planet/${id}`}>{`Planet ${id}`}</Link>;
        }
    }
];

const People = () => {
    const [fetchParams, setFetchParams] = useState({
        page: 1,
        search: undefined
    });
    const dispatch = useDispatch();
    const { people, loading, total, error } = useSelector(selectPeople);

    useEffect(() => {
        dispatch(fetchPeople(fetchParams));
    }, [fetchParams]);

    useEffect(() => {
        if (error) {
            notification.error({
                message: error
            });
        }
    }, [error]);

    const handleSearch = (name) => {
        clearTimeout(searchTimeout);
        setFetchParams((params) => ({
            ...params,
            search: name
        }));
    };

    const handleOnChange = ({ target }) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            setFetchParams((params) => ({
                ...params,
                search: target.value
            }));
        }, SEARCH_TIMEOUT);
    };

    const handleChangeTable = (pagination) => {
        setFetchParams((params) => ({
            ...params,
            page: pagination.current
        }));
    };

    return (
        <div className={styles.people}>
            <Route exact path="/planet/:id">
                <Planet />
            </Route>
            <Row>
                <Col span={4} offset={20}>
                    <Search
                        className={styles.searchInput}
                        placeholder="Find people by name"
                        onSearch={handleSearch}
                        onChange={handleOnChange}
                        loading={loading}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={people}
                        pagination={{
                            total,
                            showSizeChanger: false
                        }}
                        rowKey="name"
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default People;
