import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Select, MenuItem, FormControl, InputLabel,
  Checkbox, FormControlLabel, Typography, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Pagination, Grid, CircularProgress, Alert
} from '@mui/material';

const AdvancedQueryWithPagination = () => {
  // Query state
  const [queryParams, setQueryParams] = useState({
    name: '',
    countrys: '',
    emailer: '',
    bloodG: '',
    gendering: '',
    ageEq: '',
    truess: '',
    hoobies: '',
    removes: '',
    ones: '',
    twos: '',
    prices: '',
    pricegreat: '',
    priceless: '',
    agelessValue: '',
    agegreatValues: ''
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheStatus, setCacheStatus] = useState('');

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/getQuearyAdavanceRedis', {
        params: {
          ...queryParams,
          page: pagination.page,
          limit: pagination.limit
        }
      });

      setCacheStatus(response.headers['x-cache'] || '');
      
      setResults(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        totalPages: response.data.totalPages
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset to first page when query changes
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchData();
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQueryParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked.toString() : value
    }));
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Advanced Query with Redis Caching
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Basic Filters */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={queryParams.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Country"
                name="countrys"
                value={queryParams.countrys}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="emailer"
                value={queryParams.emailer}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Blood Group and Gender */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Blood Group"
                name="bloodG"
                value={queryParams.bloodG}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gendering"
                  value={queryParams.gendering}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Age Filters */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Exact Age"
                name="ageEq"
                type="number"
                value={queryParams.ageEq}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Min Age"
                name="agelessValue"
                type="number"
                value={queryParams.agelessValue}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Max Age"
                name="agegreatValues"
                type="number"
                value={queryParams.agegreatValues}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Boolean and Hobbies */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="truess"
                    checked={queryParams.truess === 'true'}
                    onChange={handleInputChange}
                  />
                }
                label="Is Eligible"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Hobby"
                name="hoobies"
                value={queryParams.hoobies}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Remove Field</InputLabel>
                <Select
                  name="removes"
                  value={queryParams.removes}
                  onChange={handleInputChange}
                  label="Remove Field"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Multiple Hobbies */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Hobby 1"
                name="ones"
                value={queryParams.ones}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Hobby 2"
                name="twos"
                value={queryParams.twos}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Price Filters */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Exact Price"
                name="prices"
                type="number"
                value={queryParams.prices}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Min Price"
                name="priceless"
                type="number"
                value={queryParams.priceless}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Max Price"
                name="pricegreat"
                type="number"
                value={queryParams.pricegreat}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            
            {/* Submit and Reset */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Search
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setQueryParams({
                    name: '',
                    countrys: '',
                    emailer: '',
                    bloodG: '',
                    gendering: '',
                    ageEq: '',
                    truess: '',
                    hoobies: '',
                    removes: '',
                    ones: '',
                    twos: '',
                    prices: '',
                    pricegreat: '',
                    priceless: '',
                    agelessValue: '',
                    agegreatValues: ''
                  });
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {/* Cache Status */}
      {cacheStatus && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Data served from: {cacheStatus === 'HIT' ? 'Redis Cache' : 'MongoDB'}
        </Alert>
      )}
      
      {/* Loading and Error States */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Results Table */}
      {!loading && results.length > 0 && (
        <Paper elevation={3} sx={{ mb: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Hobbies</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Eligible</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.name || '-'}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.bloodGroup}</TableCell>
                    <TableCell>{row.hobbies?.join(', ') || '-'}</TableCell>
                    <TableCell>{row.price || '-'}</TableCell>
                    <TableCell>{row.isEligible ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      
      {/* No Results */}
      {!loading && results.length === 0 && !error && (
        <Alert severity="info">No results found. Try adjusting your search criteria.</Alert>
      )}
      
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      
      {/* Pagination Info */}
      {results.length > 0 && (
        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} records
        </Typography>
      )}
    </Box>
  );
};

export default AdvancedQueryWithPagination;