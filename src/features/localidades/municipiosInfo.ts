import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface MunicipioInfo {
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

export type MunicipioState = {
  state: 'NAO_CARREGADO' | 'CARREGADO',
  municipio: MunicipioInfo[] | MunicipioInfo
}

const initialState: MunicipioState = {
  state: 'NAO_CARREGADO',
  municipio: []
}

export const fetchMunicipioInfo = createAsyncThunk(
  'municipio/fetch',
  async (municipio: string | undefined) => {
 
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipio}`)
    const data: MunicipioInfo[] = await response.json()
    return data
    
  }
)

export const estadosSlice = createSlice({
  name: 'municipio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMunicipioInfo.fulfilled, (state, action) => {
      state.state = 'CARREGADO'
      state.municipio = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const {  } = estadosSlice.actions

export default estadosSlice.reducer
