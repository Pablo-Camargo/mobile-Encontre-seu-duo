import { ImageBackground } from "react-native";

import backgroundImg from "../../assets/background-galaxy.png";

import { StyleSheet } from "react-native";
import { THEME } from "../../theme";
interface Props {
    children: React.ReactNode;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLORS.BACKGROUND_800,
    },
});
export function Background({ children }: Props) {
    return (
        <ImageBackground
            source={backgroundImg}
            defaultSource={backgroundImg}
            style={styles.container}
        >
            {children}
        </ImageBackground>
    );
}
export default Background;
