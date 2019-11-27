const apiUrl = 'http://127.0.0.1:7001/default/'

const servicePath = {
    getArticleList: `${apiUrl}getArticleList`, // 首页列表
    getArticleById: `${apiUrl}getArticleById`, // 文章内容
    getArticleType: `${apiUrl}getArticleType`, // 文章类别
    getArticleListById: `${apiUrl}getArticleListById`, // 根据类型id获取文章列表
    getTypeByTypeId: `${apiUrl}getTypeByTypeId` // 根据类型id获取类型信息
}

export default servicePath