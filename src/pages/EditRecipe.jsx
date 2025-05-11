import {
  Box, Heading, VStack, Input, Button, useToast, Select, HStack, Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRecipes } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const EditRecipe = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    titulo: '',
    tipo: '',
    dificultad: '',
    icono: ''
  });

  const [ingredientes, setIngredientes] = useState([]);
  const [ingredienteInput, setIngredienteInput] = useState('');

  useEffect(() => {
    const recetas = getRecipes();
    const recetaEdit = recetas.find(r => r.id === parseInt(id));
    if (recetaEdit) {
      setForm({
        titulo: recetaEdit.titulo,
        tipo: recetaEdit.tipo,
        dificultad: recetaEdit.dificultad,
        icono: recetaEdit.icono
      });
      setIngredientes(recetaEdit.ingredientes || []);
    }
  }, [id]);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarIngrediente = () => {
    const limpio = ingredienteInput.trim();
    if (limpio && !ingredientes.includes(limpio)) {
      setIngredientes([...ingredientes, limpio]);
      setIngredienteInput('');
    }
  };
  
  const eliminarIngrediente = (ing) => {
    setIngredientes(ingredientes.filter(i => i !== ing));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.icono) {
      toast({ title: 'Selecciona un ícono para la receta.', status: 'warning' });
      return;
    }

    if (!form.titulo || !form.tipo || !form.dificultad || ingredientes.length === 0) {
      toast({ title: 'Todos los campos son obligatorios.', status: 'warning' });
      return;
    }

    const nuevaReceta = {
      id: Date.now(),
      titulo: form.titulo,
      tipo: form.tipo,
      dificultad: form.dificultad,
      icono: form.icono,
      ingredientes,
    };
    const recetas = getRecipes();
    const actualizadas = recetas.map(r =>
      r.id === parseInt(id) ? { ...nuevaReceta, id: parseInt(id) } : r
    );
    localStorage.setItem('recetas', JSON.stringify(actualizadas));

    toast({ title: 'Receta actualizada con éxito.', status: 'success' });
    navigate('/');
  };

  const iconosDisponibles = ['🍲', '🥗', '🍕', '🥑', '🍣', '🍔', '🍜', '🍞'];

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Heading mb={6}>Agregar Nueva Receta</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            name="titulo"
            placeholder="Título de la receta"
            value={form.titulo}
            onChange={handleChange}
          />
          <Box w="100%">
            <Text fontWeight="medium" mb={1}>Selecciona un ícono:</Text>
            <HStack spacing={3} flexWrap="wrap">
              {iconosDisponibles.map((icono, idx) => (
                <Box
                  key={idx}
                  fontSize="2xl"
                  cursor="pointer"
                  p={2}
                  borderRadius="md"
                  border={form.icono === icono ? '2px solid green' : '1px solid lightgray'}
                  onClick={() => setForm({ ...form, icono })}
                  _hover={{ bg: 'gray.100' }}
                >
                  {icono}
                </Box>
              ))}
            </HStack>
          </Box>

          <Select
            name="tipo"
            placeholder="Selecciona tipo de dieta"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="vegana">Vegana</option>
            <option value="keto">Keto</option>
            <option value="baja en carbohidratos">Baja en Carbohidratos</option>
          </Select>
          <Select
            name="dificultad"
            placeholder="Nivel de dificultad"
            value={form.dificultad}
            onChange={handleChange}
          >
            <option value="fácil">Fácil</option>
            <option value="media">Media</option>
            <option value="difícil">Difícil</option>
          </Select>
          <VStack align="stretch" spacing={2} width="100%">
            <HStack>
              <Input
                placeholder="Agregar ingrediente"
                value={ingredienteInput}
                onChange={(e) => setIngredienteInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregarIngrediente())}
              />
              <Button onClick={agregarIngrediente}>Agregar</Button>
            </HStack>

            <HStack wrap="wrap">
              {ingredientes.map((ing, idx) => (
                <Box
                  key={idx}
                  bg="green.100"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                >
                  {ing}
                  <Button
                    onClick={() => eliminarIngrediente(ing)}
                    ml={2}
                    size="xs"
                    colorScheme="red"
                    variant="ghost"
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </HStack>
          </VStack>

          <Button type="submit" colorScheme="green" width="100%">
            Guardar Receta
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditRecipe;
