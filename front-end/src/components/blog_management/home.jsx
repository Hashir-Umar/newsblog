import React from "react";
import {Card, Row, Col, Nav, Container, Badge} from "react-bootstrap";
import Sidebar from "../layouts/sidebar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import PostListComponent from "./post/post_list_component";
import CategoryListComponent from "./category_list_component";
import TagListComponent from "./tag_list_component";
import PostAddEditComponent from "./post/post_add_edit_component";

class BlogAdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sections: ["Article", "Category", "Tag"],
            selectedSection: [1, 0, 0],
            title: "Article",
            breadCrumbList: ["Article"],
            posts: [],
            categories: [],
            tags: [],
            addMode: false,
            editMode: false,
        }
    }

    componentDidMount() {

        fetch("http://localhost:8000/news/BlogManagement/PostList/?author_id=1"
        ).then(response => response.json()
        ).then(json => this.setState({posts: json.data})
        ).catch((error) => console.log(error));
    }

    changeSection = (sectionIndex) => {

        const items = [0, 0, 0];
        items[sectionIndex] = 1;

        const title = this.state.sections[sectionIndex];
        this.setState({
            addMode: false,
            editMode: false,
            breadCrumbList: [],
            selectedSection: items,
            title
        });
        this.addBreadCrumb(this.state.sections[sectionIndex]);

        switch (sectionIndex) {
            case 0:
                fetch("http://localhost:8000/news/BlogManagement/PostList/?author_id=1"
                ).then(response => response.json()
                ).then(json => this.setState({posts: json.data})
                ).catch((error) => console.log(error));
                break;
            case 1:
                fetch("http://localhost:8000/news/BlogManagement/CategoryList/?author_id=1"
                ).then(response => response.json()
                ).then(json => this.setState({categories: json.data})
                ).catch((error) => console.log(error));
                break;
            default:
                fetch("http://localhost:8000/news/BlogManagement/TagList/?author_id=1"
                ).then(response => response.json()
                ).then(json => this.setState({tags: json.data})
                ).catch((error) => console.log(error));
        }
    };

    addBreadCrumb = (value) => {
        this.setState(state => {
            state.breadCrumbList.push(value)
        })
    };

    deleteBreadCrumb = (value) => {
        this.props.history.push("blog/" + value);
        this.setState(state => {
            const index = state.breadCrumbList.findIndex(val => val === value);
            state.breadCrumbList.splice(index + 1, state.breadCrumbList.length);
            return state.breadCrumbList;
        })
    };

    render() {
        const isLast = this.state.breadCrumbList.length - 1;
        const addMode = this.state.addMode;
        const editMode = this.state.editMode;
        const sectionIndex = this.state.sections.findIndex(val => val === this.state.title);
        return (
            <div>
                <Sidebar navList={["Welcome, Hashir"]}/>
                <Container>

                    <Row>
                        <Col xs={12}>
                            <Breadcrumb className="bg-light">
                                <Breadcrumb.Item href="http://localhost:3000/blog">
                                    <FontAwesomeIcon icon={faBlog}/>
                                    <span className="ml-2">Blog</span>
                                </Breadcrumb.Item>
                                {this.state.breadCrumbList.map((item, index) => {
                                    if (isLast === index) return <Breadcrumb.Item active key={index}>
                                        {item}
                                    </Breadcrumb.Item>;
                                    else return <Breadcrumb.Item key={index}
                                                                 onClick={() => this.deleteBreadCrumb(item)}>
                                        {item}
                                    </Breadcrumb.Item>;
                                })}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Card>
                                <Nav variant="pills" className="flex-column text-center m-0">
                                    <Nav.Item onClick={() => this.changeSection(0)}>
                                        <Nav.Link eventKey="1"
                                                  className={this.state.selectedSection[0] ? "active" : ""}>Articles</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.changeSection(1)}>
                                        <Nav.Link eventKey="2"
                                                  className={this.state.selectedSection[1] ? "active" : ""}>Categories</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.changeSection(2)}>
                                        <Nav.Link eventKey="3"
                                                  className={this.state.selectedSection[2] ? "active" : ""}>Tags</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card>
                        </Col>

                        <Col md={9}>
                            {!addMode && !editMode ?
                            <Card className="d-flex flex-row align-items-center mb-2">
                                <Col md={3}>
                                    <Button onClick={() => this.setState({addMode: true})}
                                            className="btn btn-sm btn-block btn-warning text-light"> <FontAwesomeIcon
                                        icon={faPlus}/> Add new {this.state.title}</Button>
                                </Col>
                                <Col md={9} className="py-2">
                                    <form className="form-inline float-right">
                                        <input className="form-control form-control-sm" type="text" name="name"/>
                                        <Button className="btn btn-sm btn-primary text-light ml-2"> <FontAwesomeIcon
                                            icon={faSearch}/> Search {this.state.title}</Button>
                                    </form>
                                </Col>
                            </Card>
                            : ""}
                            {!addMode && !editMode ? (
                                sectionIndex === 0 ? <PostListComponent posts={this.state.posts}/>
                                    : sectionIndex === 1 ? <CategoryListComponent categories={this.state.categories}/>
                                    : <TagListComponent tags={this.state.tags}/>
                            ) : (
                                addMode && sectionIndex === 0 ? <PostAddEditComponent mode="ADD" sectionTitle={this.state.title}/> : 0
                            )}

                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default (BlogAdminPanel);