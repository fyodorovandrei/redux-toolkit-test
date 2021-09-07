import { Modal, Row, Col, notification } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanet, selectPlanet } from '../store/slices/planet';
import { Spin } from 'antd';

const Planet = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const { planet, loading, error } = useSelector(selectPlanet);

    useEffect(() => {
        dispatch(fetchPlanet({ id: params.id }));
    }, [params.id]);

    useEffect(() => {
        if (error) {
            notification.error({
                message: error
            });
        }
    }, [error]);

    const handleCloseModal = () => {
        history.push('/people');
    };

    return (
        <Modal visible onCancel={handleCloseModal} onOk={handleCloseModal}>
            <Spin spinning={loading}>
                {planet && (
                    <>
                        <Row>
                            <Col span={4}>Name:</Col>
                            <Col span={10}>
                                <b>{planet.name}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>Diameter:</Col>
                            <Col span={10}>{planet.diameter}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>Climate:</Col>
                            <Col span={10}>{planet.climate}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>Population:</Col>
                            <Col span={10}>{planet.population}</Col>
                        </Row>
                    </>
                )}
            </Spin>
        </Modal>
    );
};

export default Planet;
