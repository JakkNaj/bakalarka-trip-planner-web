import styled from "styled-components";
import { colors } from "../assets/colors";
import { fonts } from "../assets/fonts";
import React from "react";

interface ButtonProps {
  text: string;
  right: string;
  width: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
  iconLeft?: boolean;
}

export const MainButton = ({ text, right, width, onClick, children, backgroundColor, padding, iconLeft = true } : ButtonProps) => {
  return (
    <StyledButton right={right} width={width} onClick={onClick} backgroundColor={backgroundColor} padding={padding}>
      {iconLeft && React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { className: "white-backspace" });
        }
        return child;
      })}
      {text}
      {!iconLeft && React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { className: "white-backspace" });
        }
        return child;
      })}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ right: string; width: string, backgroundColor?: string, padding?: string }>`
  border: none;
  font-size: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  position: relative;
  color: ${colors.headingText};
  text-transform: lowercase;
  font-family: ${fonts.normal};
  transition: background-color 0.4s, color 0.4s;
  padding: ${(props) => props.padding || "0.4rem"};
  border-radius: 0.25rem;
  background-color: ${(props) => props.backgroundColor || "none"};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: ${(props) => props.right};
    width: ${(props) => props.width};
    border-bottom: 0.125rem solid ${colors.mainBlue};
  }

  &:hover {
    background-color: ${colors.mainBlue};
    color: ${colors.white};

    & .white-backspace {
      color: ${colors.white};
    }
  }
`;