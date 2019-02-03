import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LocationIcon from '@material-ui/icons/LocationOn';

export const Text = styled.p`
    font-family: "Menlo";
    font-size: 24px;
    text-align: center;
`;

const Container = styled.div`
    margin-top: 50px;
    box-shadow: 10px 10px 25px -8px rgba(0,0,0,0.5);
    background-color: #DAF3A9;
    padding: 10px;
`;

type Props = {
    username: string,
    location: string,
    createdAt: string,
};

function UserInfo({ username, location, createdAt }: Props) {
    return(
        <Container>
            <Text variant="headline">
                Name: {username}
            </Text>
            <Text variant="headline">
                <LocationIcon /> Location: {location ? location : "Unknown"}
            </Text>
            <Text variant="headline">
                Created at: {createdAt}
            </Text>
        </Container>
    );
}

UserInfo.propTypes = {
    username: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default UserInfo;