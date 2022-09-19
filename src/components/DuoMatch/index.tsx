import { useState } from "react";
import {
    View,
    Modal,
    ModalProps,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";

import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCop, setIsCop] = useState(false);
    async function handleCopDiscord() {
        setIsCop(true);
        await Clipboard.setImageAsync(discord);
        Alert.alert("Discord Copiado!", "Copiado para area de transferencia!");
        setIsCop(false);
    }

    return (
        <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
            <View style={styles.constainer}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    ></TouchableOpacity>
                    <MaterialIcons
                        name="close"
                        weight="bold"
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                    />
                    <Heading
                        title="Let's play"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} />
                    <Text style={styles.label}>Adicione seu discord</Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopDiscord}
                        disabled={isCop}
                    >
                        <Text style={styles.discord}>
                            {isCop ? (
                                <ActivityIndicator
                                    color={THEME.COLORS.PRIMARY}
                                />
                            ) : (
                                discord
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
