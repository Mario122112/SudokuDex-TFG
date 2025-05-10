import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,Image,ScrollView,StyleSheet, FlatList,} from 'react-native';
import { Colors } from '@/themes/Colors';

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};


const regiones = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
const tipos: Tipo[] = ["fire", "water", "grass", "electric", "psychic", "rock", "ground", "fairy", "ghost", "dragon", "normal", "fighting", "bug", "ice", "poison", "steel", "dark", "flying"];
const especiales = ['mega', 'gmax'];

const tiposTraduccion = {
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  rock: 'Roca',
  ground: 'Tierra',
  fairy: 'Hada',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  normal: 'Normal',
  fighting: 'Lucha',
  bug: 'Bicho',
  ice: 'Hielo',
  poison: 'Veneno',
  steel: 'Acero',
  dark: 'Siniestro',
  flying: 'Volador',
};

type Tipo = keyof typeof tiposTraduccion;


const PokedexScreen = () => {
  const [tabActivo, setTabActivo] = useState<'Datos' | 'Pokémons'>('Datos');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState<string | null>(null);
  const [tipoFiltro, setTipoFiltro] = useState<'region' | 'tipo' | 'especial' | null>(null);
  const [valorFiltro, setValorFiltro] = useState<string | null>(null);
  const [offset, setOffset] = useState(0); // Inicio desde el primer Pokémon
  const [hasMore, setHasMore] = useState(true); // Para saber si quedan más por cargar



  const fetchPokemons = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`);
      const data = await response.json();

      const detalles: Pokemon[] = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );

      setPokemons(prev => [...prev, ...detalles]);
      setOffset(prev => prev + 50);
      if (offset + 50 >= 1300) setHasMore(false);
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

  const pokemonsFiltrados = valorFiltro
  ? pokemons.filter((p) => {
      if (tipoFiltro === 'tipo' && valorFiltro) {
        return p.types?.some((t) => t.type.name === valorFiltro);
      } else if (tipoFiltro === 'especial' && valorFiltro) {
        if (valorFiltro === 'mega') {
          return (
            p.name.includes('-mega') &&
            p.sprites?.front_default // solo si tiene sprite
          );
        }
        if (valorFiltro === 'gmax') {
          return (
            p.name.includes('gmax') &&
            p.sprites?.front_default
          );
        }
      } else if (tipoFiltro === 'region' && valorFiltro) {
        const nombreRegion = valorFiltro.toLowerCase();
        if (nombreRegion === 'kanto') return p.id <= 151;
        if (nombreRegion === 'johto') return p.id > 151 && p.id <= 251;
        if (nombreRegion === 'hoenn') return p.id > 251 && p.id <= 386;
        if (nombreRegion === 'sinnoh') return p.id > 386 && p.id <= 493;
        if (nombreRegion === 'unova') return p.id > 493 && p.id <= 649;
        if (nombreRegion === 'kalos') return p.id > 649 && p.id <= 721;
        if (nombreRegion === 'alola') return p.id > 721 && p.id <= 809;
        if (nombreRegion === 'galar') return p.id > 809 && p.id <= 905;
        if (nombreRegion === 'paldea') return p.id > 905;
        return false;
      }
      return true;
    })
  : pokemons;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pokédex de usuario </Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setTabActivo('Datos')} style={styles.tab}>
            <Text style={[styles.tabText, tabActivo === 'Datos' && styles.tabTextActive]}>
              Datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTabActivo('Pokémons')} style={styles.tab}>
            <Text style={[styles.tabText, tabActivo === 'Pokémons' && styles.tabTextActive]}>
              Pokémons
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fullLine} />

        {/* Contenido */}
        {tabActivo === 'Datos' ? (
          <View>
            <Text style={styles.infoText}>Tableros jugados:</Text>
            <Text style={styles.infoText}>Racha Puzzle Diario:</Text>
            <Text style={styles.infoText}>Racha Carrusel:</Text>
            <Text style={styles.infoText}>Máxima Puntuación:</Text>
            <Text style={styles.infoText}>Max.Puntuación Diario:</Text>
            <Text style={styles.infoText}>Max.Puntuación Carrusel:</Text>
            <Text style={styles.infoText}>Max.Puntuación Libre:</Text>
            <Text style={styles.infoText}>Pokémon favorito:</Text>
            <Text style={styles.infoText}>Progreso Pokedex:</Text>
          </View>
        ) : (
          <>
            {/* Filtros */}
            <View style={styles.filtroContainer}>
              <TouchableOpacity style={styles.filtroBoton} onPress={() => setTipoFiltro((prev) => (prev === 'region' ? null : 'region'))}>
                <Text style={styles.filtroTexto}>Regiones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroBoton} onPress={() => setTipoFiltro((prev) => (prev === 'tipo' ? null : 'tipo'))}>
                <Text style={styles.filtroTexto}>Tipos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroBoton} onPress={() => setTipoFiltro((prev) => (prev === 'especial' ? null : 'especial'))}>
                <Text style={styles.filtroTexto}>Especiales</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.limpiarBoton} onPress={() =>{setTipoFiltro(null); setValorFiltro(null)} }>
                <Image source={require('../assets/images/tfg/filtrar.png')}
                style={styles.clearIcon}></Image>
              </TouchableOpacity>
            </View>

            {tipoFiltro === 'region' && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 10, maxHeight: 60,top:-2,left:-10,height:70}}
                contentContainerStyle={{ alignItems: 'center',paddingLeft: 10}}
              >
                {regiones.map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setValorFiltro(r.toLowerCase())}
                    style={styles.filtroBoton}
                  >
                    <Text style={styles.filtroTexto}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {tipoFiltro === 'tipo' && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 10, maxHeight: 60,height:70,left:-10,top: 5 }}
                contentContainerStyle={{ alignItems: 'center',paddingLeft: 10}}
              >
                {tipos.map((t: Tipo) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setValorFiltro(t)}
                    style={styles.filtroBoton}
                  >
                    <Text style={styles.filtroTexto}>{tiposTraduccion[t]}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}


            {tipoFiltro === 'especial' && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 10, maxHeight: 60,height:70,left:-10,top:5 }}
                contentContainerStyle={{ alignItems: 'center',paddingLeft: 10}}
              >
                {especiales.map((e) => (
                  <TouchableOpacity
                    key={e}
                    onPress={() => setValorFiltro(e)}
                    style={styles.filtroBoton}
                  >
                    <Text style={styles.filtroTexto}>{e}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}


            {/* Sprites */}
            <FlatList
              data={pokemonsFiltrados}
              keyExtractor={(item) => `${item.id}-${item.name}`}
              numColumns={5}
              contentContainerStyle={[styles.pokemonGrid]} 
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.sprites.front_default }}
                  style={styles.pokemonSprite}
                />
              )}
              onEndReached={fetchPokemons}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <Text style={styles.infoText}>Cargando más...</Text> : null}
            />
          </>
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
    flex: 1,
    backgroundColor: Colors.Fondo,
    padding: 10,
  },
  title: {
    fontFamily: 'Pixel',
    fontSize: 30,
    color: Colors.blanco,
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: -20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    marginHorizontal: 50,
    borderBottomColor: Colors.blanco,
  },
  tabText: {
    fontFamily: 'Pixel',
    fontSize: 25,
    color: Colors.blanco,
    margin: 20,
  },
  tabTextActive: {
    color: Colors.blanco,
    textDecorationLine: 'underline',
  },
  infoText: {
    color: Colors.blanco,
    fontFamily: 'Pixel',
    marginVertical: 20,
    fontSize: 20,
    marginLeft: -20,
  },
  fullLine: {
    height: 2,
    backgroundColor: Colors.blanco,
    width: '130%',
    top: -28,
    marginLeft: -50,
  },
  pokemonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop:20,
    paddingBottom:30,
  },
  pokemonSprite: {
    width: 60,
    height: 60,
    margin: 5,
    tintColor: Colors.Botones_menu,
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    gap:10,
  },
  filtroBoton: {
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    height: 40, // asegúrate de que esto sea el mismo en todos
    justifyContent: 'center',
},
  limpiarBoton: {
    backgroundColor: Colors.Iconos,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent:'center'
  },
  filtroTexto: {
  color: 'white',
  fontFamily:'Pixel',
  textTransform: 'capitalize',
},
  clearIcon: {
  width: 20,
  height: 20,
  tintColor: Colors.blanco, // Opcional, solo si quieres aplicar color
},
});
