import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView,StyleSheet,} from 'react-native';
import { Colors } from '@/themes/Colors';

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

const PokedexScreen = () => {
  const [tabActivo, setTabActivo] = useState<'Datos' | 'Pokémons'>('Datos');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();

      const detalles: Pokemon[] = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );

      setPokemons(detalles);
    } catch (error) {
      console.error('Error al cargar los pokémons', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabActivo === 'Pokémons') {
      fetchPokemons();
    }
  }, [tabActivo]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pokédex de Usuario</Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setTabActivo('Datos')} style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                tabActivo === 'Datos' && styles.tabTextActive,
              ]}
            >
              Datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabActivo('Pokémons')} style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                tabActivo === 'Pokémons' && styles.tabTextActive,
              ]}
            >
              Pokémons
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido */}
        {tabActivo === 'Datos' ? (
          <View>
            <Text style={styles.infoText}>Tableros jugados: 12</Text>
            <Text style={styles.infoText}>Racha Carrusel: 6</Text>
            <Text style={styles.infoText}>Máxima Puntuación: 1438</Text>
          </View>
        ) : (
          <ScrollView style={styles.scroll}>
            {loading ? (
              <Text style={styles.infoText}>Cargando...</Text>
            ) : (
              pokemons.map((pokemon) => (
                <View key={pokemon.id} style={styles.pokemonCard}>
                  <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={styles.pokemonImage}
                  />
                  <Text style={styles.pokemonName}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default PokedexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Fondo,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.Fondo,
    padding: 20,
  },
  title: {
    fontFamily: 'Pixel',
    fontSize: 18,
    color: Colors.blanco,
    marginBottom: 10,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    marginHorizontal: 16,
  },
  tabText: {
    fontFamily: 'Pixel',
    fontSize: 16,
    color: Colors.blanco,
  },
  tabTextActive: {
    color: Colors.blanco,
    textDecorationLine: 'underline',
  },
  infoText: {
    color: Colors.blanco,
    fontFamily: 'Pixel',
    marginBottom: 8,
  },
  scroll: {
    maxHeight: 300,
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Botones,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  pokemonImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  pokemonName: {
    fontFamily: 'Pixel',
    color: Colors.blanco,
    fontSize: 14,
  },
});
