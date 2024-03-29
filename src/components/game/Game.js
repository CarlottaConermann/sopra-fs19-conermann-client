import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Player from "../../views/Player";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    localStorage.removeItem("token");
    fetch(`${getDomain()}/logout/`+localStorage.getItem("id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(response => response.json())
        .catch(err => {
            alert(`Something went wrong during the logout: ${err.message}`);
        });
    localStorage.removeItem( "id");
    this.props.history.push("/login");
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(response => response.json())
        .then(async users => {
          // delays continuous execution of an async operation for 0.8 seconds.
          // This is just a fake async call, so that the spinner can be displayed
          // feel free to remove it :)
          await new Promise(resolve => setTimeout(resolve, 800));

          this.setState({ users });
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong fetching the users: " + err);
        });
  }

  render() {
    return (
        <Container>
          <h2>Happy Coding! </h2>
          <p>Get all users from secure end point:</p>
          {!this.state.users ? (
              <Spinner />
          ) : (
              <div>
                <Users>
                  {this.state.users.map(user => {
                    return (
                        <PlayerContainer key={user.id}>
                            <Container>
                                <td><nobr><Name>{user.name}</Name>
                                <a href="#" onClick={()=>{this.props.history.push('/profile');
                                localStorage.setItem("selectedID", user.id);}}> {user.username}</a>
                                <Id>Id: {user.id}</Id></nobr></td>
                            </Container>
                        </PlayerContainer>
                    );
                  })}
                </Users>
                <Button
                    width="100%"
                    onClick={() => {
                      this.logout();
                    }}
                >
                  Logout
                </Button>
              </div>

          )}
        </Container>
    );
  }
}

/*<Button
    width="30%"
    onClick={() => {
        this.props.history.push('/profile' ); localStorage.setItem("selectedID", user.id);
    }}
>Info
</Button>*/
export default withRouter(Game);