import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => (
    <div className="author-div comm-box">
        <div>
            <Avatar size={100} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2153651319,3049889340&fm=26&gp=0.jpg" />
        </div>
        <div className="author-introduction">
            随便写点凑字数吧，希望可以早日把这个项目成功发布上去，然后换钱。好想赚钱啊啊，玩不了了。
            <Divider>社交账号</Divider>
            <Avatar size={28} icon="github" className="account" />
            <Avatar size={28} icon="qq" className="account" />
            <Avatar size={28} icon="wechat" className="account" />
        </div>
    </div>
)

export default Author