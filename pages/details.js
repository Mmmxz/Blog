import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Breadcrumb, Icon, Affix } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import '../static/style/pages/details.css'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiConfig'

const Details = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
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
  let html = marked(props.content)
  return (
    <div>
      <Head>
        <title>Details</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb.Item>
                <a href="/"><Icon type="home" /> 首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href={`/list?id=${props.typeId}`}><Icon type="youtube" /> { props.typeName }</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{ props.title }</Breadcrumb.Item>
            </div>

            <div>
              <div className="detailed-title">
              { props.title }
              </div>
          
              <div className="list-icon center">
                <span><Icon type="calendar" /> { props.addTime }</span>
                <span><Icon type="folder" /> { props.typeName }</span>
                <span><Icon type="fire" /> { props.viewCount }人</span>
              </div>
            
              <div className="detailed-content">
                <div dangerouslySetInnerHTML={{__html: html}}></div>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
              {/* <MarkNav 
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Details.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve, reject) => {
    axios(`${servicePath.getArticleById}/${id}`).then(
      res => {
        resolve(res.data.data[0])
      }
    ).catch(
      err => {
        reject(err)
      }
    )
  })
  return await promise
}

export default Details
