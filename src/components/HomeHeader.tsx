import { TouchableOpacity } from "react-native";

import { useAuth } from "@hooks/useAuth";

import { HStack, Heading, Icon, Text, VStack } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import defaultAvatar from "@assets/userPhotoDefault.png";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        size={16}
        source={user.avatar ? { uri: user.avatar } : defaultAvatar}
        alt="Imagem do Perfil do Github"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily='heading'>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
          onPress={signOut}
          _dark={{ color: "gray.300" }}
        />
      </TouchableOpacity>
    </HStack>
  );
}
