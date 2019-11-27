import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiConfig'
import Link from 'next/link'
// markdown
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'

const ListPage = (props) => {
  const [myList, setMyList] = useState(props[0].data)
  useEffect(() => {
    setMyList(props[0].data)
  })
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  })
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/"><Icon type="home" /> 首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{ props[1].typeName }</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/details', query: { id: item.id } }}>
                    <a>{ item.title }</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> { item.addTime }</span>
            <span><Icon type="folder" /> { item.typeName }</span>
                  <span><Icon type="fire" /> { item.viewCount }人</span>
                </div>
                <div 
                  className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

ListPage.getInitialProps = async (context) => {
  let id = context.query.id
  const listPromise = new Promise(resolve => {
    axios(`${servicePath.getArticleListById}/${id}`).then(
      res => resolve(res.data)
    )
  })
  const typePromise = new Promise(resolve => {
    axios(`${servicePath.getTypeByTypeId}/${id}`).then(
      res => resolve(res.data)
    )
  })
  return await Promise.all([listPromise, typePromise])
}

export default ListPage
