import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchEstados } from "./features/localidades/estados";
import { fetchMunicipios } from "./features/localidades/municipios";
import { fetchMunicipioInfo } from "./features/localidades/municipiosInfo";
import { useAppSelector } from "./features/hooks/useAppSelector";
import './App.css'

export default function App() {
  const estadosState = useAppSelector((state) => state.estados);
  const municipiosState = useAppSelector((state) => state.municipios);
  const municipioInfos = useAppSelector((state) => state.municipioInfos);

  const dispatch = useDispatch<AppDispatch>();
  const [siglaEstado, setSiglaEstado] = useState<string>();
  const [siglaMunicipio, setMunicipio] = useState<string>();

  useEffect(() => {
    dispatch(fetchEstados());
    if (siglaEstado) {
      dispatch(fetchMunicipios(siglaEstado));
    }
  }, [siglaEstado]);

  useEffect(() => {
    dispatch(
      fetchMunicipioInfo(
        siglaMunicipio
          ?.normalize("NFD")
          .replace(/\p{Mn}/gu, "")
          .replace(/ /g, "-")
      )
    );
  }, [siglaMunicipio]);

  return (
    <>
      <div>
        <select
          value={siglaEstado}
          onChange={(e) => setSiglaEstado(e.target.value)}
        >
          <option selected disabled value="">
            Selecione o estado
          </option>
          {estadosState.estados.map((estado) => (
            <option key={estado.sigla} value={estado.sigla}>
              {estado.sigla} - {estado.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={siglaMunicipio}
          onChange={(e) => setMunicipio(e.target.value)}
        >
          <option selected disabled value="">
            Selecione um municipio
          </option>
          {municipiosState.municipios.map((municipio) => (
            <option key={municipio.id} value={municipio.nome}>
              {municipio.nome}
            </option>
          ))}
        </select>
      </div>

      {Array.isArray(municipioInfos.municipio) ? (
        municipioInfos.municipio.map(
          ({ microrregiao, "regiao-imediata": regiaoImediata }) => (
            <>
              <h2>Microrregião: {microrregiao.nome}</h2> 
              <h2>Região Imediata: {regiaoImediata.nome}</h2>
              <h2>Mesorregiao: {microrregiao.mesorregiao.nome}</h2> 
              <h2>Estado: {microrregiao.mesorregiao.UF.nome}</h2>
            </>
          )
        )
      ) : (
        <>
          {" "}
          <h1>Microrregião: {municipioInfos.municipio.microrregiao.nome}</h1>{" "}
          <h1>Região Imediata: {municipioInfos.municipio["regiao-imediata"].nome}</h1>{" "}
          <h1>Mesorregiao: {municipioInfos.municipio.microrregiao.mesorregiao.nome}</h1>{" "}
          <h1>Estado: {municipioInfos.municipio.microrregiao.mesorregiao.UF.nome}</h1>{" "}
        </>
      )}
    </>
  );
}
