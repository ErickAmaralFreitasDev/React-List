import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Produto } from '../components/Produto';
import GestorDados from '../services/GestorDados';
import { styles } from '../styles/CommonStyles';

export default function ProdutoForm() {
  const gestor = new GestorDados();
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const salvar = () => {
    const prodAux = new Produto(
      parseInt(codigo),
      nome,
      parseInt(quantidade)
    );
    gestor.adicionar(prodAux).then(() => {
      router.push('/');   // volta para a lista
    });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Codigo"
        keyboardType="numeric"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonTextBig}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}