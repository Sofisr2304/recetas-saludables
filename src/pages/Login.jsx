import {
  Box, Input, Button, Heading, VStack, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { loginUser } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Text, Link } from '@chakra-ui/react';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const success = loginUser(form);
    if (success) {
      toast({ title: 'Bienvenido/a', status: 'success' });
      navigate('/');
    } else {
      toast({ title: 'Credenciales inválidas', status: 'error' });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Iniciar Sesión</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input name="email" type="email" placeholder="Correo" onChange={handleChange} />
          <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
          <Button colorScheme="green" type="submit" width="100%">Iniciar Sesión</Button>
          <Text fontSize="sm">
            ¿No tienes cuenta?{' '}
            <Link as={RouterLink} to="/registro" color="green.600" fontWeight="medium">
              Regístrate
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
