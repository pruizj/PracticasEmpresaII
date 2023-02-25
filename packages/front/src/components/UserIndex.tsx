import styled from "@emotion/styled";

const UserIndex = () => {
  return (
    <Dashboard>
      <h4>NOMBRE</h4>
      <h4>APELLIDO</h4>
      <h4>CORREO ELECTRÓNICO</h4>
      <h4>ROL</h4>
    </Dashboard>
  );
};

const Dashboard = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  width: 80%;
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

export default UserIndex;
