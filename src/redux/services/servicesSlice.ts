import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serviceStatusType } from "../../api/getServicesStatus";

interface ServicesState {
  loading: boolean;
  items: serviceStatusType[];
  selectedItem: serviceStatusType | null;
}

const initialState: ServicesState = {
  loading: false,
  items: [],
  selectedItem: null,
};

export const ServicesSlice = createSlice({
  name: "Services",

  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setItems: (state, action: PayloadAction<serviceStatusType[]>) => {
      state.items = [...action.payload];
    },

    selectItem: (state, action: PayloadAction<serviceStatusType>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setLoading, setItems, selectItem } = ServicesSlice.actions;

export default ServicesSlice.reducer;
