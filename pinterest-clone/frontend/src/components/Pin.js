import styled from 'styled-components';
import React from 'react';

function Pin({ urls }) {
    // let { urls } = props;
    return (
        <Wrapper>

            <Container>

                <img src={urls?.regular} alt="pin" />

            </Container>
            <Content>
                <Title>
                    <a style={{ color: "red" }} href="/">Sample Name</a>
                </Title>

            </Content>
        </Wrapper>
    );
}

export default Pin;


const Content = styled.div`
    width: 236px;
    height:50px;
    background: rgba(255,255,255,0.2);
    position: absolute;
    bottom: 0;
    display:none;
    padding: 6px 66px;
    overflow: hidden;
`;


const Wrapper = styled.div`
display: inline-flex;
padding: 8px;


&:hover ${Content} {
    display:  flex;
    justify-content:space-between;
    align-items:center;
    transition: 1s;
}
`
    ;
const Container = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    width: 236px;

    img {
        display:flex;
        width: 100%;
        border-radius: 16px;
        cursor: zoom-in;
        object-fit: cover;
    }
`;
const Title = styled.h4`

    a {
            text-decoration:none;

    }

`;