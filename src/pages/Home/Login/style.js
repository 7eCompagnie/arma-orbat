import styled from "styled-components";
import {Text, Title} from "@mantine/core";
import {Carousel} from "@mantine/carousel";

export const Container = styled.div`
        display: flex;
        height: 100vh;
        width: 100vw;
      
      @media (max-width: 1000px) {
        flex-direction: column;
      }
    `

export const Left = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      height: 100%;
      padding: 2rem 4rem;
      
      @media (max-width: 1000px) {
        width: 100%;
        height: 50%;
        padding: 1rem 2rem;
      }
    `

export const Right = styled.div`
      display: flex;
      width: 60%;
      height: 100%;
      background-size: cover;
      
      @media (max-width: 1000px) {
        width: 100%;
        height: 50%;
      }
    `

export const StyledTitle = styled(Title)`
      color: #fff;
      margin-bottom: 2rem;
    `

export const SubTitle = styled(Title)`
      margin-bottom: 4rem;
    `

export const CarouselSlide = styled(Carousel.Slide)`
      background: center center no-repeat;
      background-size: cover;
    `

export const Description = styled.div`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 2rem 4rem;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
    `

export const DescriptionTitle = styled(Title)`
      color: #fff;
      font-size: 2rem;
      margin-bottom: 1rem;
    `

export const DescriptionText = styled(Text)`
      color: #fff
    `

export const Logo = styled.img`
        width: 40%;
       margin: 0 auto 5rem;
      @media (max-width: 1000px) {
        display: none;
      }
    `