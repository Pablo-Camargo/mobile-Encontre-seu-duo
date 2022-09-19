import { useEffect, useState } from "react";

import { View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { THEME } from "../../theme";

import { GameParams } from "../../@types/navigation";

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordSelected, setDiscordSelected] = useState("");

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.25.4:3333/adc/${adsId}/discord`)
            .then((resp) => resp.json())
            .then((data) => setDiscordSelected(data.discord));
    }

    useEffect(() => {
        fetch(`http://192.168.25.4:3333/games/${game.id}/ads`)
            .then((resp) => resp.json())
            .then((data) => setDuos(data));
    }, []);
    function heandleGoBack() {
        navigation.goBack();
    }
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={heandleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>
                <Image source={{ uri: game.bannerUrl }} style={styles.banner} />
                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />
                <FlatList
                    data={duos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => getDiscordUser(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                />
                <DuoMatch
                    visible={discordSelected.length > 0}
                    onClose={() => setDiscordSelected("")}
                    discord={discordSelected}
                />
            </SafeAreaView>
        </Background>
    );
}
