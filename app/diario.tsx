import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, FlatList, ActivityIndicator, Alert, RootTagContext } from 'react-native';
import { Colors } from '@/themes/Colors';
import { useNavigation } from '@react-navigation/native';

const allLabels = [
    'Agua', 'Fuego', 'Planta', 'Eléctrico', 'Hielo', 'Tierra', 'Bicho', 'Fantasma',
    'Roca', 'Acero', 'Dragón', 'Hada', 'Lucha', 'Normal', 'Veneno', 'Psíquico', 'Siniestro', 'Volador',
    'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Teselia', 'Kalos', 'Alola', 'Galar', 'Paldea'
];

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
    const regions = ['Kanto','Johto','Hoenn','Sinnoh','Teselia','Kalos','Alola','Galar','Paldea'];

    type TipoPokemon = 'fuego' | 'agua' | 'planta' | 'bicho' | 'hielo' | 'tierra' | 'roca' | 'acero' | 'dragon' | 'hada' | 'lucha' | 'normal' | 'veneno' | 'psiquico' | 'siniestro' | 'volador' | 'fantasma' | 'electrico' |
                        'fire' | 'water' | 'grass' | 'bug' | 'ice'     | 'ground' | 'rock' | 'steel' | 'dragon' | 'fairy'| 'fighting' | 'normal' | 'poison' | 'psychic'  | 'dark'      | 'flying' | 'ghost'    | 'electric';

    const tiposCombinables: { [key:string]: TipoPokemon[] } = {
        'fuego': ['planta', 'bicho', 'hielo','dragon','electrico','lucha','fantasma','tierra','normal','volador','veneno','psiquico','roca','agua','siniestro','acero'],
        'agua': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','lucha','siniestro','acero','hada'],
        'planta': ['bicho','dragon','electrico','lucha','fuego','fantasma','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
        'bicho': ['electrico', 'lucha','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
        'hielo': ['agua', 'planta','bicho','dragon','electrico','lucha','fuego','fantasma','tierra','volador','psiquico','roca','siniestro','acero','hada'],
        'tierra': ['bicho','dragon','electrico','lucha','fuego','fantasma','planta','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero'],
        'roca': ['bicho','dragon','electrico','fuego','lucha','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','acero','hada'],
        'acero': ['lucha', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','hada'],
        'dragon': ['electrico','lucha','fuego','fantasma','planta','tierra','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada'],
        'hada': ['normal', 'roca','bicho','dragon','electrico','fantasma','planta','hielo','volador','veneno','psiquico','agua','siniestro','acero','lucha'],
        'lucha': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','siniestro','acero','hada'],
        'normal': ['bicho','electrico','lucha','fuego','fantasma','planta','tierra','volador','veneno','psiquico','agua','siniestro','hada'],
        'veneno': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','volador','lucha','psiquico','agua','siniestro','acero','hada'],
        'psiquico': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'siniestro': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','psiquico','agua','lucha','acero','hada'],
        'volador': ['bicho','dragon','electrico','lucha','fuego','fantasma','planta','tierra','hielo','normal','veneno','psiquico','roca','agua','siniestro','acero','hada'],
        'fantasma':['bicho','dragon','electrico','lucha','fuego','planta','tierra','hielo','normal','volador','veneno','psiquico','agua','siniestro','acero','hada'],
        'electrico':['bicho','dragon','lucha','fuego','fantasma','planta','tierra','hielo','normal','volador','veneno','psiquico','roca','agua','siniestro','acero','hada']
    };
    
    const regionesPosibles: { [key:string]: string[] } = {
        'Kanto': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Johto': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Hoenn': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Sinnoh': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Teselia': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Kalos': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Alola': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Galar': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
        'Paldea': ['normal', 'roca','bicho','dragon','electrico','fuego','fantasma','planta','tierra','hielo','volador','veneno','lucha','agua','siniestro','acero','hada'],
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

    const handleSearch = async () => {
        if (!query) return;
        const filtered = allPokemonNames.filter(name =>
            name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };
    

    const handleSelect = async (pokemon: any, regions: string[], leftLabels: string[], topLabels: string[]) => {
    if (selectedIndex === null) return;

    const row = Math.floor(selectedIndex / 3);
    const col = selectedIndex % 3;

    const labelFila = leftLabels[row];
    const labelColumna = topLabels[col];

    const tiposEspanolIngles: { [key: string]: string } = {
        'Agua': 'water', 'Fuego': 'fire', 'Planta': 'grass', 'Eléctrico': 'electric',
        'Hielo': 'ice', 'Tierra': 'ground', 'Bicho': 'bug', 'Fantasma': 'ghost',
        'Roca': 'rock', 'Acero': 'steel', 'Dragón': 'dragon', 'Hada': 'fairy',
        'Lucha': 'fighting', 'Normal': 'normal', 'Veneno': 'poison', 'Psíquico': 'psychic',
        'Siniestro': 'dark', 'Volador': 'flying',
    };

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
        'generation-ix': 'Paldea'
    };

    const regionPokemon = genToRegion[generation];
    const tiposPokemon = pokemon.types.map((t: any) => t.type.name.toLowerCase());

    const filaEsRegion = regions.includes(labelFila);
    const columnaEsRegion = regions.includes(labelColumna);

    let valido = false;

    if (filaEsRegion && columnaEsRegion) {
        valido = false;
    } else if (filaEsRegion || columnaEsRegion) {
        const tipo = filaEsRegion ? tiposEspanolIngles[labelColumna] : tiposEspanolIngles[labelFila];
        const region = filaEsRegion ? labelFila : labelColumna;
        valido = tiposPokemon.includes(tipo) && regionPokemon === region;
    } else {
        const tipo1 = tiposEspanolIngles[labelFila];
        const tipo2 = tiposEspanolIngles[labelColumna];
        valido = tiposPokemon.includes(tipo1) && tiposPokemon.includes(tipo2);
    }

    // Si el Pokémon no es válido, muestra el modal de error y no hace nada más
    if (!valido) {
        setErrorModal({ visible: true, message: `Este Pokémon no cumple con los requisitos:\n• ${labelFila}\n• ${labelColumna}` });
        return;
    }

    // Si el Pokémon es válido, actualiza el tablero
    const newBoard = [...board];
    newBoard[row][col] = pokemon;
    setBoard(newBoard);

    // Verifica si el tablero está completo y muestra el modal de victoria si es necesario
    if (isBoardComplete()) {
        setVictoryModalVisible(true);
    }

    // Actualiza el sprite del Pokémon seleccionado
    const sprite = pokemon.sprites.front_default;
    if (sprite) {
        setSprites(prev => ({
            ...prev,
            [selectedIndex]: sprite
        }));
    }

    // Cierra el modal de búsqueda al seleccionar un Pokémon
    setModalVisible(false);
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
                <Text style={styles.scoreText}>Puntuación: 898</Text>
                <Image source={require('../assets/images/tfg/masterball.png')} style={styles.scoreIcon} />
            </View>

            <View style={styles.gridContainer}>
                <View style={styles.row}>
                    <View style={styles.corner} />
                    {topLabels.map((label, idx) => (
                        <View key={idx} style={styles.labelCell}>
                            <Text style={styles.typeLabel}>{label}</Text>
                        </View>
                    ))}
                </View>

                {Array.from({ length: 3 }).map((_, rowIdx) => (
                    <View key={rowIdx} style={styles.row}>
                        <Text style={styles.typeLabel}>{leftLabels[rowIdx]}</Text>
                        {Array.from({ length: 3 }).map((_, colIdx) => {
                            const index = rowIdx * 3 + colIdx;
                            return (
                                <TouchableOpacity key={colIdx} style={styles.cell} onPress={() => handleCellPress(index)}>
                                    {sprites[index] && (
                                        <Image source={{ uri: sprites[index] }} style={{ width: 80, height: 80 }} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.surrenderButton} onPress={() => navigation.goBack()}>
                <Text style={styles.surrenderText}>Rendirse</Text>
            </TouchableOpacity>

            {/* Modal de búsqueda */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, backgroundColor: Colors.Fondo, padding: 20 }}>
                    <Text style={{ color: Colors.blanco, fontSize: 20, fontFamily: 'Pixel',marginTop:10 }}>Buscar Pokémon</Text>
                    <TextInput
                        style={{ backgroundColor: Colors.blanco, marginVertical: 35, borderRadius: 10, paddingHorizontal: 10,fontFamily:'Pixel',height:50,fontSize:18}}
                        placeholder="Nombre del Pokémon"
                        onChangeText={(text) => {
                            setQuery(text);
                            const filtered = allPokemonNames.filter(name =>
                                name.toLowerCase().includes(text.toLowerCase())
                            ).slice(0, 10); // solo los primeros 10
                        
                            setResults(filtered);
                        
                            filtered.forEach(async (name) => {
                                if (!pokemonSprites[name]) {
                                    try {
                                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                                        const data = await res.json();
                                        setPokemonSprites(prev => ({
                                            ...prev,
                                            [name]: data.sprites.front_default
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
                            width:150,
                            backgroundColor: Colors.Botones_menu,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            marginLeft:115,
                            marginBottom:40
                        }}
                        onPress={() => setModalVisible(false)}
                        >
                        <Text style={{
                            color: Colors.blanco,
                            fontSize: 18,
                            fontFamily: 'Pixel',
                        }}>
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
                                    <Image source={{ uri: pokemonSprites[item] }} style={{ width: 80, height: 80}} />
                                )}
                                <Text style={styles.typeLabel2}>{item}</Text>
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
                <View style={{flex: 1,backgroundColor: 'rgba(0, 0, 0, 0.5)',justifyContent: 'center',alignItems: 'center',}}>
                    <View style={{backgroundColor: Colors.Fondo,padding: 24,borderRadius: 20,borderColor: Colors.Tablero,borderWidth: 2,maxWidth: '80%'}}>
                        <Text style={{fontFamily: 'Pixel',fontSize: 16,color: Colors.blanco,textAlign: 'center',marginBottom: 16}}>
                            {errorModal.message}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setErrorModal({ visible: false, message: '' })}
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
                            }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*Modal de victoria*/}
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
    const regions: string[] = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Teselia', 'Kalos', 'Alola', 'Galar', 'Paldea'];
    const tipos: string[] = ['Agua', 'Fuego', 'Planta', 'Eléctrico', 'Hielo', 'Tierra', 'Bicho', 'Fantasma', 'Roca', 'Acero', 'Dragón', 'Hada', 'Lucha', 'Normal', 'Veneno', 'Psíquico', 'Siniestro', 'Volador'];

    const copiaRegions = [...regions];
    const copiaTipos = [...tipos];

   
    const incluirRegion = Math.random() < 0.4; // probabilidad de que haya regiones

    const filasTienenRegiones = Math.random() < 0.5; // Si hay regiones, filas o columnas

    let topLabels: string[] = [];
    let leftLabels: string[] = [];

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (incluirRegion) {
        if (filasTienenRegiones) {
            const left = [];

            const numRegiones = Math.random() < 0.5 ? 1 : 2; // 1 o 2 regiones
            for (let i = 0; i < numRegiones; i++) {
                const index = Math.floor(Math.random() * copiaRegions.length);
                left.push(copiaRegions.splice(index, 1)[0]);
            }

            while (left.length < 3) {
                const index = Math.floor(Math.random() * copiaTipos.length);
                left.push(copiaTipos.splice(index, 1)[0]);
            }

            leftLabels = shuffleArray(left);

            while (topLabels.length < 3) {
                const index = Math.floor(Math.random() * copiaTipos.length);
                topLabels.push(copiaTipos.splice(index, 1)[0]);
            }

        } else {
            const top = [];

            const numRegiones = Math.random() < 0.5 ? 1 : 2;
            for (let i = 0; i < numRegiones; i++) {
                const index = Math.floor(Math.random() * copiaRegions.length);
                top.push(copiaRegions.splice(index, 1)[0]);
            }

            while (top.length < 3) {
                const index = Math.floor(Math.random() * copiaTipos.length);
                top.push(copiaTipos.splice(index, 1)[0]);
            }

            topLabels = shuffleArray(top);

            while (leftLabels.length < 3) {
                const index = Math.floor(Math.random() * copiaTipos.length);
                leftLabels.push(copiaTipos.splice(index, 1)[0]);
            }
        }
    } else {
        // No hay regiones, todo tipos
        while (topLabels.length < 3) {
            const index = Math.floor(Math.random() * copiaTipos.length);
            topLabels.push(copiaTipos.splice(index, 1)[0]);
        }
        while (leftLabels.length < 3) {
            const index = Math.floor(Math.random() * copiaTipos.length);
            leftLabels.push(copiaTipos.splice(index, 1)[0]);
        }
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
        margin: 8,
        marginRight: 10
    }
});
