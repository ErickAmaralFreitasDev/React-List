import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import GestorDados from '../services/GestorDados';
import ProdutoItem from '../components/ProdutoItem';
import { Produto } from '../components/Produto';
import { styles } from '../styles/CommonStyles';
import ProdutoForm from './ProdutoForm';

export default function ProdutoLista() {
  const gestor = new GestorDados();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // useFocusEffect substitui o useIsFocused no Expo Router
  useFocusEffect(
    useCallback(() => {
      gestor.obterTodos().then((objs) => setProdutos(objs));
    }, [])
  );

  const myKeyExtractor = (item: Produto) => {
    return item.codigo.toString();
  };

  const excluirProduto = async (codigo: number) => {
    await gestor.remover(codigo);
    const objs = await gestor.obterTodos();
    setProdutos(objs);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ProdutoForm')}
      >
        <Text style={styles.buttonTextBig}>Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.scrollContainer}
        data={produtos}
        contentContainerStyle={styles.itemsContainer}
        keyExtractor={myKeyExtractor}
        renderItem={({ item }) => (
          <ProdutoItem
            onDelete={() => excluirProduto(item.codigo)}
            produto={item}
          />
        )}
      />
    </View>
  );
}