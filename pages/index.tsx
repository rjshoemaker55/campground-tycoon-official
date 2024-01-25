import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Center, Title, SegmentedControl, TextInput, PasswordInput, Button } from "@mantine/core";
import classes from "../css/Home.module.scss";
import Error from "next/error";
import { setCookie } from "cookies-next";

const Index = () => {
  const [selectedFunction, setSelectedFunction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (selectedFunction === "Sign up") {
        const response = await fetch("/api/users/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          // Handle non-successful response
          const errorMessage = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`) as Error;
        }

        const responseData = await response.json();
      } else if (selectedFunction === "Login") {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const loginData = await response.json();

        if (!loginData.success) {
          setErrorMessage(loginData.message);
        }

        setCookie("cgt-userid", loginData.user._id);

        router.push("/play");
      }
    } catch (error: any) {
      console.error("API Error:", error.message || "Unknown error");
    }
  };

  return (
    <Center h='100vh'>
      <Box mx='auto'>
        <Title order={1} mb='40px'>
          Campground Tycoon
        </Title>
        <Center mb='10px'>
          <SegmentedControl
            radius='xl'
            size='md'
            data={["Login", "Sign up"]}
            mx='auto'
            classNames={classes}
            onChange={(e) => {
              setSelectedFunction(e);
              setErrorMessage("");
              setFormData({ username: "", password: "" });
            }}
          />
        </Center>
        <TextInput label='Username' placeholder='Username' name='username' value={formData.username} onChange={handleInputChange} />
        <PasswordInput label='Password' placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} />
        <p className={classes.errorMessage}>{errorMessage}</p>
        <Center mt='20px'>
          <Button variant='gradient' gradient={{ from: "#228B22", to: "#8B4513", deg: 304 }} onClick={handleSubmit}>
            {selectedFunction}
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Index;
