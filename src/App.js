import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function App() {
  // State variables for storing data and managing search functionality
  const [breeds, setBreeds] = useState([]); // State for storing all dog breeds
  const [searchQuery, setSearchQuery] = useState(''); // State for storing search query
  const [suggestions, setSuggestions] = useState([]); // State for storing search suggestions

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds?ref=thedataschool.co.uk');
        setBreeds(response.data || []); // Set the fetched data to breeds state
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchData();
  }, []); // Fetch data only on initial component mount

  // Function to handle search based on user input
  const handleSearch = () => {
    const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(searchQuery.toLowerCase())); // Filter breeds based on search query
    setBreeds(filteredBreeds); // Update breeds state with filtered breeds
    setSuggestions([]); // Clear search suggestions
  };

  // Function to handle search when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to handle input change in the search field
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state with the input value
    if (e.target.value.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = breeds.filter(breed => breed.name.toLowerCase().includes(e.target.value.toLowerCase())); // Filter breeds for search suggestions
      setSuggestions(filteredSuggestions); // Update suggestions state with filtered suggestions
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (name) => {
    setSearchQuery(name); // Set the search query to the clicked suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Dog Breeds
      </Typography>
      <Box mb={2} display="flex" alignItems="center">
        <TextField
          label="Search Dog Breed"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginLeft: 2 }}
        >
          Search
        </Button>
      </Box>
      {suggestions.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">Suggestions:</Typography>
          <List>
            {suggestions.map((breed) => (
              <ListItem key={breed.id} button onClick={() => handleSuggestionClick(breed.name)}>
                <ListItemText primary={breed.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Number</b></TableCell> {/* New column for serial number */}
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Weight (lbs/kg)</b></TableCell>
            <TableCell><b>Height (inches/cm)</b></TableCell>
            <TableCell><b>Bred For</b></TableCell>
            <TableCell><b>Breed Group</b></TableCell>
            <TableCell><b>Life Span</b></TableCell>
            <TableCell><b>Temperament</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breeds.map((breed, index) => (
            <TableRow key={breed.id}>
              <TableCell>{index + 1}</TableCell> {/* Serial number */}
              <TableCell>{breed.name}</TableCell>
              <TableCell>{`${breed.weight.imperial} / ${breed.weight.metric}`}</TableCell>
              <TableCell>{`${breed.height.imperial} / ${breed.height.metric}`}</TableCell>
              <TableCell>{breed.bred_for || 'N/A'}</TableCell>
              <TableCell>{breed.breed_group || 'N/A'}</TableCell>
              <TableCell>{breed.life_span || 'N/A'}</TableCell>
              <TableCell>{breed.temperament || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
