import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getFavorites, getRecipes } from '../utils/localStorageHelpers';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    const all = getRecipes();
    const favIds = getFavorites();
    const favoritasFiltradas = all.filter(r => favIds.includes(r.id));
    setFavoritas(favoritasFiltradas);
  }, []);

  return (
    <Box maxW="900px" mx="auto" p={6}>
      <Heading size="lg" mb={6}>Mis Recetas Favoritas</Heading>

      {favoritas.length === 0 ? (
        <Text color="gray.500">Aún no has guardado ninguna receta.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {favoritas.map((receta) => (
            <RecipeCard key={receta.id} receta={receta} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Favorites;
