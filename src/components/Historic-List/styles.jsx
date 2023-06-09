import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 5px;
  padding: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.03);
`;

export const Type = styled.View`
  flex-direction: row;
`;

export const IconView = styled.View`
  flex-direction: row;

  background-color: ${(props) =>
    props.typeProps === "receita" ? "#049301" : "#c62c36"};

  padding-bottom: 3px;
  padding: 3px 8px 3px 8px;
  border-radius: 7px;
`;

export const TypeText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-style: italic;
`;

export const ValorText = styled.Text`
  color: #222;
  font-size: 22px;
  font-weight: bold;
`;

export const ValueArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DateText = styled.Text`
  font-style: italic;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;
