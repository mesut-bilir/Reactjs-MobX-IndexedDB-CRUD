import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Protected } from "./Protected";
import { observer, inject } from "mobx-react";
import UnFriend from "./Components/UnFriend";
import Friend from "./Components/Friend";


@Protected
@inject("store")
@observer
class User extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  removePart = (partnerId) => {
    console.log('hat: ', partnerId)
    this.props.store.removePart(partnerId);
  }


  addPart = (partnerId) => {
    console.log('hat: ', partnerId)
    this.props.store.addPart(partnerId);
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }

  userId = JSON.parse(localStorage.getItem('user')).id;
  render() {
    return (
      <div>
        <h4>User Dashboard</h4>
        <hr />
        {/* parner list: {this.props.store.getPartner} */}

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Other Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              My Friends
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">

                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>**</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getDifference(this.props.store.users, this.props.store.getPartner).filter(user => user.id != this.userId).map(user => (
                      <UnFriend user={user} key={user.id} add={this.addPart} />
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>**</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.store.getPartner.map(user => (
                      <Friend user={user} key={user.id} remove={this.removePart} />
                    ))}
                  </tbody>
                </table>

              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}



export default User;