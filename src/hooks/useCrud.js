import { useState, useEffect } from "react";

export function useCrud() {
  const [data, setData] = useState([
    { id: 1, personaje: "Naruto", anime: "Naruto" },
    { id: 2, personaje: "Goku", anime: "Dragon Ball" },
    { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  ]);

  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    id: "",
    personaje: "",
    anime: "",
  });

  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      setData(JSON.parse(localData));
    }
  }, []);

  const actualizarLocalStorage = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = (dato) => {
    const newData = data.map((registro) => (dato.id === registro.id ? dato : registro));
    actualizarLocalStorage(newData);
    setData(newData);
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    const opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      const newData = data.filter((registro) => dato.id !== registro.id);
      actualizarLocalStorage(newData);
      setData(newData);
      setModalActualizar(false);
    }
  };

  const insertar = () => {
    const valorNuevo = { ...form, id: data.length + 1 };
    const newData = [...data, valorNuevo];
    actualizarLocalStorage(newData);
    setData(newData);
    setModalInsertar(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return {
    data,
    modalActualizar,
    modalInsertar,
    form,
    mostrarModalActualizar,
    cerrarModalActualizar,
    mostrarModalInsertar,
    cerrarModalInsertar,
    editar,
    eliminar,
    insertar,
    handleChange,
  };
}
