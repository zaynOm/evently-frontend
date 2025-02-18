import { FilterParam } from '@common/hooks/useItems';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useCategories from '@modules/categories/hooks/api/useCategory';
import EventsGrid from '@modules/events/components/lib/EventsGrid';
import { Event as EventApp } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Search } from '@mui/icons-material';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

dayjs.extend(customParseFormat);

const ExploreEvents = () => {
  const { user } = useAuth();
  const { items, readAll } = useEvents();
  const [events, setEvents] = useState<EventApp[]>([]);
  const { items: categories } = useCategories({ fetchItems: true });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const defaultFilter: FilterParam = {
    columnField: 'hostId',
    operatorValue: 'not',
    value: user?.id,
  };

  useEffect(() => {
    fetchEvents(undefined, undefined);
  }, []);

  useEffect(() => {
    if (items) {
      setEvents(items);
    }
  }, [items]);

  const fetchEvents = useCallback(
    async (searchTerm?: string, categoryId?: number) => {
      const filterParams: FilterParam[] = [];
      filterParams.push(defaultFilter);

      if (searchTerm && searchTerm.trim() !== '') {
        filterParams.push({ columnField: 'title', operatorValue: 'contains', value: searchTerm });
        filterParams.push({
          columnField: 'description',
          operatorValue: 'contains',
          value: searchTerm,
        });
      }

      if (categoryId && categoryId !== -1) {
        filterParams.push({
          columnField: 'categoryId',
          operatorValue: 'equals',
          value: categoryId,
        });
      }

      const response = await readAll(1, 50, undefined, filterParams);
      if (response.success) {
        setEvents(response.data?.items || []);
      }
    },
    [readAll]
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm: string, categoryId: number) => {
      fetchEvents(searchTerm, categoryId);
    }, 500),
    [fetchEvents]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    debouncedSearch(newSearchTerm, selectedCategory);
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    const categoryId = e.target.value as number;
    setSelectedCategory(categoryId);
    debouncedSearch(search, categoryId);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory(-1);
    fetchEvents('', -1);
  };

  return (
    <Stack spacing={3} alignItems="center">
      <Card sx={{ width: '100%' }}>
        <Grid container spacing={3} padding={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              name="search"
              label="Search"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Select
              name="categoryId"
              label="Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
            >
              <MenuItem value={-1}>Categories</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              size="large"
              sx={{ height: '100%' }}
              color="secondary"
              fullWidth
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
          </Grid>
        </Grid>
      </Card>
      <EventsGrid events={events} fetchEvents={() => fetchEvents(search, selectedCategory)} />
    </Stack>
  );
};

export default ExploreEvents;
