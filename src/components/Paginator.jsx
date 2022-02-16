import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { colorPalette } from "./color";
import { makeStyles } from "@mui/styles";

export default function PaginationOutlined({
  pages,
  isActiveFilter,
  onPageChanged,
  currentPage,
}) {
  const useStyles = makeStyles((theme) => ({
    num: {
      "& .MuiPaginationItem-root": {
        backgroundColor: `${colorPalette[2]}`,
        color: "#ffff",
        fontWeight: 600,
      },
      "& .Mui-selected": {
        backgroundColor: `${colorPalette[1]} !important`,
      },
    },
  }));
  const classes = useStyles();
  return (
    <Stack spacing={2}>
      <Pagination
        count={pages.length}
        variant="outlined"
        page={currentPage}
        className={classes.num}
        onChange={(e, numPage) => onPageChanged(numPage, isActiveFilter)}
        TabIndicatorProps={{ style: { backgroundColor: colorPalette[2] } }}
      />
    </Stack>
  );
}
