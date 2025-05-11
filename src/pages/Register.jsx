import {
  Box, Input, Button, Heading, VStack, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { registerUser, getUsers } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { nombre, email, password, confirmPassword } = form;

    if (!nombre || !email || !password || !confirmPassword) {
      toast({ title: 'Todos los campos son obligatorios', status: 'warning' });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: 'Las contraseñas no coinciden', status: 'error' });
      return;
    }

    const existe = getUsers().some(u => u.email === email);
    if (existe) {
      toast({ title: 'El usuario ya existe', status: 'error' });
      return;
    }

    registerUser({ nombre, email, password });
    toast({ title: 'Registro exitoso', status: 'success' });
    navigate('/login');
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Crear Cuenta</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input name="nombre" placeholder="Nombre" onChange={handleChange} />
          <Input name="email" type="email" placeholder="Correo" onChange={handleChange} />
          <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
          <Input name="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={handleChange} />
          <Button colorScheme="green" type="submit" width="100%">Registrarse</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
