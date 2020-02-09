import React from 'react';
import { Table } from 'antd';
import { withRouter } from 'react-router-dom';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.playlist != prevProps.playlist) {
            this.setState({ data: this.props.playlist });
        }
    }

    componentDidMount() {
        if (this.props.playlist) {
            this.setState({ data: this.props.playlist });
        }
        else if (this.props.watchUrl) {
            const playlistId = this.props.match.params.id;

            fetch(`/api/playlists/${playlistId}`).then((resp) => {
                console.log(resp);
                if (resp.status != 200) {
                    console.log("Bad status code " + resp.status);
                }

                resp.json().then((data) => {
                    let i = 0;
                    const result = data.songs.map(x => {x.order = (i++); return x;});
                    console.log(result);
                    this.setState({ data: result });
                });
            })
        }
    }

    play = (index) => {
        const playerInstance = this.props.playerInstance;

        if (!playerInstance) {
            console.log("No player instance specified!");
            return;
        }

        if (this.state.data != playerInstance.state.playlist) {
            console.log("Loading new playlist");
            playerInstance.loadPlaylist(this.state.data, () => {
                playerInstance.play(index);
            });
        }
        else {
            playerInstance.play(index);
        }
        
    };

    render() {
        const columns = [{
            title: "Title",
            dataIndex: "song_name",
            key: "title",
            render: (text, row, index) => {
                return (<a onClick={ () => this.play(row.order) }>{ text } </a>);
            }
        }, {
            title: "Artist",
            dataIndex: "artist",
            key: "artist"
        }, {
            title: "Album",
            dataIndex: "album_name",
            key: "album"
        }];

        return (
            <Table dataSource={ this.state.data } columns={columns} />)
        ;
    }
}

export default withRouter(Playlist);