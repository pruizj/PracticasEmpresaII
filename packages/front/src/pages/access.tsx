import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import styled from "@emotion/styled";
import { Role, useLoginMutation } from "../generated/graphql";
import { ERROR } from "../../../api/src/errors";

const Access = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const [login] = useLoginMutation();

  const callLogin = async () => {
    const result = await login({ variables: { email, password } }).catch(e => {
      if (e.message === ERROR.INVALID_USER_OR_PASSWORD.message) {
        setError(true);
      }
    });

    if (result && result.data) {
      document.cookie = `token=${result.data.login.token};path=/;`;
      if (result.data.login.role === Role.Admin) {
        router.push("/adminDashboard");
      } else {
        router.push("/userDashboard");
      }
    }
  };

  return (
    <Page>
      <Header>
        <Logo src="/images/icon.jpg" alt="icon" />
        <Title>CARTELERA</Title>
      </Header>
      <Container>
        <Form>
          <h1>INICIAR SESIÓN</h1>
          <Label>Correo electrónico</Label>
          <Input
            type="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
            required
          />
          <Label>Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
            required
          />
          {error && (
            <ErrorAlert type="error" onClose={() => setError(false)}>
              El correo o la contraseña son incorrectos
            </ErrorAlert>
          )}
          <Button type="button" onClick={callLogin}>
            Entrar
          </Button>
          <Text> ¿No tienes una cuenta? Registrate aquí </Text>
          <Button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
          >
            Crear una cuenta
          </Button>
        </Form>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #2f0139;
`;

const Logo = styled.img`
  height: 100px;
  margin-right: 16px;
`;

const Title = styled.h1`
  color: #2f0139;
  font-size: 24px;
  font-family: "Courier New";
  font-weight: 500;
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  background-color: #2f0139;
  width: 500px;
  height: 425px;
  padding: 44px 0 40px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #c7c7c7;
`;

const Label = styled.label`
  font-size: 14px;
  margin: 0 43px 8px;
  align-self: flex-start;
`;

const Text = styled.p`
  margin-top: 50px;
`;

const ErrorAlert = styled(Alert)`
  margin-bottom: 10px;
`;

export default Access;
