import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, FlatList, ActivityIndicator, Alert, RootTagContext,ImageBackground } from 'react-native';
import { Colors } from '@/themes/Colors';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const tiposCombinables: { [key:string]: string[] } = {
    'fuego': ['planta', 'bicho', 'hielo','dragon','electrico','lucha','fantasma','tierra','normal','volador','veneno','psiquico','roca','agua','siniestro','acero'],
    'agua': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','lucha','siniestro','acero','hada'],
    'planta': ['bicho','dragon','electrico','lucha','fuego','fantasma','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
    'bicho': ['electrico', 'lucha','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
    'hielo': ['agua', 'planta','bicho','dragon','electrico','lucha','fuego','fantasma','tierra','volador','psiquico','roca','siniestro','acero','hada'],
    'tierra': ['bicho','dragon','electrico','lucha','fuego','fantasma','planta','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero'],
    'roca': ['bicho','dragon','electrico','fuego','lucha','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','acero','hada'],
    'acero': ['lucha','roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','hada'],
    'dragon': ['electrico','lucha','fuego','fantasma','planta','tierra','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
    'hada': ['normal', 'roca','bicho','dragon','electrico','fantasma','planta','hielo','volador','veneno','psiquico','agua','siniestro','acero','lucha'],
    'lucha': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','acero','hada'],
    'normal': ['electrico','lucha','fuego','fantasma','planta','tierra','volador','veneno','psiquico','agua','siniestro','hada'],
    'veneno': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','volador','lucha','psiquico','agua','siniestro','acero','hada'],
    'psiquico': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
    'siniestro': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','lucha','acero','hada'],
    'volador': ['bicho','dragon','electrico','lucha','fuego','fantasma','planta','tierra','hielo','normal','veneno','psiquico','roca','agua','siniestro','acero','hada'],
    'fantasma':['bicho','dragon','electrico','lucha','fuego','planta','tierra','hielo','normal','volador','veneno','psiquico','agua','siniestro','acero','hada'],
    'electrico':['bicho','dragon','lucha','fuego','fantasma','planta','tierra','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada']
};

const regionesPosibles: { [key:string]: string[] } = {
    'Kanto': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','acero'],
    'Johto': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero'],
    'Hoenn': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero'],
    'Sinnoh': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero'],
    'Teselia': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero'],
    'Kalos': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
    'Alola': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
    'Galar': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
    'Paldea': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
    'Hisui': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada']
};

const typeStyles: Record<string, { backgroundColor: string; color: string }> = {
    fuego: { backgroundColor: '#F08030', color: '#fff' },
    planta: { backgroundColor: '#78C850', color: '#fff' },
    agua: { backgroundColor: '#6890F0', color: '#fff' },
    electrico: { backgroundColor: '#F8D030', color: '#000' },
    hielo: { backgroundColor: '#98D8D8', color: '#000' },
    lucha: { backgroundColor: '#C03028', color: '#fff' },
    veneno: { backgroundColor: '#A040A0', color: '#fff' },
    tierra: { backgroundColor: '#E0C068', color: '#000' },
    volador: { backgroundColor: '#A890F0', color: '#000' },
    psiquico: { backgroundColor: '#F85888', color: '#fff' },
    bicho: { backgroundColor: '#A8B820', color: '#000' },
    roca: { backgroundColor: '#B8A038', color: '#fff' },
    fantasma: { backgroundColor: '#705898', color: '#fff' },
    dragon: { backgroundColor: '#7038F8', color: '#fff' },
    siniestro: { backgroundColor: '#705848', color: '#fff' },
    acero: { backgroundColor: '#B8B8D0', color: '#000' },
    hada: { backgroundColor: '#EE99AC', color: '#000' },
    normal: { backgroundColor: '#A8A878', color: '#000' },
    'g-max':{backgroundColor: '#920C2C',color:'#fff'},
  };

  const inicializaTableroVacio = () => {
    return Array(3).fill(null).map(() => Array(3).fill(null));
  };

  const getBallImage = (score: number) => {
    if (score >= 1000) {
      return require('../assets/images/tfg/masterball.png');
    } else if (score >= 700) {
      return require('../assets/images/tfg/ultraball.png');
    } else if (score >= 400) {
      return require('../assets/images/tfg/superball.png');
    } else {
      return require('../assets/images/tfg/pokeball.png');
    }
  };

export default function Diario() {
    const navigation = useNavigation();
    const [topLabels, setTopLabels] = useState<string[]>([]);
    const [leftLabels, setLeftLabels] = useState<string[]>([]);
    const [sprites, setSprites] = useState<{ [key: number]: string }>({});
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState({ visible: false, message: '' });
    const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
    const [pokemonSprites, setPokemonSprites] = useState<{ [name: string]: string }>({});
    const [victoryModalVisible, setVictoryModalVisible] = useState(false);
    const [board, setBoard] = useState(
        Array(3).fill(null).map(() => Array(3).fill(null))
    );
    const regions = ['Kanto','Johto','Hoenn','Sinnoh','Teselia','Kalos','Alola','Galar','Paldea','Hisui'];
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [score, setScore] = useState(0);
    const [remainingTime, setRemainingTime] = useState(120);
    const [timeOutModalVisible, setTimeOutModalVisible] = useState(false);

    useEffect(() => {
    if (!startTime) {
        setStartTime(new Date());
    }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      
        return () => clearInterval(interval); // Limpiar al desmontar
    }, []);

      useEffect(() => {
        if (remainingTime <= 0) {
          setTimeOutModalVisible(true);
        }
    }, [remainingTime]);
      

      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      };
      

    const abrirInfo = (etiqueta: string) => {
        // Normaliza para URL
        const nombre = etiqueta.toLowerCase();
      
        // Puedes personalizar cada ruta
        const urls: Record<string, string> = {
          // Tipos
          fuego: 'https://bulbapedia.bulbagarden.net/wiki/Fire_(type)',
          agua: 'https://bulbapedia.bulbagarden.net/wiki/Water_(type)',
          planta: 'https://bulbapedia.bulbagarden.net/wiki/Grass_(type)',
          volador: 'https://bulbapedia.bulbagarden.net/wiki/Flying_(type)',
          normal: 'https://bulbapedia.bulbagarden.net/wiki/Normal_(type)',
          lucha: 'https://bulbapedia.bulbagarden.net/wiki/Fighting_(type)',
          veneno: 'https://bulbapedia.bulbagarden.net/wiki/Poison_(type)',
          electrico: 'https://bulbapedia.bulbagarden.net/wiki/Electric_(type)',
          tierra: 'https://bulbapedia.bulbagarden.net/wiki/Ground_(type)',
          psiquico:'https://bulbapedia.bulbagarden.net/wiki/Psychic_(type)',
          roca:'https://bulbapedia.bulbagarden.net/wiki/Rock_(type)',
          hielo:'https://bulbapedia.bulbagarden.net/wiki/Ice_(type)',
          bicho:'https://bulbapedia.bulbagarden.net/wiki/Bug_(type)',
          dragon:'https://bulbapedia.bulbagarden.net/wiki/Dragon_(type)',
          fantasma:'https://bulbapedia.bulbagarden.net/wiki/Ghost_(type)',
          siniestro:'https://bulbapedia.bulbagarden.net/wiki/Dark_(type)',
          acero:'https://bulbapedia.bulbagarden.net/wiki/Steel_(type)',
          hada:'https://bulbapedia.bulbagarden.net/wiki/Fairy_(type)',

          // Regiones
          kanto: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Kanto_Pokédex_number',
          johto: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Johto_Pokédex_number',
          hoen: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Hoenn_Pokédex_number_in_Generation_VI',
          sinnoh: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Sinnoh_Pokédex_number',
          teselia: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Unova_Pokédex_number_in_Pokémon_Black_2_and_White_2',
          kalos: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Kalos_Pokédex_number',
          alola: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Alola_Pokédex_number_in_Pokémon_Ultra_Sun_and_Ultra_Moon',
          galar: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Galar_Pokédex_number',
          paldea: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Paldea_Pokédex_number',
          hisui: 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_Hisui_Pokédex_number',

          //especiales
          mega: 'https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution',
          'g-max': 'https://bulbapedia.bulbagarden.net/wiki/Gigantamax'
        };
      
        const url = urls[nombre];
        if (url) {
          Linking.openURL(url);
        } else {
          console.warn('No hay URL para:', etiqueta);
        }
      };
      

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
                const data = await res.json();
                const names = data.results.map((p: any) => p.name);
                setAllPokemonNames(names);
            } catch (e) {
                console.error('Error cargando todos los nombres de Pokémon', e);
            }
        };
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        const { top, left } = ficha_random();
        setTopLabels(top);
        setLeftLabels(left);
    }, []);
    
    const isBoardComplete = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!board[row][col]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleCellPress = (index: number) => {
        setSelectedIndex(index);
        setQuery('');
        setResults([]);
        setModalVisible(true);
    };

    const handleSelect = async (
        pokemon: any,
        regions: string[],
        leftLabels: string[],
        topLabels: string[]
      ) => {
        if (selectedIndex === null) return;
      
        const row = Math.floor(selectedIndex / 3);
        const col = selectedIndex % 3;
      
        const labelFila = leftLabels[row];
        const labelColumna = topLabels[col];
      
        const tiposEspanolIngles: { [key: string]: string } = {
          'Agua': 'water', 'Fuego': 'fire', 'Planta': 'grass', 'Electrico': 'electric',
          'Hielo': 'ice', 'Tierra': 'ground', 'Bicho': 'bug', 'Fantasma': 'ghost',
          'Roca': 'rock', 'Acero': 'steel', 'Dragon': 'dragon', 'Hada': 'fairy',
          'Lucha': 'fighting', 'Normal': 'normal', 'Veneno': 'poison', 'Psiquico': 'psychic',
          'Siniestro': 'dark', 'Volador': 'flying',
        };
      
        const sufijosRegionales: { [key: string]: string } = {
          'Alola': '-alola',
          'Galar': '-galar',
          'Hisui': '-hisui',
          'Paldea': '-paldea',
        };
      
        const sufijosMega: string[] = ['-mega', '-gmax'];
      
        const formatLabel = (label: string) =>
          label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
      
        const formattedFila = formatLabel(labelFila);
        const formattedColumna = formatLabel(labelColumna);
      
        const tipoFila = tiposEspanolIngles[formattedFila];
        const tipoColumna = tiposEspanolIngles[formattedColumna];
      
        const filaEsRegion = regions.includes(formattedFila);
        const columnaEsRegion = regions.includes(formattedColumna);
      
        const speciesRes = await fetch(pokemon.species.url);
        const speciesData = await speciesRes.json();
        const generation = speciesData.generation.name;
      
        const genToRegion: { [key: string]: string } = {
          'generation-i': 'Kanto',
          'generation-ii': 'Johto',
          'generation-iii': 'Hoenn',
          'generation-iv': 'Sinnoh',
          'generation-v': 'Teselia',
          'generation-vi': 'Kalos',
          'generation-vii': 'Alola',
          'generation-viii': 'Galar',
          'generation-ix': 'Paldea',
          'generation-x': 'Hisui',
        };
      
        const regionPokemon = genToRegion[generation];
        const tiposPokemon = pokemon.types.map((t: any) => t.type.name.toLowerCase());
        const nombrePokemon = pokemon.name.toLowerCase();
      
        let valido = false;
      
        const esMegaO_Gmax = sufijosMega.some((sufijo: string) => nombrePokemon.includes(sufijo));
      
        const cumpleConTipos = (tipos: string[]) => {
          return tipos.some((tipo: string) => tipo === tipoFila || tipo === tipoColumna);
        };
      
        const esFormaMega = formattedFila === 'Mega' || formattedColumna === 'Mega';
        const esFormaGmax = formattedFila === 'G-max' || formattedColumna === 'G-max';
      
        if (filaEsRegion && columnaEsRegion) {
          valido = false; // No se permiten combinaciones de dos regiones
        } else if (filaEsRegion || columnaEsRegion) {
          const tipo = filaEsRegion ? tipoColumna : tipoFila;
          const region = filaEsRegion ? formattedFila : formattedColumna;
      
          const sufijoEsperado = sufijosRegionales[region];
          const esFormaRegional = sufijoEsperado && nombrePokemon.includes(sufijoEsperado);
          const esNativoDeRegion = regionPokemon === region;
      
          valido = tiposPokemon.includes(tipo) && (esFormaRegional || esNativoDeRegion);
        } else if (esFormaMega || esFormaGmax) {
          // Casillas especiales que piden Mega o Gmax
          if (esFormaMega && nombrePokemon.includes('-mega')) {
            valido = cumpleConTipos(tiposPokemon);
          } else if (esFormaGmax && nombrePokemon.includes('-gmax')) {
            valido = cumpleConTipos(tiposPokemon);
          } else {
            valido = false;
          }
        } else {
          // Casillas normales (ni Mega ni Gmax)
          valido = cumpleConTipos(tiposPokemon);
        }
      
        // Validaciones extra por forma
        if (esFormaMega && !nombrePokemon.includes('-mega')) {
          valido = false;
        }
      
        if (esFormaGmax && !nombrePokemon.includes('-gmax')) {
          valido = false;
        }
      
        if (!valido) {
          setErrorModal({
            visible: true,
            message: `Este Pokémon no cumple con los requisitos:\n• ${labelFila}\n• ${labelColumna}`
          });
          return;
        }
      
        if (board[row][col]) return;
      
        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - (startTime?.getTime() || 0)) / 1000);
        const totalDuration = 120; // 2 minutos = 120 segundos
        const remainingSeconds = Math.max(0, totalDuration - elapsedSeconds);

        // Calculamos el extra proporcional (por ejemplo: 90s => 1.5)
        const timeMultiplier = remainingSeconds / 60; // para que 60s = 1.0, 120s = 2.0

        // Puntos: 100 base + extra proporcional al tiempo
        const basePoints = 100;
        const extraPoints = Math.floor(timeMultiplier * 100);

        const totalPoints = basePoints + extraPoints;
        setScore(prev => prev + totalPoints);
      
        const newBoard = [...board];
        newBoard[row][col] = pokemon;
        setBoard(newBoard);
      
        if (isBoardComplete()) {
          setVictoryModalVisible(true);
        }
      
        const sprite = pokemon.sprites.front_default;
        if (sprite) {
          setSprites(prev => ({
            ...prev,
            [selectedIndex]: sprite
          }));
        }
      
        setModalVisible(false);
      };
      

      const resetGame = () => {
        setBoard(inicializaTableroVacio());
        setScore(0);
        setStartTime(new Date());
      };
      
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Puzzle diario</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/images/tfg/help.png')} style={styles.infoIcon} />
                </TouchableOpacity>
            </View>
    
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Puntuación: {score}</Text>
                <Image source={getBallImage(score)} style={styles.scoreIcon}/>
                <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
            </View>

    
            <View style={styles.gridContainer}>
                {/* Fila superior con las etiquetas */}
                <View style={styles.row}>
                    <View style={styles.corner} />
                    {topLabels.map((label, idx) => {
                        const tipo = label?.toLowerCase();
                        const style = typeStyles[tipo] || { backgroundColor: '#ccc', color: '#000' };
                        const isMega = tipo === 'mega';

                        return (
                            <TouchableOpacity
                                key={idx}
                                style={{ marginRight: 6, marginBottom: 12, marginLeft: 18 }}
                                onPress={() => abrirInfo(label)}
                            >
                                {isMega ? (
                                    <ImageBackground
                                        source={require('../assets/images/tfg/arcoiris.jpg')}
                                        resizeMode="cover"
                                        style={{
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: 80,
                                        }}
                                        imageStyle={{
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'Pixel',
                                                fontSize: 16,
                                                color: '#000', 
                                                textAlign: 'center',
                                            }}
                                        >
                                            {label}
                                        </Text>
                                    </ImageBackground>
                                ) : (
                                    <Text
                                        style={{
                                            backgroundColor: style.backgroundColor,
                                            color: style.color,
                                            paddingVertical: 6,
                                            borderRadius: 10,
                                            fontFamily: 'Pixel',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            minWidth: 80,
                                        }}
                                    >
                                        {label}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
    
                {/* Fila del tablero con las etiquetas a la izquierda */}
                {Array.from({ length: 3 }).map((_, rowIdx) => (
                    <View key={rowIdx} style={styles.row}>
                        {/* Etiquetas de la izquierda */}
                        <TouchableOpacity
                            onPress={() => abrirInfo(leftLabels[rowIdx])}
                            style={{ marginRight: 5, marginLeft: -6 }}
                        >
                            {leftLabels[rowIdx]?.toLowerCase() === 'mega' ? (
                                <ImageBackground
                                    source={require('../assets/images/tfg/arcoiris.jpg')}
                                    resizeMode="cover"
                                    style={{
                                        width: 95,
                                        paddingVertical: 6,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    imageStyle={{
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Pixel',
                                            fontSize: 16,
                                            color: 'fff',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {leftLabels[rowIdx]}
                                    </Text>
                                </ImageBackground>
                            ) : (
                                <Text
                                    style={{
                                        width: 95,
                                        textAlign: 'center',
                                        backgroundColor: typeStyles[leftLabels[rowIdx]?.toLowerCase()]?.backgroundColor || '#ccc',
                                        color: typeStyles[leftLabels[rowIdx]?.toLowerCase()]?.color || '#000',
                                        paddingVertical: 6,
                                        borderRadius: 10,
                                        fontFamily: 'Pixel',
                                        fontSize: 16,
                                    }}
                                >
                                    {leftLabels[rowIdx] || 'Tipo'}
                                </Text>
                            )}
                        </TouchableOpacity>
    
                        {/* Celdas del tablero */}
                        {Array.from({ length: 3 }).map((_, colIdx) => {
                            const index = rowIdx * 3 + colIdx;
                            const isOccupied = !!sprites[index];

                            return (
                                <TouchableOpacity
                                    key={colIdx}
                                    style={styles.cell}
                                    onPress={() => handleCellPress(index)}
                                    disabled={!!sprites[index]} // desactiva si ya hay un Pokémon
                                    activeOpacity={0.6} // da una sensación táctil suave
                                    >
                                    {sprites[index] && (
                                        <Image source={{ uri: sprites[index] }} style={{ width: 85, height: 85 }} />
                                    )}
                                </TouchableOpacity>
                            );
                            })}
                    </View>
                ))}
            </View>
    
            <TouchableOpacity style={styles.surrenderButton} onPress={() =>{resetGame(); navigation.goBack()} }>
                <Text style={styles.surrenderText}>Rendirse</Text>
            </TouchableOpacity>
    
            {/* Modal de búsqueda */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, backgroundColor: Colors.Fondo, padding: 20 }}>
                    <Text style={{ color: Colors.blanco, fontSize: 20, fontFamily: 'Pixel', marginTop: 10 }}>
                        Buscar Pokémon
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: Colors.blanco,
                            marginVertical: 35,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            fontFamily: 'Pixel',
                            height: 50,
                            fontSize: 18,
                        }}
                        placeholder="Nombre del Pokémon"
                        onChangeText={(text) => {
                            setQuery(text);
                            const filtered = allPokemonNames.filter((name) =>
                                name.toLowerCase().includes(text.toLowerCase())
                            ).slice(0, 20); // cantidad de resultados al buscar
                            setResults(filtered);
    
                            filtered.forEach(async (name) => {
                                if (!pokemonSprites[name]) {
                                    try {
                                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                                        const data = await res.json();
                                        setPokemonSprites((prev) => ({
                                            ...prev,
                                            [name]: data.sprites.front_default,
                                        }));
                                    } catch (e) {
                                        console.error(`Error cargando sprite de ${name}`, e);
                                    }
                                }
                            });
                        }}
                        value={query}
                    />
                    <TouchableOpacity
                        style={{
                            width: 150,
                            backgroundColor: Colors.Botones_menu,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            marginLeft: 115,
                            marginBottom: 40,
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text
                            style={{
                                color: Colors.blanco,
                                fontSize: 18,
                                fontFamily: 'Pixel',
                            }}
                        >
                            Volver
                        </Text>
                    </TouchableOpacity>
    
                    {loading && <ActivityIndicator size="large" color={Colors.Botones_menu} />}
    
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    setLoading(true);
                                    try {
                                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${item}`);
                                        const data = await res.json();
                                        handleSelect(data, regions, leftLabels, topLabels); // Ahora pasamos todos los parámetros necesarios
                                    } catch (e) {
                                        console.error('Error al cargar Pokémon', e);
                                    }
                                    setLoading(false);
                                }}
                                style={[styles.row, { alignItems: 'center', padding: 10 }]}
                            >
                                {pokemonSprites[item] && (
                                    <Image source={{ uri: pokemonSprites[item] }} style={{ width: 80, height: 80 }} />
                                )}
                                <Text style={styles.typeLabel2}>{String(item)}</Text> 
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
    
            {/* Modal de error */}
            <Modal
                visible={errorModal.visible}
                transparent
                animationType="fade"
                onRequestClose={() => setErrorModal({ visible: false, message: '' })}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors.Fondo,
                            padding: 24,
                            borderRadius: 20,
                            borderColor: Colors.Tablero,
                            borderWidth: 2,
                            maxWidth: '80%',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Pixel',
                                fontSize: 16,
                                color: Colors.blanco,
                                textAlign: 'center',
                                marginBottom: 16,
                            }}
                        >
                            {errorModal.message}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setErrorModal({ visible: false, message: '' })}
                            style={{
                                backgroundColor: Colors.Botones_menu,
                                paddingVertical: 8,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                alignSelf: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Pixel',
                                    fontSize: 14,
                                    color: Colors.blanco,
                                }}
                            >
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Modal de victoria */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={victoryModalVisible}
                onRequestClose={() => setVictoryModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Se cambió la opacidad para coincidir con el modal de error
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: Colors.Fondo,
                        padding: 24,
                        borderRadius: 20,
                        borderColor: Colors.Tablero,
                        borderWidth: 2,
                        maxWidth: '80%'
                    }}>
                        <Text style={{
                            fontFamily: 'Pixel',
                            fontSize: 16,
                            color: Colors.blanco,
                            textAlign: 'center',
                            marginBottom: 16
                        }}>
                            ¡Has completado el tablero, buen trabajo!
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setVictoryModalVisible(false);
                                navigation.goBack();
                                resetGame();
                            }}
                            style={{
                                backgroundColor: Colors.Botones_menu,
                                paddingVertical: 8,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                alignSelf: 'center'
                            }}
                        >
                            <Text style={{
                                fontFamily: 'Pixel',
                                fontSize: 14,
                                color: Colors.blanco
                            }}>
                                Volver al Menú
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Modal de tiempo agotado */}
<Modal
    animationType="fade"
    transparent={true}
    visible={timeOutModalVisible}
    onRequestClose={() => setTimeOutModalVisible(false)}
>
    <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <View style={{
            backgroundColor: Colors.Fondo,
            padding: 24,
            borderRadius: 20,
            borderColor: Colors.Tablero,
            borderWidth: 2,
            maxWidth: '80%'
        }}>
            <Text style={{
                fontFamily: 'Pixel',
                fontSize: 16,
                color: Colors.blanco,
                textAlign: 'center',
                marginBottom: 16
            }}>
                ¡Se acabó el tiempo!
            </Text>
            <TouchableOpacity
                onPress={() => {
                    setTimeOutModalVisible(false);
                    navigation.goBack();
                    resetGame();
                }}
                style={{
                    backgroundColor: Colors.Botones_menu,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style={{
                    fontFamily: 'Pixel',
                    fontSize: 14,
                    color: Colors.blanco
                }}>
                    Volver al Menú
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

        </View>
    );
}

const ficha_random = () => {
    const especiales = ['Mega', 'G-max'];
    const regionesBase = Object.keys(regionesPosibles);
    const regionesProbabilidad = [
      ...regionesBase,
      'Mega', 'G-max', 'Mega', 'Mega', 'G-max', 'G-max', 'Mega','Mega', 'G-max', 'Mega', 'Mega', 'G-max', 'G-max', 'Mega' // duplicados solo para aumentar la probabilidad
    ];
    const tipos: string[] = Object.keys(tiposCombinables).map(t =>
      t.charAt(0).toUpperCase() + t.slice(1)
    );
  
    const copiaRegions = [...regionesProbabilidad];
    const copiaTipos = [...tipos];
    const yaIncluidos = new Set<string>();
  
    const incluirRegion = Math.random() < 0.5;
    const filasTienenRegiones = Math.random() < 0.5;
  
    let topLabels: string[] = [];
    let leftLabels: string[] = [];
  
    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const extraerEtiqueta = (arr: string[]): string => {
      while (arr.length > 0) {
        const index = Math.floor(Math.random() * arr.length);
        const etiqueta = arr.splice(index, 1)[0];
        if (especiales.includes(etiqueta)) {
          if (yaIncluidos.has(etiqueta)) continue; // Evita duplicados
          yaIncluidos.add(etiqueta);
        }
        return etiqueta;
      }
      return '';
    };
  
    const esCombinacionValida = (fila: string, columna: string): boolean => {
      if ((fila === 'Mega' && columna === 'G-max') || (fila === 'G-max' && columna === 'Mega')) {
        return false;
      }
  
      const filaLower = fila.toLowerCase();
      const colLower = columna.toLowerCase();
  
      const filaEsRegion = regionesPosibles[fila] !== undefined || especiales.includes(fila);
      const colEsRegion = regionesPosibles[columna] !== undefined || especiales.includes(columna);
  
      if (filaEsRegion && colEsRegion) return false;
  
      if (filaEsRegion) return !especiales.includes(fila) || tiposCombinables[colLower] !== undefined;
      if (colEsRegion) return !especiales.includes(columna) || tiposCombinables[filaLower] !== undefined;
  
      return tiposCombinables[filaLower]?.includes(colLower) ?? false;
    };
  
    if (incluirRegion) {
      if (filasTienenRegiones) {
        const left: string[] = [];
  
        const numRegiones = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < numRegiones; i++) {
          left.push(extraerEtiqueta(copiaRegions));
        }
  
        while (left.length < 3) {
          left.push(extraerEtiqueta(copiaTipos));
        }
  
        leftLabels = shuffleArray(left);
  
        while (topLabels.length < 3) {
          topLabels.push(extraerEtiqueta(copiaTipos));
        }
      } else {
        const top: string[] = [];
  
        const numRegiones = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < numRegiones; i++) {
          top.push(extraerEtiqueta(copiaRegions));
        }
  
        while (top.length < 3) {
          top.push(extraerEtiqueta(copiaTipos));
        }
  
        topLabels = shuffleArray(top);
  
        while (leftLabels.length < 3) {
          leftLabels.push(extraerEtiqueta(copiaTipos));
        }
      }
    } else {
      // Solo tipos
      const todosLosTipos = Object.keys(tiposCombinables);
      const columnas = shuffleArray([...todosLosTipos]).slice(0, 3);
  
      const filasValidas = todosLosTipos.filter(tipo =>
        columnas.every(col => esCombinacionValida(tipo, col))
      );
  
      if (filasValidas.length < 3) return ficha_random();
  
      const filas = shuffleArray(filasValidas).slice(0, 3);
  
      topLabels = columnas.map(t => t.charAt(0).toUpperCase() + t.slice(1));
      leftLabels = filas.map(t => t.charAt(0).toUpperCase() + t.slice(1));
    }
  
    const esCuadriculaValida = leftLabels.every(fila =>
      topLabels.every(col => esCombinacionValida(fila, col))
    );
  
    if (!esCuadriculaValida) {
      return ficha_random();
    }
  
    return { top: topLabels, left: leftLabels };
  };
  

  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fondo,
        padding: 10,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: Colors.blanco,
        fontSize: 32,
        fontFamily: 'Pixel',
    },
    infoIcon: {
        width: 30,
        height: 30,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    scoreText: {
        color: Colors.blanco,
        fontSize: 26,
        fontFamily: 'Pixel',
    },
    scoreIcon: {
        width: 58,
        height: 58,
        marginLeft: 5,
    },
    gridContainer: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    corner: {
        width: 80,
        height: 40,
        justifyContent: 'space-around'
    },
    typeLabel: {
        width: 95,
        textAlign: 'center',
        color: Colors.blanco,
        backgroundColor: Colors.Botones_menu,
        borderRadius: 5,
        fontSize: 18,
        fontFamily: 'Pixel',
    },
    typeLabel2: { 
        flex: 1,
        width: 150,
        textAlign: 'center',
        color: Colors.blanco,
        backgroundColor: Colors.Botones_menu,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: 'Pixel',
        padding:10,
        margin:15
    },
    cell: {
        width: 90,
        height: 90,
        margin: 5,
        backgroundColor: Colors.Botones_menu,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    surrenderButton: {
        alignSelf: 'center',
        backgroundColor: Colors.Botones_menu,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 70,
    },
    surrenderText: {
        color: Colors.blanco,
        fontSize: 22,
        fontFamily: 'Pixel',
    },
    backButton: {
        position: 'absolute',
        bottom: 80,
        left: 20,
    },
    backIcon: {
        width: 40,
        height: 40,
    },
    labelCell: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
        marginLeft:-3        
    },
    disabledCell: {
        opacity: 0.5,
    },
    timerText: {
        fontSize: 25,
        color: 'white',
        marginLeft: 60,
        fontFamily: 'Pixel',
        position: 'absolute', 
        top: 12, 
        right:32,
    },
});
