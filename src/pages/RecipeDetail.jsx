import { useParams } from 'react-router-dom';
import { getRecipes, deleteRecipe } from '../utils/localStorageHelpers';
import {
  Box, Heading, Text, VStack, IconButton, useToast, Button
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const RecipeDetail = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const all = getRecipes();
    const found = all.find(r => r.id === parseInt(id));
    if (found) {
      setReceta(found);
    }
  }, [id]);

  const handleEliminar = () => {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta receta?');
    if (!confirmar) return;
  
    deleteRecipe(parseInt(id));
    toast({ title: 'Receta eliminada', status: 'info' });
    navigate('/busqueda');
  };
  
  if (!receta) return <Text textAlign="center" mt={10}>Receta no encontrada.</Text>;

  return (
    <Box maxW="700px" mx="auto" p={6}>
      <Heading mb={4}>{receta.titulo}</Heading>

      <VStack align="start" spacing={3} mb={6}>
        <Text><strong>Tipo:</strong> {receta.tipo}</Text>
        <Text><strong>Dificultad:</strong> {receta.dificultad}</Text>
        <Text><strong>Ingredientes:</strong> {receta.ingredientes?.join(', ')}</Text>
        {/* Puedes agregar más campos si los tienes */}
      </VStack>

      <Button
        mt={4}
        colorScheme="blue"
        onClick={() => navigate(`/editar-receta/${receta.id}`)}
      >
        Editar receta
      </Button>

      <Button
        mt={4}
        colorScheme="red"
        variant="outline"
        onClick={handleEliminar}
      >
        Eliminar Receta
      </Button>

    </Box>
  );
};

export default RecipeDetail;
