import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function ExpenseForm(props: ExpenseFormProps) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedType, setSelectedType] = React.useState('income'); // Set a default type
  const [selectedCategory, setSelectedCategory] = React.useState('');
  
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
    onTypeChange(event.target.value); // Propagate the change to the parent component
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value); // Propagate the change to the parent component
  };

  const {
        onSubmit,
        onDateChange,
        onDescriptionChange,
        onAmountChange,
        onTypeChange,
        onCategoryChange,
      } = props;

return (
  <React.Fragment>
  <Button variant="outlined" onClick={handleClickOpen}>
    Add
  </Button>
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add (Income or Outcome)</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="date"
        label="Date"
        type="datetime-local"
        fullWidth
        variant="standard"
        onChange={(e) => onDateChange(e.target.value)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="amount"
        label="Amount"
        type="number"
        fullWidth
        variant="standard"
        onChange={(e) => onAmountChange(Number(e.target.value))}
      />
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Income or Outcome?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        id="type"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <FormControlLabel value="income" control={<Radio />} label="Income" />
        <FormControlLabel value="outcome" control={<Radio />} label="Outcome" />
        
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Transaction Category</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        id="type"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <FormControlLabel value="rent" control={<Radio />} label="Rent" />
        <FormControlLabel value="utilities" control={<Radio />} label="Utilities" />
        <FormControlLabel value="food" control={<Radio />} label="Food" />
        <FormControlLabel value="travel" control={<Radio />} label="Travel" />
        <FormControlLabel value="subscriptins" control={<Radio />} label="Subscriptions" />
        <FormControlLabel value="shopping" control={<Radio />} label="Shopping" />

      </RadioGroup>
    </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={onSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
</React.Fragment>
    );
}