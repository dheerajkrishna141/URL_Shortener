import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <HStack spacing={2} mt={4} justifyContent={"center"}>
      <IconButton
        aria-label=""
        icon={<ChevronLeftIcon />}
        isDisabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          isActive={pageNumber === page}
        >
          {pageNumber}
        </Button>
      ))}
      <IconButton
        aria-label=""
        icon={<ChevronRightIcon />}
        isDisabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      />
    </HStack>
  );
};

export default Pagination;
