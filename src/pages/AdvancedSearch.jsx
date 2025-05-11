import {
  Box, Heading, Input, Select, SimpleGrid, Text, VStack, HStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRecipes } from '../utils/localStorageHelpers';
import RecipeCard from '../components/RecipeCard';
import { useLocation } from 'react-router-dom';

const AdvancedSearch = () => {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoDieta, setTipoDieta] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [ingredientes, setIngredientes] = useState('');

  const location = useLocation();

  useEffect(() => {
    // cargar filtros iniciales si vienen del estado
    if (location.state) {
      setBusqueda(location.state.busqueda || '');
      setTipoDieta(location.state.tipoDieta || '');
      setDificultad(location.state.dificultad || '');
    }

  }, [location.state]);

  useEffect(() => {
    const todas = getRecipes();
  
    const filtradas = todas.filter((receta) => {
      const coincideNombre = receta.titulo.toLowerCase().includes(busqueda.toLowerCase());
      const coincideDieta = tipoDieta ? receta.tipo.toLowerCase() === tipoDieta.toLowerCase() : true;
      const coincideDificultad = dificultad ? receta.dificultad.toLowerCase() === dificultad.toLowerCase() : true;
      const coincideIngredientes = ingredientes
        ? receta.ingredientes?.some((ing) =>
            ing.toLowerCase().includes(ingredientes.toLowerCase())
          )
        : true;
  
      return coincideNombre && coincideDieta && coincideDificultad && coincideIngredientes;
    });
  
    setRecetas(filtradas);
  }, [busqueda, tipoDieta, dificultad, ingredientes]);
  
  const allIngredients = getRecipes()
  .flatMap(receta => receta.ingredientes || [])
  .filter((ing, i, arr) => arr.indexOf(ing) === i); // quitar duplicados


  return (
    <Box maxW="900px" mx="auto" p={6}>
      <Heading size="lg" mb={4}>Todas las Recetas</Heading>

      <VStack align="stretch" spacing={4} mb={6}>
        <Input
          placeholder="Buscar recetas por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <HStack spacing={4}>
          <Select
            placeholder="Tipo de Dieta"
            value={tipoDieta}
            onChange={(e) => setTipoDieta(e.target.value)}
          >
            <option value="vegana">Vegana</option>
            <option value="keto">Keto</option>
            <option value="baja en carbohidratos">Baja en Carbohidratos</option>
          </Select>

          <Select
            placeholder="Dificultad"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="fácil">Fácil</option>
            <option value="media">Media</option>
            <option value="difícil">Difícil</option>
          </Select>

          <Select
            placeholder="Filtrar por ingrediente"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          >
            {allIngredients.map((ing, idx) => (
              <option key={idx} value={ing}>{ing}</option>
            ))}
          </Select>



        </HStack>
      </VStack>

      {recetas.length === 0 ? (
        <Text color="gray.500">No se encontraron recetas con los filtros aplicados.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {recetas.map((receta) => (
            <RecipeCard key={receta.id} receta={receta} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AdvancedSearch;
