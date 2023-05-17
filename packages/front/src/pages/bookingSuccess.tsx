import Link from "next/link";
import LayoutPage from "../components/LayoutPage";
import styled from "@emotion/styled";

const BookingSuccess = () => {
  return (
    <LayoutPage>
      <Content>
        <Image src="/images/correct.jpeg" alt="Correcto" />
        <Success>
          <h1>Compra completada</h1>
          <p>¡La compra de tu entrada se ha completado correctamente!</p>
          <Link href="/userDashboardCinemas">Ir a la página de inicio</Link>
        </Success>
      </Content>
    </LayoutPage>
  );
};

export default BookingSuccess;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 100px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`;

const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    font-family: "Courier New";
    color: #2f0139;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    font-family: "Courier New";
  }

  a {
    font-size: 1.2rem;
    color: #fff;
    cursor: pointer;
    font-family: "Courier New";
    background-color: #9f67ad;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2f0139;
    }
  }
`;
