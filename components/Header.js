import React, { useEffect, useState } from 'react';
import '../static/style/components/header.css'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { Row, Col, Menu, Icon } from 'antd'
import servicePath from '../config/apiConfig'

const Header = () => {

    const [navList, setNavList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getArticleType).then(
                res => {
                    return res.data.data
                }
            )
            setNavList(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        if (e.key === 'home') {
            Router.push('/index')
        } else {
            Router.push(`/list?id=${e.key}`)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">孟祥哲</span>
                    <span className="header-txt">专注前端开发，努力学习中……</span>
                </Col>
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu 
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        <Menu.Item key="home">
                            <Icon type="home" />
                            博客首页
                        </Menu.Item>
                        {
                            navList.map(item => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        { item.type_name }
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header