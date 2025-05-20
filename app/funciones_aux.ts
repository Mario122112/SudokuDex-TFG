import { Linking } from "react-native";

export const tiposCombinables: { [key: string]: string[] } = {
    'fuego': ['planta', 'bicho', 'hielo', 'dragon', 'electrico', 'lucha', 'fantasma', 'tierra', 'normal', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero'],
    'agua': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'lucha', 'siniestro', 'acero', 'hada'],
    'planta': ['bicho', 'dragon', 'electrico', 'lucha', 'fuego', 'fantasma', 'hielo', 'normal', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero', 'hada'],
    'bicho': ['electrico', 'lucha', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero', 'hada'],
    'hielo': ['agua', 'planta', 'bicho', 'dragon', 'electrico', 'lucha', 'fuego', 'fantasma', 'tierra', 'volador', 'psiquico', 'roca', 'siniestro', 'acero', 'hada'],
    'tierra': ['bicho', 'dragon', 'electrico', 'lucha', 'fuego', 'fantasma', 'planta', 'hielo', 'normal', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero'],
    'roca': ['bicho', 'dragon', 'electrico', 'fuego', 'lucha', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'acero', 'hada'],
    'acero': ['lucha', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'hada'],
    'dragon': ['electrico', 'lucha', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'normal', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero', 'hada'],
    'hada': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fantasma', 'planta', 'hielo', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'acero', 'lucha'],
    'lucha': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'acero', 'hada'],
    'normal': ['electrico', 'lucha', 'fuego', 'fantasma', 'planta', 'tierra', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'hada'],
    'veneno': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'volador', 'lucha', 'psiquico', 'agua', 'siniestro', 'acero', 'hada'],
    'psiquico': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada'],
    'siniestro': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'psiquico', 'agua', 'lucha', 'acero', 'hada'],
    'volador': ['bicho', 'dragon', 'electrico', 'lucha', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'normal', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero', 'hada'],
    'fantasma': ['bicho', 'dragon', 'electrico', 'lucha', 'fuego', 'planta', 'tierra', 'hielo', 'normal', 'volador', 'veneno', 'psiquico', 'agua', 'siniestro', 'acero', 'hada'],
    'electrico': ['bicho', 'dragon', 'lucha', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'normal', 'volador', 'veneno', 'psiquico', 'roca', 'agua', 'siniestro', 'acero', 'hada']
};

export const regionesPosibles: { [key: string]: string[] } = {
    'Kanto': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'acero'],
    'Johto': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero'],
    'Hoenn': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero'],
    'Sinnoh': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero'],
    'Teselia': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero'],
    'Kalos': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada'],
    'Alola': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada'],
    'Galar': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada'],
    'Paldea': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada'],
    'Hisui': ['normal', 'roca', 'bicho', 'dragon', 'electrico', 'fuego', 'fantasma', 'planta', 'tierra', 'hielo', 'volador', 'veneno', 'lucha', 'agua', 'siniestro', 'acero', 'hada']
};

export const typeStyles: Record<string, { backgroundColor: string; color: string }> = {
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
    'g-max': { backgroundColor: '#920C2C', color: '#fff' },
};

export const abrirInfo = (etiqueta: string) => {
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
            psiquico: 'https://bulbapedia.bulbagarden.net/wiki/Psychic_(type)',
            roca: 'https://bulbapedia.bulbagarden.net/wiki/Rock_(type)',
            hielo: 'https://bulbapedia.bulbagarden.net/wiki/Ice_(type)',
            bicho: 'https://bulbapedia.bulbagarden.net/wiki/Bug_(type)',
            dragon: 'https://bulbapedia.bulbagarden.net/wiki/Dragon_(type)',
            fantasma: 'https://bulbapedia.bulbagarden.net/wiki/Ghost_(type)',
            siniestro: 'https://bulbapedia.bulbagarden.net/wiki/Dark_(type)',
            acero: 'https://bulbapedia.bulbagarden.net/wiki/Steel_(type)',
            hada: 'https://bulbapedia.bulbagarden.net/wiki/Fairy_(type)',

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