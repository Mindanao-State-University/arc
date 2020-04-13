import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paperContainer: {
    minHeight: 200,
    maxheight: 600,
    maxWidth: 600,
    minWidth: 300,
    margin: '0 auto',
    marginTop: 130,
  },
  formContainer: {
    width: '94%',
    margin: '0 auto',
    paddingTop: 15,
  },
  button: {
    marginTop: 15,
    color: 'white',
    marginBottom: 20,
  },
})

const actions = [
  'Import',
  'Generate'
]

class Home extends Component {

  state = {
    action: actions[0],
    privateKey: '',
    wif: '',
  }

  canSubmit = () => {
    const { privateKey, wif, action } = this.state
    if(action === 'Generate') { return true }
    return (privateKey.trim() !== '' || wif.trim() !== '')
  }

  handleChange = (e) => {
    const { target } = e
    const { name, value } = target
    if(name === 'wif') { this.setState({ privateKey: '' })}
    else if (name === 'privateKey') { this.setState({ wif: '' }) }
    this.setState({ [name]: value })
  }

  render() {

    const { classes } = this.props
    const { action, wif, privateKey } = this.state

    return (
      <React.Fragment>
        <Paper
          className={classes.paperContainer}
          elevation={3}
        >
          <div className={classes.formContainer}>
            <Typography variant="h6">Wallet Generator</Typography>
            <TextField name="action" value={action} onChange={this.handleChange} margin="normal" label="Action" select variant="outlined" fullWidth>
              {
                actions.map(item => (
                  <MenuItem key={item} value={item} selected={action === item}>
                    { item }
                  </MenuItem>   
                ))
              }
            </TextField>
            {
              action === 'Import' && (
                <React.Fragment>
                  <Typography variant="subtitle2" color="error">Note: Please enter your WIF or Private Key below to import your wallet</Typography>
                  <TextField name="wif" value={wif} onChange={this.handleChange} label="WIF" variant="outlined" margin="normal" fullWidth/>
                  <TextField name="privateKey" value={privateKey} onChange={this.handleChange} label="Private Key" variant="outlined" margin="normal" fullWidth/>
                </React.Fragment>
              )
            }
            <Button disabled={!this.canSubmit()} variant="contained" size="medium" color="primary" className={classes.button}>
              submit
            </Button>
          </div>
        </Paper>
        <center>
          <br />
          <Typography variant="subtitle2">Made with <React.Fragment>&#9829;</React.Fragment> by Chainbytes</Typography>
        </center>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.array.isRequired,
}

export default withStyles(styles)(Home)