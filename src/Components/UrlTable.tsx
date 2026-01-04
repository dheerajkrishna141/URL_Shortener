import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from "@chakra-ui/react";
import { CONSTANTS } from "../Constants/appConstants";
import { UrlFetchResponse } from "../Services/http-service";
import CustomMessage from "./CustomMessage";
import UpdatingData from "./UpdatingData";
interface Props {
  urlinfo: UrlFetchResponse | undefined;
  update: string;
  setUpdate: (update: string) => void;
  handleUpdate: (newUrl: string, alias: string) => void;
  handleCopy: (text: string) => void;
  deleteUrl: (alias: string) => void;
}

const UrlTable = ({
  urlinfo,
  update,
  setUpdate,
  handleUpdate,
  handleCopy,
  deleteUrl,
}: Props) => {
  const base = CONSTANTS.BASE_URL + "/url";

  if (urlinfo?.content?.length == 0 && urlinfo.first) {
    return <CustomMessage></CustomMessage>;
  }
  return (
    <Box>
      <TableContainer marginBottom={4}>
        <Table colorScheme="gray" variant={"simple"}>
          <TableCaption>URL'S</TableCaption>
          <Thead>
            <Tr>
              <Th>Alias</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>Original URL</Th>
              <Th display={{ base: "none", md: "table-cell" }}>
                Shortnened URL
              </Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {urlinfo?.content?.map((dat, index) =>
              update === dat.alias ? (
                <UpdatingData
                  key={index}
                  handleCancel={() => {
                    setUpdate("");
                  }}
                  data={dat}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <Tr key={index}>
                  <Td>
                    {dat.alias}
                    <Box as="dl">
                      <VisuallyHidden>
                        <Box as="dt">Original URL</Box>
                      </VisuallyHidden>
                      <Box
                        maxW={{ base: "150px", sm: "auto" }}
                        as="dd"
                        isTruncated
                        display={{ lg: "none" }}
                        color={"GrayText"}
                        fontWeight={"350"}
                      >
                        {dat.url}
                      </Box>
                      <VisuallyHidden>
                        <Box as="dt">Shortened URL</Box>
                      </VisuallyHidden>
                      <Box
                        as="dd"
                        maxW={{ base: "150", sm: "full" }}
                        isTruncated
                        display={{ md: "none" }}
                        color={"GrayText"}
                        fontWeight={"350"}
                      >
                        {base + "/" + dat.alias}
                      </Box>
                    </Box>
                  </Td>
                  <Td
                    maxWidth={{ base: "200px", sm: "auto" }}
                    display={{ base: "none", lg: "table-cell" }}
                    isTruncated
                  >
                    {dat.url}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }} isTruncated>
                    {base + "/" + dat.alias}
                  </Td>
                  <Td>
                    <ButtonGroup justifyContent={"space-between"}>
                      <Button
                        onClick={() => {
                          handleCopy(base + "/" + dat.alias);
                        }}
                        colorScheme="teal"
                      >
                        Copy
                      </Button>

                      <Button
                        onClick={() => {
                          deleteUrl(dat.alias);
                        }}
                        colorScheme="red"
                      >
                        Delete
                      </Button>

                      <Button
                        onClick={() => setUpdate(dat.alias)}
                        colorScheme="blue"
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UrlTable;
