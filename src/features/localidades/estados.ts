import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Estado {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

export type EstadosState = {
  state: 'NAO_CARREGADO' | 'CARREGADO'
  estados: Estado[]
}

const initialState: EstadosState = {
  state: 'NAO_CARREGADO',
  estados: []
}

export const fetchEstados = createAsyncThunk(
  'estados/fetch',
  async () => {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    const data: Estado[] = await response.json()
    return data
  }
)

export const estadosSlice = createSlice({
  name: 'estados',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEstados.fulfilled, (state, action) => {
      state.state = 'CARREGADO'
      state.estados = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const {  } = estadosSlice.actions

export default estadosSlice.reducer
