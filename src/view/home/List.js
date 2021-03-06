import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { List,Statistic,Icon,Popover } from 'antd';
import Qrcode from '../../components/Qrcode';
import './home.less'

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    showArticleInfo=(id)=>{
        console.log(id);
    }

    render() {
        const {data}=this.props;
        return (
            <div className="article-list">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item extra={item.articleImage ? <img width={80} alt="logo" src={item.articleImage} />:''} onClick={this.showArticleInfo.bind(this,item.id)}>
                        {/* <Link to={`/post/:articleId`}> */}
                            <article>
                                <section className="list-part1">
                                    <ul>
                                        <li className="item post">{item.articleType==='1'?'专栏':'小册'}</li>
                                        <li>{item.author}</li>
                                        {item.time?<li>{item.time}</li>:''}
                                        {item.tags.length!==0?<li>{item.tags.map((tag,index)=>{
                                            return <NavLink key={tag} to={`/tag/${tag}`}>{tag}</NavLink>
                                        })}</li>:''}
                                    </ul>
                                </section>
                                <section className="list-part2">
                                    <NavLink to={`/post/:articleId`}>{item.title}</NavLink>
                                </section>
                                <section className="list-part3">
                                    {item.articleType==='1'?
                                        <div>
                                            <Statistic value={item.starNum} prefix={<Icon type="like" theme="filled" style={{ fontSize: '14px'}} onClick={()=>this.props.editStar(item.id)} />} />
                                            <Statistic value={item.commentNum} prefix={<Icon type="message" theme="filled" style={{ fontSize: '14px'}} onClick={()=>this.props.lookComment(item.id)} />} />
                                            <Popover content={<Qrcode value={window.location.href+'/'+item.id} />} placement="bottom" trigger="click">
                                                <Icon type="upload" style={{ fontSize: '16px',marginLeft:'10px',borderRight:'none'}} />
                                            </Popover>
                                            <Icon type="star" theme="filled" style={{ fontSize: '16px'}} onClick={()=>this.props.collectArticle(item.id)} />
                                        </div>:
                                        <div className="xiaoce-action-row">
                                            <span className="link-btn buy">购买人数: {item.sellNums}</span>
                                            <span className="link-btn sale">特价: {item.price}元</span>
                                            <span className="link-btn share">
                                                <Popover content={<Qrcode value={window.location.href+'/'+item.id} />} placement="bottom" trigger="click">
                                                    <Icon type="upload" style={{ fontSize: '16px',marginLeft:'10px',borderRight:'none'}} onClick={()=>this.props.shareArticle(item.id)} />
                                                    分享
                                                </Popover>
                                            </span>
                                        </div>
                                    }
                                </section>
                            </article>
                        {/* </Link> */}
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ArticleList;