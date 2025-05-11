import { Box, Flex, Heading, Input, Spacer, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi'; // asegúrate de tener react-icons instalado


const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsuario(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUsuario(null);
    navigate('/login');
  };

  return (
    <Box bg="green.500" px={6} py={4} color="white" boxShadow="md">
      <Flex direction={['column', 'row']} align="center" justify="space-between" gap={4}>
        {/* Logo o título */}
        <Heading size="md" as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          Recetas Saludables
        </Heading>

        {/* Navegación */}
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'underline' }}>
            Inicio
          </Link>
          <Link as={RouterLink} to="/busqueda" _hover={{ textDecoration: 'underline' }}>
            Buscar
          </Link>
          <Link as={RouterLink} to="/favoritos" _hover={{ textDecoration: 'underline' }}>
            Favoritos
          </Link>
          <Link as={RouterLink} to="/nueva-receta" _hover={{ textDecoration: 'underline' }}>
            Crear Receta
          </Link>
          {usuario ? (
              <HStack spacing={3}>
                <Text fontWeight="medium">Hola, {usuario.nombre}</Text>
                <Button
                  size="sm"
                  variant="ghost"
                  color="white"
                  leftIcon={<FiLogOut />}
                  _hover={{ bg: 'whiteAlpha.300' }}
                  onClick={handleLogout}
                >
                  Cerrar
                </Button>
              </HStack>
            ) : (
              <Link as={RouterLink} to="/login" _hover={{ textDecoration: 'underline' }}>
                Iniciar Sesión
              </Link>
            )
          }
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
