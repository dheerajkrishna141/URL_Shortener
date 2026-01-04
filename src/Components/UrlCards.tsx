import React from "react";
import { UrlFetchResponse } from "../Services/http-service";
import CustomMessage from "./CustomMessage";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  HStack,
  Text,
} from "@chakra-ui/react";
import { CONSTANTS } from "../Constants/appConstants";

interface Props {
  urlinfo: UrlFetchResponse | undefined;
  update: string;
  setUpdate: (update: string) => void;
  handleUpdate: (newUrl: string, alias: string) => void;
  handleCopy: (text: string) => void;
  deleteUrl: (alias: string) => void;
}
const UrlCards = ({
  urlinfo,
  update,
  setUpdate,
  handleUpdate,
  handleCopy,
  deleteUrl,
}: Props) => {
  const base = CONSTANTS.BASE_URL + "/url/";
  if (urlinfo?.content?.length == 0 && urlinfo.first) {
    return <CustomMessage></CustomMessage>;
  }

  return (
    <Container>
      {urlinfo?.content.map((data, index) => (
        <Card key={index} shadow={"lg"} m={4}>
          <CardHeader fontSize={"large"} fontWeight={"700"}>
            {data.alias}
          </CardHeader>
          <CardBody>
            <Text>Original URL:</Text>
            <Text mb={3} isTruncated>
              {data.url}
            </Text>
            <Text>Shortened URL:</Text>
            <Text>{base + data.alias}</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup justifyContent={"flex-start"}>
              <Button
                onClick={() => {
                  handleCopy(base + data.alias);
                }}
                colorScheme="teal"
              >
                Copy
              </Button>

              <Button
                onClick={() => {
                  deleteUrl(data.alias);
                }}
                colorScheme="red"
              >
                Delete
              </Button>

              <Button onClick={() => setUpdate(data.alias)} colorScheme="blue">
                Update
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </Container>
  );
};

export default UrlCards;
