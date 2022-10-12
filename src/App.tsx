import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface Data {
  nama: string;
  npm: number;
  email: string;
  angkatan: number;
  peringkat: number;
  poin: {
    kegiatan_tutor_uts: number;
    workshop_internal: number;
    sharing_alumni_series_1: number;
    pengabdian_1: number;
    sharing_alumni_series_2: number;
    kegiatan_tutor_uas: number;
    total_poin: number;
  };
}

const createData = (
  nama: string,
  npm: number,
  email: string,
  angkatan: number,
  peringkat: number,
  poin: {
    kegiatan_tutor_uts: number,
    workshop_internal: number,
    sharing_alumni_series_1: number,
    pengabdian_1: number,
    sharing_alumni_series_2: number,
    kegiatan_tutor_uas: number,
    total_poin: number;
  }
): Data => {
  return {
    nama,
    npm,
    email,
    angkatan,
    peringkat,
    poin
  };
};

const Row = (props: { row: ReturnType<typeof createData>; }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.nama}</TableCell>
        <TableCell align="center">{row.npm}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.angkatan}</TableCell>
        <TableCell align="center">{row.peringkat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Poin
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Kegiatan TUTOR UTS</TableCell>
                    <TableCell align="center">Workshop Internal</TableCell>
                    <TableCell align="center">Sharing Alumni Series 1</TableCell>
                    <TableCell align="center">Pengabdian 1</TableCell>
                    <TableCell align="center">Sharing Alumni Series 2</TableCell>
                    <TableCell align="center">Kegiatan TUTOR UAS</TableCell>
                    <TableCell align="center">Total Poin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.poin.total_poin}>
                    <TableCell align="center" component="th" scope="row">{row.poin.kegiatan_tutor_uts}</TableCell>
                    <TableCell align="center">{row.poin.workshop_internal}</TableCell>
                    <TableCell align="center">{row.poin.sharing_alumni_series_1}</TableCell>
                    <TableCell align="center">{row.poin.pengabdian_1}</TableCell>
                    <TableCell align="center">{row.poin.sharing_alumni_series_2}</TableCell>
                    <TableCell align="center">{row.poin.kegiatan_tutor_uas}</TableCell>
                    <TableCell align="center">{row.poin.total_poin}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};


export default function App() {
  const [rows, setRows] = React.useState<Array<Data>>([]);

  React.useEffect(() => {
    fetch("https://himarewards-e2613.web.app/api/v1/himarewards")
      .then((response) => response.json())
      .then((json) => {
        json.map((data: any) => {
          setRows(prev => [...prev, createData(
            data[1], data[2], data[3], data[4], data[12], {
            kegiatan_tutor_uts: Number(data[5]),
            workshop_internal: Number(data[6]),
            sharing_alumni_series_1: Number(data[7]),
            pengabdian_1: Number(data[8]),
            sharing_alumni_series_2: Number(data[9]),
            kegiatan_tutor_uas: Number(data[10]),
            total_poin: Number(data[11])
          }
          )]);
        });
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Nama</TableCell>
            <TableCell align="center">NPM</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Angkatan</TableCell>
            <TableCell align="center">Peringkat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.npm * Math.random()} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
