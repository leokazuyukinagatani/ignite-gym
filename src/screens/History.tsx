import { Heading, SectionList, Text, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { useState } from "react";

const EMPTY_MESSAGE =
  "Não há exercícios registrados ainda," + "Vamos fazer exercícios hoje?";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "27.07.2023",
      data: ["Exercício 1 - 10 Repetição", "Exercício 1 - 5 Repetição"],
    },
    {
      title: "27.07.2023",
      data: ["Exercício 1 - 10 Repetição", "Exercício 1 - 5 Repetição"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercicios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.300"
            fontSize="md"
            mt={10}
            mb={3}
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={
          <Text color="gray.100" textAlign="center">
            {EMPTY_MESSAGE}
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
