import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import styled from "@emotion/styled";
import { Role, useLoginMutation, useMeQuery } from "../generated/graphql";
import { ErrorType, ERROR } from "../../../api/src/errors";

const Access = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const [login] = useLoginMutation();
  const me = useMeQuery();

  const callLogin = async () => {
    const result = await login({ variables: { email, password } }).catch(e => {
      if (e.message === ERROR.INVALID_USER_OR_PASSWORD.message) {
        setError(true);
      }
    });

    if (result && result.data) {
      setAccessToken(result.data.login);
    }
  };

  const redirectByRole = async () => {
    const result = await me;
    console.log(result.data.me.role);
    window.location.replace(
      result.data.me.role === Role.Admin ? "/adminDashboard" : "/dashboard"
    );
  };

  useEffect(() => {
    if (accessToken !== "") {
      document.cookie = `token=${accessToken};path=/;`;
      redirectByRole();
    }
  }, [accessToken]);

  return (
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
  );
};

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
