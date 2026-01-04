import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../Services/userService";
import { user, userLogin } from "../Services/http-service_user";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../StateManagement/LoginContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { color } from "framer-motion";

const schema = z.object({
  userName: z.string().email({ message: "Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain atleast 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { message } = useContext(LoginContext);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const [pvisible, setPVisible] = useState(false);
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setStatus, getItem: getStatus } = useLocalStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const toast = useToast();

  useEffect(() => {
    if (getStatus() === "true") {
      userService.logout().then((res) => {
        toast({
          title: "Last session invalidated!",
          status: "info",
          duration: 5000, // 5 seconds
          isClosable: true,
          position: "top",
        });
      });
      setStatus(false);
      setUser({} as user);
    }
  }, [getStatus()]);

  const handleLogin = (data: userLogin) => {
    userService
      .login({
        auth: {
          username: data.userName,
          password: data.password,
        },
      })
      .then((data) => {
        console.log(data);
        setStatus(data.status);
        setUser(data.user);
        setLoginErr("");
        navigate("/userpage", { replace: true });
      })
      .catch((er) => {
        toast({
          title: er.response.data.message,
          status: "error",
          duration: 5000, // 5 seconds
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Container marginTop={130}>
        <Card shadow={"lg"}>
          <form
            onSubmit={handleSubmit((data) => {
              handleLogin(data);
              // reset();
            })}
          >
            <CardHeader ml={10} mt={5}>
              <Text fontSize={"30px"} fontWeight={"500"}>
                Login
              </Text>
            </CardHeader>
            <CardBody ml={10}>
              {/* <Box
                marginBottom={5}
                display="flex"
                flexDirection="column"
                alignItems="center"
              > */}
              <FormControl width={"70%"}>
                <FormLabel htmlFor="username" textAlign="start">
                  Username
                </FormLabel>
                <Input
                  {...register("userName")}
                  type="email"
                  id="EmailId"
                  width="100%"
                  autoFocus
                ></Input>
                {errors.userName && (
                  <Text align="left" color={"red"} mt={2}>
                    {errors.userName.message}
                  </Text>
                )}
              </FormControl>
              <FormControl width={"70%"} mt={5}>
                <FormLabel htmlFor="password" textAlign="start">
                  Password
                </FormLabel>
                <InputGroup width="100%">
                  <Input
                    {...register("password")}
                    type={pvisible ? "text" : "password"}
                    id="password"
                  ></Input>
                  <InputRightElement>
                    <MdOutlineRemoveRedEye
                      size={25}
                      onClick={() => setPVisible(!pvisible)}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text align="left" color={"red"} mt={2}>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>
              {/* </Box> */}
            </CardBody>
            <CardFooter justifyContent={"end"}>
              <HStack spacing={2}>
                <Button type="submit">Submit</Button>
                <Link to={"/register"}>Not registered? Click here</Link>
              </HStack>
            </CardFooter>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
