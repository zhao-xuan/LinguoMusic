import React from 'react';
import { Layout, Typography, List, Avatar } from 'antd';

export default class GlossaryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    title: 'Ant Design Title 1',
                },
                {
                    title: 'Ant Design Title 2',
                },
                {
                    title: 'Ant Design Title 3',
                },
                {
                    title: 'Ant Design Title 4',
                }
            ]
        }
    }

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                style={{width : "70%"}}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        )
    }
}