import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import store from './store';

import { People, Home } from './pages';
import { Left as LeftNavigation } from './components/navigation';

import styles from './App.module.scss';

const { Content, Sider } = Layout;

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout className={styles.layout}>
                    <Sider width={200}>
                        <LeftNavigation />
                    </Sider>
                    <Layout className={styles.layout}>
                        <Content className={styles.content}>
                            <Switch>
                                <Route path={['/people', '/planet/:id']}>
                                    <People />
                                </Route>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;
