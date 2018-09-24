// @flow

import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from "../Avatar/Avatar";
import UserInfo from "../UserInfo/UserInfo";
import RepositoriesComponent from "../RepositoriesComponent/RepositoriesComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

import { fetchUsersWithRedux } from "../../actions/actions";

import type { User } from "../../types/userType";

import styles from './GithubAPI.css';


type Props = {
    fetchUsersWithRedux: (username: string) => void,
};

type State = User;

class GithubAPI extends React.Component<Props, State> {
    input :HTMLInputElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            location: "",
            avatarURL: "",
            repositoriesURL: "",
            repositoriesNames: [],
            isError: false,
        }
    }

    getUserInfo = () => {
        const username = this.input.value;
        this.props.fetchUsersWithRedux(username);
    };

     render() {
         console.log(this.props);
        return (
            <div>
                <div>
                    <Typography
                        variant="display2"
                        className={styles.mainLabel}
                        color="primary"
                    >
                        Github API Test
                    </Typography>
                </div>
                <div className={styles.input}>
                    <TextField
                        type="text"
                        placeholder="Enter a username"
                        inputRef={input => (this.input = input)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.searchButton}
                        onClick={this.getUserInfo}
                    >
                        Search users
                    </Button>
                </div>
                {this.props.store.store.userInfoFailure ? <ErrorComponent /> :
                <div className={styles.info}>
                    <div>
                        {this.props.store.store.userData.avatarURL && <Avatar avatarURL={this.props.store.store.userData.avatarURL} />}
                    </div>
                    <div className={styles.infoAndRepos}>
                        <div>
                            {this.props.store.store.userData.name && <UserInfo userName={this.props.store.store.userData.name} location={this.props.store.store.userData.location} />}
                        </div>
                        <div>
                            {this.props.store.store.userData.repositoriesNames.length > 0 &&
                            <RepositoriesComponent repositoriesNames={this.props.store.store.userData.repositoriesNames}/>}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    store: state,
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    fetchUsersWithRedux: params => dispatch(fetchUsersWithRedux(params)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GithubAPI);