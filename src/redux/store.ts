import { configureStore } from "@reduxjs/toolkit";
import characterReducer from './useSlice';

//store responsavel pelas informacoes entre os components
export default configureStore({
  reducer: {
    character: characterReducer,
  }
});