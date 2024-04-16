import React, { useState } from "react";
import { Box, Heading, Text, Button, VStack, Input, List, ListItem, Flex, Spacer, Divider, OrderedList } from "@chakra-ui/react";

const values = ["Honesty", "Loyalty", "Respect", "Responsibility", "Compassion", "Courage", "Perseverance", "Integrity", "Gratitude", "Forgiveness", "Humility", "Kindness", "Patience", "Self-discipline", "Tolerance"];

const Index = () => {
  const [step, setStep] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const [valueWins, setValueWins] = useState({});

  const handleStart = () => {
    setStep(2);
  };

  const handleValueSelect = (value) => {
    if (selectedValues.length < 10 && !selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredValues = values.filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCompare = (selectedValue) => {
    const newValueWins = { ...valueWins };
    newValueWins[selectedValue] = (newValueWins[selectedValue] || 0) + 1;
    setValueWins(newValueWins);

    if (comparisonIndex === selectedValues.length - 2) {
      setStep(4);
    } else {
      setComparisonIndex(comparisonIndex + 1);
    }
  };

  const sortedValues = selectedValues.sort((a, b) => (valueWins[b] || 0) - (valueWins[a] || 0));

  return (
    <Box p={8}>
      {step === 1 && (
        <VStack spacing={8}>
          <Heading>Welcome to the Value Rating App!</Heading>
          <Text>This app helps you prioritize your personal values by comparing them against each other.</Text>
          <Button colorScheme="blue" onClick={handleStart}>
            Start Rating
          </Button>
        </VStack>
      )}

      {step === 2 && (
        <VStack spacing={8}>
          <Heading>Select Your Top 10 Values</Heading>
          <Input placeholder="Search values..." value={searchTerm} onChange={handleSearchChange} />
          <List spacing={2}>
            {filteredValues.map((value) => (
              <ListItem key={value} cursor="pointer" onClick={() => handleValueSelect(value)} color={selectedValues.includes(value) ? "blue.500" : "inherit"}>
                {value}
              </ListItem>
            ))}
          </List>
          <Text>Selected Values: {selectedValues.length}/10</Text>
          <Button colorScheme="blue" isDisabled={selectedValues.length < 10} onClick={() => setStep(3)}>
            Next
          </Button>
        </VStack>
      )}

      {step === 3 && (
        <VStack spacing={8}>
          <Heading>Compare Values</Heading>
          <Text>Choose the value that is more important to you in each matchup.</Text>
          <Flex width="100%">
            <Button flex={1} onClick={() => handleCompare(selectedValues[comparisonIndex])}>
              {selectedValues[comparisonIndex]}
            </Button>
            <Spacer />
            <Divider orientation="vertical" />
            <Spacer />
            <Button flex={1} onClick={() => handleCompare(selectedValues[comparisonIndex + 1])}>
              {selectedValues[comparisonIndex + 1]}
            </Button>
          </Flex>
          <Text>
            Comparison {comparisonIndex + 1}/{selectedValues.length - 1}
          </Text>
        </VStack>
      )}

      {step === 4 && (
        <VStack spacing={8}>
          <Heading>Your Value Ranking</Heading>
          <OrderedList>
            {sortedValues.map((value) => (
              <ListItem key={value}>
                {value} - {valueWins[value] || 0} wins
              </ListItem>
            ))}
          </OrderedList>
          <Button colorScheme="blue" onClick={() => setStep(1)}>
            Start Over
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
