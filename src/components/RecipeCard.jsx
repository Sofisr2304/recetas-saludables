import {
  Box,
  Text,
  Heading,
  VStack,
  IconButton,
  Button,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { FaHeart, FaUtensils, FaTrash, FaPen } from 'react-icons/fa';
import { toggleFavorite, isFavorite, deleteRecipe } from '../utils/localStorageHelpers';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

const RecipeCard = ({ receta }) => {
  const [favorito, setFavorito] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFavorito(isFavorite(receta.id));
  }, [receta.id]);

  const handleGuardar = () => {
    toggleFavorite(receta.id);
    setFavorito(prev => !prev);
    toast({
      title: favorito ? 'Receta removida' : 'Receta guardada',
      status: favorito ? 'warning' : 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  const handleEliminar = () => {
    const confirmar = confirm('¿Eliminar esta receta?');
    if (!confirmar) return;
    deleteRecipe(receta.id);
    toast({ title: 'Receta eliminada', status: 'info' });
  
    if (location.pathname === '/') {
      // fuerza una recarga de recetas sin redirigir
      window.dispatchEvent(new Event('recetaEliminada'));
    } else {
      window.location.reload();
    }
    
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      textAlign="center"
      bg="white"
      position="relative"
    >
      <Box fontSize="40px" mb={2}>
        {receta.icono || <FaUtensils />}
      </Box>

      <Heading size="md" mb={2}>{receta.titulo}</Heading>
      <Text fontSize="sm" color="gray.600">Tipo: {receta.tipo}</Text>
      <Text fontSize="sm" color="gray.600" mb={2}>Dificultad: {receta.dificultad}</Text>
      
      <VStack spacing={2}>
        <IconButton
          icon={<FaHeart />}
          aria-label="Guardar en favoritos"
          colorScheme={favorito ? 'red' : 'gray'}
          variant="outline"
          onClick={handleGuardar}
        />
        <Flex position="absolute" top={2} right={2} gap={2}>
          <IconButton
            icon={<FaPen />}
            aria-label="Editar receta"
            colorScheme="blue"
            variant="ghost"
            onClick={() => navigate(`/editar-receta/${receta.id}`)}
          />
          <IconButton
            icon={<FaTrash />}
            aria-label="Eliminar receta"
            colorScheme="red"
            variant="ghost"
            onClick={handleEliminar}
          />
        </Flex>
      
        
        <Button
          as={RouterLink}
          to={`/receta/${receta.id}`}
          colorScheme="green"
          size="sm"
          mt={2}
          variant="outline"
        >
          Ver detalles
        </Button>

      </VStack>
    </Box>
  );
};

export default RecipeCard;
