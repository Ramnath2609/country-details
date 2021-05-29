import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function BasicTable(props) {
  const classes = useStyles();
  const [conversionRate, setConversionRate] = useState({})

  useEffect(() => {
    axios.get(`http://data.fixer.io/api/latest?access_key=c7a63a10d155a90219369c106dec43bd&symbols=${props.currencies.map(ele => ele.code).join(",")}`)
    .then(response => {
        setConversionRate(response.data.rates)
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>S.no</b></TableCell>
            <TableCell align="center"><b>Code</b></TableCell>
            <TableCell align="center"><b>Currency</b></TableCell>
            <TableCell align="center"><b>Name</b></TableCell>
            <TableCell align="right"><b>Conversion rate (In EUR)</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.currencies.map((curr, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="center">{curr.code}</TableCell>
              <TableCell align="center">{curr.name}</TableCell>
              <TableCell align="center">{curr.name}</TableCell>
              <TableCell align="center">{conversionRate[curr.code]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
