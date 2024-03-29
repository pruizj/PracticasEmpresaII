import { useState } from "react";
import styled from "styled-components";
import { useRegisterMutation } from "../generated/graphql";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import { ERROR } from "../../../api/src/errors";
import Modal from "../components/Modal";
import router from "next/router";
import MainHeader from "../components/MainHeader";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [errorExists, setErrorExists] = useState<boolean>(false);
  const [errorNotSecure, setErrorNotSecure] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [register] = useRegisterMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      await register({
        variables: {
          input: {
            name,
            surname,
            email,
            password
          }
        }
      });
      setShowModal(true);
    } catch (err) {
      if (err.message === ERROR.USER_ALREADY_EXISTS.message) {
        setShowModal(false);
        setErrorExists(true);
      } else if (err.message === ERROR.PASSWORD_NOT_SECURE.message) {
        setShowModal(false);
        setErrorNotSecure(true);
      } else if (errorExists) {
        setShowModal(false);
      }
    }
  };

  return (
    <Page>
      <MainHeader />
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>REGISTRO</h1>
          <Label>Nombre</Label>
          <Input
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            required
          />
          <Label>Apellido</Label>
          <Input
            type="text"
            value={surname}
            onChange={event => {
              setSurname(event.target.value);
            }}
            required
          />
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
          {errorNotSecure && (
            <ErrorAlert type="error" onClose={() => setErrorNotSecure(false)}>
              {
                "La contraseña debe tener al menos 8 caracteres y contener como mínimo una letra minúscula, una mayúscula, un número y un carácter especial."
              }
            </ErrorAlert>
          )}
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
          <Label>Confirmar contraseña</Label>
          <Password>
            <InputLocal
              type={showPasswordConfirmation ? "text" : "password"}
              value={confirmPassword}
              onChange={event => {
                setConfirmPassword(event.target.value);
              }}
              required
            />
            <ShowButton
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
              showPassword={showPasswordConfirmation}
            />
          </Password>
          {errorExists && (
            <ErrorAlert type="error" onClose={() => setErrorExists(false)}>
              {"Este usuario ya existe"}
            </ErrorAlert>
          )}
          {!passwordsMatch && (
            <ErrorAlert type="error" onClose={() => setPasswordsMatch(true)}>
              {"Las contraseñas no coinciden"}
            </ErrorAlert>
          )}
          <Button
            type="submit"
            disabled={
              !(name && surname && email && password && confirmPassword)
            }
          >
            Registrarse
          </Button>
        </Form>
      </Container>
      <Modal show={showModal} title="Registro exitoso">
        <ModalContainer>
          <p>
            Su registro se ha realizado con éxito. ¡Ya puedes iniciar sesión!.
          </p>
          <Button
            onClick={() => {
              setShowModal(false);
              router.push("/access");
            }}
          >
            Volver al inicio
          </Button>
        </ModalContainer>
      </Modal>
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
  height: 90vh;
`;

const InputLocal = styled(Input)`
  width: 100%;
  margin-bottom: 0;
  height: 20px;
`;

const Form = styled.form`
  display: flex;
  color: white;
  font-family: "Courier New";
  flex-direction: column;
  align-items: center;
  background-color: #2f0139;
  width: 500px;
  height: 540px;
  padding: 44px 0 40px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #c7c7c7;
`;

const Label = styled.label`
  font-size: 14px;
  font-family: "Courier New";
  margin: 0 43px 8px;
  align-self: flex-start;
`;

const ErrorAlert = styled(Alert)`
  font-size: 14px;
  margin: 0 21px 0;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 18px;
    font-family: "Courier New";
    line-height: 1.33;
  }
`;

const Password = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 83%;
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

export default RegisterPage;
