import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Municipio {
  id: number
  nome: string
  microrregiao: {
    id: number
    nome: string
    mesorregiao: {
      id: number
      nome: string
      UF: {
        id: number
        sigla: string
        nome: string
        regiao: {
          id: number
          sigla: string
          nome: string
        }
      }
    }
  }
  'regiao-imediata': {
    id: number
    nome: string
    'regiao-intermediaria': {
      id: number
      nome: string
      UF: {
        id: number
        sigla: string
        nome: string
        regiao: {
          id: number
          sigla: string
          nome: string
        }
      }
    }
  }
}

export type MunicipiosState = {
  state: 'NAO_CARREGADO' | 'CARREGADO'
  municipios: Municipio[]
}

const initialState: MunicipiosState = {
  state: 'NAO_CARREGADO',
  municipios: []
}

export const fetchMunicipios = createAsyncThunk(
  'municipios/fetch',
  async (siglaEstado: string) => {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`)
    const data: Municipio[] = await response.json()
    return data
  }
)

export const estadosSlice = createSlice({
  name: 'municipios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMunicipios.fulfilled, (state, action) => {
      state.state = 'CARREGADO'
      state.municipios = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const {  } = estadosSlice.actions

export default estadosSlice.reducer
