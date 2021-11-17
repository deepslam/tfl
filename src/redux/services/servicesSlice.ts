import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { serviceStatusType } from '../../api/getServicesStatus';

interface ServicesState {
  loading: boolean;
  items: serviceStatusType[];
}

const initialState: ServicesState = {
  loading: false,
  items: []
}

export const ServicesSlice = createSlice({
  name: 'Services',
  
  initialState,
  reducers: {    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setItems: (state, action: PayloadAction<serviceStatusType[]>) => {
      state.items = [...action.payload];
    }
  },
})

export const { setLoading, setItems } = ServicesSlice.actions

export default ServicesSlice.reducer