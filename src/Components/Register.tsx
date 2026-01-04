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
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";
import userService from "../Services/userService";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { user } from "../Services/http-service_user";

const schema = z
  .object({
    email: z.string().email({ message: "Enter a valid email." }),
    firstname: z.string().min(4, { message: "Enter atleast 4 characters" }),
    lastname: z.string().min(4, { message: "Enter atleast 4 characters" }),

    password: z.string().min(6, { message: "Enter atleast 6 characters" }),
    re_enter_pass: z.string().min(6, { message: "Enter atleast 6 characters" }),
  })
  .refine((data) => data.password === data.re_enter_pass, {
    message: "Passwords don't match",
    path: ["re_enter_pass"],
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pvisible, setPVisible] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();
  const handlereg = (data: FormData) => {
    const userdto: user = {
      userName: data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      password: data.password,
      role: ["ROLE_USER"],
    };
    userService
      .register({
        data: userdto,
      })
      .then((res) => {
        toast({
          title: "User successfully registered",
          status: "success",
          duration: 5000, // 5 seconds
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: err.response.data,
          status: "error",
          duration: 5000, // 5 seconds
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div>
      {message && (
        <Alert status="success">
          <AlertIcon />
          {message}
        </Alert>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Container mt={40}>
        <Card>
          <form
            onSubmit={handleSubmit((data) => {
              handlereg(data);
              //reset();
            })}
          >
            <CardHeader ml={10} mt={5}>
              <Text fontSize={"30px"} fontWeight={"500"}>
                Sign Up
              </Text>
            </CardHeader>
            <FormControl w={"90%"}>
              <CardBody ml={10}>
                <FormLabel htmlFor="EmailId">Email Id</FormLabel>
                <Input {...register("email")} type="email" id="EmailId"></Input>
                {errors.email && (
                  <Text align="left" color={"red"}>
                    {errors.email.message}
                  </Text>
                )}

                <FormLabel htmlFor="FirsName">First Name</FormLabel>
                <Input
                  {...register("firstname")}
                  type="text"
                  id="FirstName"
                ></Input>
                {errors.firstname && (
                  <Text align="left" color={"red"}>
                    {errors.firstname.message}
                  </Text>
                )}
                <FormLabel htmlFor="LastName">Last Name</FormLabel>
                <Input
                  {...register("lastname")}
                  type="text"
                  id="LastName"
                ></Input>
                {errors.lastname && (
                  <Text align="left" color={"red"}>
                    {errors.lastname.message}
                  </Text>
                )}
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register("password")}
                    type={pvisible ? "text" : "password"}
                    id="password"
                  ></Input>
                  <InputRightElement>
                    <MdOutlineRemoveRedEye
                      onClick={() => setPVisible(!pvisible)}
                      size={25}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text align="left" color={"red"}>
                    {errors.password.message}
                  </Text>
                )}
                <FormLabel htmlFor="re-enter password">Re-Password</FormLabel>
                <Input
                  {...register("re_enter_pass")}
                  type={pvisible ? "text" : "password"}
                  id="re-enter password"
                ></Input>
                {errors.re_enter_pass && (
                  <Text align="left" color={"red"}>
                    {errors.re_enter_pass.message}
                  </Text>
                )}
              </CardBody>
            </FormControl>
            <CardFooter justifyContent={"flex-end"} mr={"50px"}>
              <HStack spacing={2}>
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
                <Button variant={"solid"} type="submit">
                  Submit
                </Button>
              </HStack>
            </CardFooter>
            <Box display="flex" justifyContent={"center"} mb={5}>
              <Link to={"/login"}>Already have an account? Click here</Link>
            </Box>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
