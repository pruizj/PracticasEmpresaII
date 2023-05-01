import styled from "@emotion/styled";

const CinemaIndex = () => {
  return (
    <Dashboard>
      <h4>IMAGEN</h4>
      <h4>TÍTULO</h4>
      <h4>FECHA DE ESTRENO</h4>
      <h4>VALORACIÓN</h4>
    </Dashboard>
  );
};

const Dashboard = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  width: 83.6%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  h4 {
    margin-left: 30px;
    color: #9f67ad;
    width: 20%;
    font-size: 16px; /* Se reduce el tamaño de fuente */
    font-family: "Courier New";
  }
`;

export default CinemaIndex;
