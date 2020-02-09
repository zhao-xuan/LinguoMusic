import './App.css';

import React, { useState } from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import LyricPlayer from './components/LyricPlayer';
import MusicPlayer from './components/MusicPlayer';
import Playlist from './components/Playlist';
import MyPlaylists from './components/MyPlaylists';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

export default function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongId, setCurrentSongId] = useState(0);
  const [playerInstance, setPlayerInstance] = useState(null);
  //let history = useHistory();
  //let match = useRouteMatch();

  return (
    <Router>
      <Layout>
        <Header><Title level={3} style={{ color: "white", lineHeight: "64px" }}>Linguoμsic</Title></Header>

        <Layout>
          <Sider style={{ height: "100vh" }}>
            <MyPlaylists />
          </Sider>

          <Content>
            <Switch>
              <Route path="/playlists/current">
                <Playlist playlist={playerInstance && playerInstance.state.playlist} playerInstance={playerInstance} />
              </Route>
              <Route path="/playlists/:id">
                <Playlist watchUrl playerInstance={playerInstance} />
              </Route>
              <Route path="/playing">
                <LyricPlayer currentTime={currentTime} currentSongId={currentSongId} />
              </Route>
              <Route path="/">
              </Route>
            </Switch>
          </Content>
        </Layout>
        <Footer style={{ position: "fixed", bottom: "0px", padding: "0" }}><MusicPlayer onTimeUpdate={setCurrentTime} onSongIdChange={setCurrentSongId} getPlayerInstance={setPlayerInstance} /></Footer>

      </Layout>
    </Router>
  )
}