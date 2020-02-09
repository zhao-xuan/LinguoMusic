import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

export default class MyPlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        };
    }

    
    componentDidMount() {
        
        fetch("/api/playlists")
            .then(resp => {
                console.log(resp);
                resp.json().then(data => {
                    this.setState({ playlists: data.playlists });
                });
            })
    }

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['now_playing']}>
                <Menu.ItemGroup key="g1" title="Actions">
                    <Menu.Item key="playing">
                        <NavLink to="/playing" className="nav-text"><Icon type="play-circle" /> Now Playing</NavLink>
                    </Menu.Item>
                    <Menu.Item key="playlists/current">
                        <NavLink to="/playlists/current" className="nav-text"><Icon type="unordered-list" /> Current Playlist</NavLink>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="My Playlists">
                    {this.state.playlists.map(item =>
                        <Menu.Item key={"playlist" + item.playlist_id}>
                            <NavLink to={`/playlists/${item.playlist_id}`} className="nav-text"><Icon type="unordered-list" /> {item.playlist_name}</NavLink>
                        </Menu.Item>
                    )}
                </Menu.ItemGroup>
            </Menu>

        )

    }
}