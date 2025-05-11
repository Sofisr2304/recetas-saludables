import {
  Box,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Button,
  Text,
  VStack,
  HStack,
  Divider
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getRecipes, getFavorites } from '../utils/localStorageHelpers';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoDieta, setTipoDieta] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [recomendadas, setRecomendadas] = useState([]);
  const navigate = useNavigate();

  const cargarRecetas = () => {
    const todas = getRecipes();
  
    const filtradas = todas.filter((receta) => {
      const coincideNombre = receta.titulo.toLowerCase().includes(busqueda.toLowerCase());
      const coincideDieta = tipoDieta ? receta.tipo.toLowerCase() === tipoDieta.toLowerCase() : true;
      const coincideDificultad = dificultad ? receta.dificultad.toLowerCase() === dificultad.toLowerCase() : true;
      return coincideNombre && coincideDieta && coincideDificultad;
    });
  
    setRecetas(filtradas.slice(0, 3));
  };

  const generarRecomendaciones = () => {
    const all = getRecipes();
    const favIds = getFavorites();
    const favoritos = all.filter(r => favIds.includes(r.id));
  
    if (favoritos.length === 0) {
      setRecomendadas([]);
      return;
    }
  
    const tipos = new Set(favoritos.map(f => f.tipo));
    const dificultades = new Set(favoritos.map(f => f.dificultad));
  
    const sugeridas = all.filter(r =>
      !favIds.includes(r.id) &&
      (tipos.has(r.tipo) || dificultades.has(r.dificultad))
    );
  
    setRecomendadas(sugeridas.slice(0, 2)); // mostramos 2
  };

  useEffect(() => {
    cargarRecetas();
    generarRecomendaciones();
  }, [busqueda, tipoDieta, dificultad]);
  

  useEffect(() => {
    const handler = () => cargarRecetas();
    window.addEventListener('recetaEliminada', handler);
    return () => window.removeEventListener('recetaEliminada', handler);
  }, []);

  return (
    <Box maxW="900px" mx="auto" p={6} mt={8}>
      <HStack justify="space-between" mb={4}>
      <Heading size="lg" textAlign="center" mb={6}>
        🥗 Página de Inicio
      </Heading>
      </HStack>

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
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </Select>
        </HStack>
      </VStack>

      <Divider my={4} />

      <Heading size="lg" mb={4}>Recetas Destacadas</Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {recetas.map((receta) => (
          <RecipeCard key={receta.id} receta={receta} />
        ))}
      </SimpleGrid>

      {recomendadas.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={4}>Recomendado para ti</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {recomendadas.map((receta) => (
              <RecipeCard key={receta.id} receta={receta} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      
<HStack justify="space-between" mt={8}>
      <Button
        colorScheme="green"
        variant="outline"
        onClick={() =>
          navigate('/busqueda', {
            state: { busqueda, tipoDieta, dificultad }
          })
        }
      >
        Ver más recetas
      </Button>
      </HStack>

      <Text mt={10} fontSize="sm" color="gray.500" textAlign="center">
        Pie de página, términos y condiciones
      </Text>
    </Box>
  );
};

export default Home;
