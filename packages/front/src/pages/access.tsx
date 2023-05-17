import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import styled from "@emotion/styled";
import { Role, useLoginMutation } from "../generated/graphql";
import { ERROR } from "../../../api/src/errors";
import MainHeader from "../components/MainHeader";

const Access = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const callLogin = async () => {
    const result = await login({ variables: { email, password } }).catch(e => {
      if (
        e.message === ERROR.INVALID_USER_OR_PASSWORD.message ||
        e.message === ERROR.USER_NOT_FOUND.message
      ) {
        setError(true);
      }
    });

    if (result && result.data) {
      document.cookie = `token=${result.data.login.token};path=/;`;
      if (result.data.login.role === Role.Admin) {
        window.location.href = "/adminDashboardCinemas";
      } else {
        window.location.href = "/userDashboardCinemas";
      }
    }
  };

  return (
    <Page>
      <MainHeader />
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
          <Password>
            <InputLocal
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
              required
            />
            <ShowButton
              onClick={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
          </Password>
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
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const InputLocal = styled(Input)`
  width: 100%;
  margin-bottom: 0;
  height: 20px;
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

const Password = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 82%;
  margin-bottom: 20px;
`;

interface ShowButtonProps {
  showPassword: boolean;
}
const ShowButton = styled.div<ShowButtonProps>`
  background: ${props => `url("/images/viewed.svg")`};
  no-repeat;
  background-position: center center;
  background-size: ${props => (props.showPassword ? 30 : 26)}px;
  cursor: pointer;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0px, -50%);
  width: 30px;
`;

export default Access;
