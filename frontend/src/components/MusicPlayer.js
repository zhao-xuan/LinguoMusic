import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './MusicPlayer.css'
import { Layout, Menu, Typography, Avatar, Icon, Button, Slider, Row, Col } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { Text } = Typography;

export default class MusicPlayer extends React.Component {
    state = {
        playlist: [],
        playId: 0, //播放id
        name: '', //当前歌曲名
        cover: '', //当前歌曲封面
        artist: '', //当前歌手
        album: '',
        lyric: '', // 当前歌词
        playing: false, //当前是否正在播放
        duration: 1, //歌曲长度
        currentTime: 0, //当前播放时间
        isLoop: false, //是否循环
        isMute: false, //是否静音
        volume: 1.0, //当前音量
        theme: this.darkThemeName, //主题
        playMode: '' //当前播放模式
    }

    constructor(props) {
        super(props);
        this.audio = new Audio();
        this.state.playlist = [
            {
                "album_id": 73914415,
                "album_name": "耳朵",
                "artist": "李荣浩",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/5cb38ddb2e1156f29ae42e60d590764d/ymusic/030b/060b/035b/4a0c8e3d1c1afd37d18e4165494e9ef2.mp3",
                "quality": "LD 128k",
                "song_id": 1293886117,
                "song_name": "年少有为"
              },
              {
                "album_id": 79103044,
                "album_name": "まちがいさがし",
                "artist": "菅田将暉",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/6cf3cb884fd17635148e92f8cbf0e8f4/ymusic/045f/035c/0452/3537479b704631af56bf38b141d65526.mp3",
                "quality": "LD 128k",
                "song_id": 1365181736,
                "song_name": "まちがいさがし"
              },
              {
                "album_id": 3266460,
                "album_name": "カバー・ヅクリ",
                "artist": "ツヅリ・ヅクリ",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/7e881a2b0ea83a853a9d19a4aae5bc61/ymusic/a422/ef2c/90cb/95010988e31d1d009778e2abaebb87b1.mp3",
                "quality": "HD 320k",
                "song_id": 33933322,
                "song_name": "ロビンソン"
              },
              {
                "album_id": 6444,
                "album_name": "蔡旻佑首张创作专辑 19",
                "artist": "蔡旻佑",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/f55f19aa2fa39737c4c47dd2f642ed72/ymusic/045c/000f/525f/36f849d8967e856d04b5e55aca61d88c.mp3",
                "quality": "LD 128k",
                "song_id": 65681,
                "song_name": "我可以"
              },
              {
                "album_id": 74116052,
                "album_name": "Verdi : Essential Classic (200th Anniversary)",
                "artist": "KPM Philharmonic Orchestra, Viktor Zinoviy, Dementiy Bogdan",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/9a19997ea1a24c8287eb2329677edf6f/ymusic/020f/540b/525b/5e8f277edfcaa2ffa2e4e18372700921.mp3",
                "quality": "LD 128k",
                "song_id": 1320804479,
                "song_name": "La Traviata, Act I: \"Libiamo ne' lieti calici\""
              },
              {
                "album_id": 37575165,
                "album_name": "TIME",
                "artist": "家入レオ",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m8.music.126.net/20200209200116/099af1738775e3b104a601cd62228dde/ymusic/0e0c/075e/000f/9f091802e90436e6b7447e28ef592a87.mp3",
                "quality": "LD 128k",
                "song_id": 536570668,
                "song_name": "春風"
              },
              {
                "album_id": 34515591,
                "album_name": "さくらのうた",
                "artist": "高橋優",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m7.music.126.net/20200209200116/712606e1eb5591c5187c273f0ef2306a/ymusic/07cd/a368/e83d/3f2d8f44d0f42c79a692e3e8f0ffb7be.mp3",
                "quality": "HD 320k",
                "song_id": 406037684,
                "song_name": "さくらのうた"
              },
              {
                "album_id": 38039168,
                "album_name": "Stay with You (To. JJ Lin)",
                "artist": "龚子婕JessieG",
                "expires": 1200,
                "get_time": 1581248177.3915904,
                "mp3_url": "http://m7.music.126.net/20200209200116/ce09f606e83d6065ed60c2ae932c0186/ymusic/f08c/cdb3/8915/f9f61d463d95e75ef7d8cdcfd809283a.mp3",
                "quality": "LD 128k",
                "song_id": 548123907,
                "song_name": "Stay with You (To. JJ Lin)"
              }
        ];
        this.audio.ontimeupdate = (e) => {
            if (this.props.onTimeUpdate != undefined) {
                this.props.onTimeUpdate(this.audio.currentTime);
            }
            this.setState({ currentTime: this.audio.currentTime });
        };

        this.audio.ondurationchange = () => {
            this.setState({ duration: this.audio.duration });
        };

        this.audio.onplay = () => {
            this.setState({ playing: true });
        };

        this.audio.onpause = () => {
            this.setState({ playing: false });
        };

        this.audio.onvolumechange = (e) => {
            this.setState({ volume: this.audio.volume });
        };
    };

    componentDidMount() {
        if (this.props.getPlayerInstance) {
            this.props.getPlayerInstance(this);
        }
    }

    loadPlaylist = (p, onFinish) => {
        this.setState({ playlist: p }, () => {
            if (onFinish) {
                onFinish();
            }
        });
    };

    play = index => {
        console.log("Trying to play " + index);
        let playing = this.state.playlist[index];
        if (!playing) return;
        console.log(playing);
        if (this.props.onSongIdChange) {
            this.props.onSongIdChange(playing.song_id);
        }
        console.log(playing);
        this.audio.src = playing.mp3_url;
        this.audio.load();
        this.audio.play();

        this.setState({
            name: playing.song_name,
            artist: playing.artist,
            album: playing.album_name,
            playId: index
        });
    };

    switchSong = (offset) => {
        let len = this.state.playlist.length;
        let newPlayId = this.state.playId + offset;
        if (newPlayId < 0) newPlayId += len;
        if (newPlayId >= len) newPlayId -= len;
        this.play(newPlayId);
    };

    resume = () => {
        this.audio.play();
    };

    pause = () => {
        this.audio.pause();
    };

    render() {
        return (
            <div>
                <Row style={{ backgroundColor: "lightgrey", width: "100vw" }}>
                    <Col span={3}>
                        <Avatar shape="square" size={120} src="https://i.kfs.io/album/global/40877410,0v1/fit/500x500.jpg"></Avatar>
                    </Col>
                    <Col span={21} >
                        <Slider
                            min={0}
                            max={this.state.duration}
                            onChange={(value) => { this.audio.currentTime = value; }}
                            value={this.state.currentTime}
                            step={1}
                            style={{ marginTop: "20px", width: "80%", color: "purple" }}
                        />
                        <ButtonGroup style={{ marginLeft: "20%", marginTop: "20px" }}>
                            <Button type="link" className="player-control"><Icon className="icon" type="retweet" /></Button>
                            <Button type="link" className="player-control"><Icon className="icon" type="download" /></Button>
                            <Button type="link" className="player-control"><Icon className="icon" type="unordered-list" /></Button>
                        </ButtonGroup>
                        <ButtonGroup style={{ marginLeft: "1%", marginTop: "20px" }}>
                            <Button className="player-control" size="large" type="link" onClick={() => this.switchSong(-1)}><Icon className="icon" type="step-backward" /></Button>
                            {this.state.playing ?
                                (<Button className="player-control" size="large" type="link" onClick={() => this.pause()}><Icon className="icon" type="pause-circle" theme="filled" /></Button>) :
                                (<Button className="player-control" size="large" type="link" onClick={() => this.resume()}><Icon className="icon" type="play-circle" theme="filled" /></Button>)
                            }
                            <Button className="player-control" size="large" type="link" onClick={() => this.switchSong(1)}><Icon className="icon" type="step-forward" /></Button>
                        </ButtonGroup>
                        <Button className="player-control" size="large" type="link" style={{ marginLeft: "10px" }}><Icon type="sound" /></Button>
                        <Slider min={0}
                            max={1.0}
                            onChange={(value) => { this.audio.volume = value; }}
                            value={this.state.volume}
                            step={0.01}
                            style={{ width: 97.5, margin: "0px", color: "purple", display: "inline-block" }} />
                    </Col>
                </Row>
            </div>
        );
    }
}