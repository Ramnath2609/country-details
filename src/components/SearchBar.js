import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '50ch',
//       height: '7ch'
//     }
//   },
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
    height: '7ch'
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
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    if(inputValue.length == 0){
        setShowAlert(true)
        setAlertMessage("Country name should not be empty")
    }else{
        setOpen(!open);
        axios.get(`https://restcountries.eu/rest/v2/name/${inputValue}`)
        .then(response => {
            console.log(response.status)
            setCountries(response.data)
            handleClose()
        })
        .catch(err => {
            handleClose()
            setAlertMessage("Please enter a valid country name")
            setShowAlert(true)
        })
    }
  };

  return (
      <div className="searchField">
        <form className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.formInput} id="outlined-basic" label="Country" variant="outlined" value={inputValue} onChange={(e) =>{
                setInputValue(e.target.value)
                if(showAlert){
                    setShowAlert(false)
                }
                }} />
            <Button className={classes.button} variant="contained" color="primary" onClick={handleToggle}>
                Search
            </Button>
            {showAlert && 
                <Alert className={classes.alertMessage} severity="info">{alertMessage}</Alert>
            }
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </form>
      </div>
  );
}
