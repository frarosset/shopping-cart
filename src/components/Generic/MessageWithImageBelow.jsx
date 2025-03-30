import styled from "styled-components";

const MessageWithImageBelow = styled(({ children, imageUrl, className }) => {
  return (
    <StyledMessageWithImageBelow $imageUrl={imageUrl} className={className}>
      {children}
    </StyledMessageWithImageBelow>
  );
})``;

const StyledMessageWithImageBelow = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  flex: 1;

  *:has(&) {
    display: flex;
    flex-direction: column;
  }

  &::after {
    content: "";
    flex: 1;
    min-height: 0;
    width: 100%;

    background-image: url("${({ $imageUrl }) => $imageUrl}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export default MessageWithImageBelow;
