import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  products: [],
  product: null,
  loading: false,
  error:null,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/products`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/products/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createProduct = createAsyncThunk(
    "/products/createProduct",
    async (productData,{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/products`, productData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    "/products/updateProduct",
    async({id, newproductData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/products/${id}`, newproductData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
             await api.delete(`/api/products/${id}`, config);
            return id
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchProducts.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action)=>{
        state.loading = false;
        state.products = action?.payload?.data;
    })
    .addCase(fetchProducts.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchProductById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchProductById.fulfilled, (state, action)=>{
        state.loading = false
        state.product = action?.payload?.data
    })
    .addCase(fetchProductById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createProduct.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createProduct.fulfilled, (state, action)=>{
        state.loading = false;
        state.products.push(action?.payload?.data)
    })
    .addCase(createProduct.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateProduct.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateProduct.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteProduct.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action)=>{
        state.loading = false;
        state.products = state.products.filter((selected)=>selected.id != action.payload)
    })
    .addCase(deleteProduct.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
}
})


export default productSlice.reducer