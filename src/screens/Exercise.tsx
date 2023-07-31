import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDTO>(
    {} as ExerciseDTO
  );
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails(id: string) {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${id}`);
      setExerciseDetails(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post("/history", {
        exercise_id: exerciseId,
      });

      toast.show({
        title: "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate("history");
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails(exerciseId);
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
            flexShrink={1}
          >
            {exerciseDetails.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`,
                }}
                alt={exerciseDetails.name}
                resizeMode="cover"
                rounded="lg"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml="2">
                    {exerciseDetails.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml="2">
                    {exerciseDetails.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
            </Box>
            <Button
              title="Marcar como realizado"
              isLoading={sendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
