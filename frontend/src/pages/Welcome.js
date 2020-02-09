import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function ProjectsTemplate() {
    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{ backgroundColor: "lightblue", width: "100vw", height: "8vh", padding: "0px" }}>
                <Menu mode="horizontal" style={{ backgroundColor: "transparent", width: "100vw", lineHeight: "8vh", borderBottom: "transparent" }}>
                    <Menu.Item key="logo" style={{ fontSize: "28px", fontWeight: "100px" }}> LinguoMusic</Menu.Item>
                    <Menu.Item key="about" style={{ float: "right" }}>About Us</Menu.Item>
                    <Menu.Item key="issue" style={{ float: "right" }}>How to Use</Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Title>
                    Ready to bring language learning to the next level!
                </Title>
                <Button type="primary">Begin</Button>
                <Button type="primary">Register</Button>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}