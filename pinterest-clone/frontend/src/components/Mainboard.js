import styled from 'styled-components';
import React from 'react';
import Pin from './Pin';
import './Mainboard.css';

export const Mainboard = ({ pins }) => {

    // let { pins } = props;

    return (
        <Wrapper>

            <Container className='mainboard_container'>
                {pins.map(({ urls, index }) => {
                    // let { urls } = pin;
                    return <Pin key={index} urls={urls} />;
                })}

            </Container>
        </Wrapper>
    );
};


export default Mainboard;


const Wrapper = styled.div`
background-color: white;
display: flex;
width: 100%;
height: 100%;
margin-top: 15px;
justify-content: center;
`;

const Container = styled.div`
margin: 0 auto;
height: 100%;
background-color: white;
`;