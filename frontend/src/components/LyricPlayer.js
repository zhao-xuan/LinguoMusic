import React from 'react';
import { Layout, Menu, Typography, Tag } from 'antd';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './LyricPlayer.css';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;


export default class LyricPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLyrics: 0,
            lyrics: []
        }
    }

    fetchLyrics = (songId) => {
        fetch(`/api/songs/${songId}/lyrics`).then(resp => {
            resp.json().then(data => {
                this.setState({lyrics: data.lyrics});
            });
        });
    }

    componentDidMount() {
        if (this.props.currentSongId) {
            this.fetchLyrics(this.props.currentSongId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentSongId != prevProps.currentSongId) {
            this.fetchLyrics(this.props.currentSongId);
        }

        if (this.props.currentTime != prevProps.currentTime) {
            const currentTime = this.props.currentTime;
            const length = this.state.lyrics.length;
            let i;
            for (i = 0; i < length; i++) {
                const element = this.state.lyrics[i];
                if (element.t > currentTime) {
                    break;
                }
            }
            const newCurrentLyrics = Math.max(0, i - 1);


            if (newCurrentLyrics != this.state.currentLyrics) {
                this.setState({ currentLyrics: newCurrentLyrics }, () => {
                    console.log(this.state.lyrics[this.state.currentLyrics]);
                    scroller.scrollTo("lyricElement" + this.state.currentLyrics, {
                        duration: 800,
                        smooth: true,
                        containerId: "containerElement"
                    });

                });
            }
        }
    }

    render() {
        const colorList = [];

        return (
            <div className="lyricplayer">
                <Title level={2} id="songName" style={{ backgroundColor: "lightgrey", textAlign: "center" }}>Song 1</Title>
                <Element name="test7" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '500px',
                    overflow: 'scroll',
                    marginBottom: '100px',
                    textAlign: "center"
                }}>
                    {this.state.lyrics.map((item, index) => {
                        return (
                            <Element name={"lyricElement" + index} key={"lyricElement" + index} style={{ marginTop: "50px", marginBottom: '100px' }}>
                                <div className={(index == this.state.currentLyrics) && "active" || "inactive"}>
                                    <ruby className="tagGroup" style={{ rubyPosition: "over" }}>
                                        {item.words.map(i => {
                                            let shortestTranslation = null;
                                            let shortestLength = 10000;
                                            if (i.e !== null) {
                                                for (let translation of i.e) {
                                                    if (translation.length < shortestLength) {
                                                        shortestTranslation = translation;
                                                        shortestLength = translation.length;
                                                    }
                                                }
                                            }
                                            return (<>
                                                <rb style={{ fontSize: "48px", fontWeight: "bold" }}>{i.w}</rb>
                                                <rt>{shortestTranslation !== null && (<Tag color="volcano" style={{ fontSize: "24px", padding: "10px" }}>{shortestTranslation}</Tag>)}</rt>
                                            </>);
                                        })}
                                    </ruby>
                                </div>
                            </Element>)
                    })}
                </Element>
            </div>
        );
    }
}