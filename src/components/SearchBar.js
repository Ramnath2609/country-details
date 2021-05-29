import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import ResultAccordion from "./ResultAccordian";


const useStyles = makeStyles((theme) => ({
  button: {
      margin: theme.spacing(1),
      width: '25ch',
      height: '7ch'  
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    width: '100%',
    height: '100%',
    margin: 0
  },
  formInput: {
    margin: theme.spacing(1),
    width: '50ch',
    height: '7ch',
  }, 
  alertMessage: {
    marginTop: theme.spacing(1), 
    width: '38%',
    margin: 'auto'
  }
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [ inputValue, setInputValue ] = useState("")
  const [open, setOpen] = useState(false);
  const [ countries, setCountries ] = useState([])
  const [ alertMessage, setAlertMessage ] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [severity, setSeverity] = useState("error")
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (e) => {
    if(e){
        e.preventDefault();
    }
    if(inputValue.length == 0){
        setShowAlert(true)
        setSeverity("error")
        setAlertMessage("Country name should not be empty")
        setCountries([])
    }else{
        setOpen(!open);
        axios.get(`https://restcountries.eu/rest/v2/name/${inputValue}`)
        .then(response => {
            console.log(response.status)
            setCountries(response.data)
            setSeverity("success")
            setAlertMessage(`${response.data.length} results found`)
            setShowAlert(true)
            handleClose()
        })
        .catch(err => {
            handleClose()
            setSeverity("error")
            setAlertMessage("Please enter a valid country name")
            setShowAlert(true)
        })
    }
  };

  return (
      <div className="searchField">
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => {handleToggle(e)}}>
            <TextField className={classes.formInput} id="outlined-basic" label="Country" variant="outlined" value={inputValue} onChange={(e) =>{
                setInputValue(e.target.value)
                if(showAlert){
                    setShowAlert(false)
                }
                }} />
            <Button className={classes.button} variant="contained" color="primary" onClick={handleToggle}>
                Search
            </Button>
        </form>
            {showAlert && 
                <Alert className={classes.alertMessage} severity={severity}>{alertMessage}</Alert>
            }
            <div className="results">
                {
                countries.map(ele => {
                    return <ResultAccordion fullName={ele.name} population={ele.population} currencies={ele.currencies} />
                })
                }
            </div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
      </div>
  );
}
