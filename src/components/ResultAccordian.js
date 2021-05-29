import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CurrencyTable from "./CurrencyTable"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: '20px auto',
    background: 'lightgray'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ResultAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.fullName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Population:</b> {props.population}
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
            <Typography>
                <b>Full name:</b> {props.fullName}
            </Typography>
        </AccordionDetails>
        <AccordionDetails>
            <Typography>
                <b>Currencies available:</b> 
            </Typography>
        </AccordionDetails>
        <div className="currencyTable">
            <CurrencyTable currencies={props.currencies} />
        </div>
      </Accordion>
    </div>
  );
}
