import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_EVENTS_QUERY } from '../lib/queries';
import { Button, Flex, Tabs, Tab, TabList, useColorMode, useColorModeValue, Spacer, Image, IconButton, Heading, Input, InputGroup, InputLeftAddon, HStack, Img } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react'
import EventListItem from '../components/EventListItem';
import LoginModal from '../components/LoginModal';
import { LockIcon, MoonIcon, SunIcon, UnlockIcon, SearchIcon } from '@chakra-ui/icons';
import { TEvent, TFilterType } from '../lib/types';
export default function Home(props: { events: TEvent[] }) {
  const { events } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchString, setSearchString] = useState('');
  const handleChange = (event) => setSearchString(event.target.value);
  const [attendingEvents, setAttendingEvents] = useState<number[]>(null);
  const [currentFilter, setCurrentFilter] = useState<TFilterType>(null);
  const [loggedIn, setLogInStatus] = useState<boolean>(null);
  const idEventMap = new Map<number, TEvent>();
  events.forEach((event: TEvent) => idEventMap.set(event.id, event))
  function setActiveFilter(index: number) {
    setCurrentFilter(index);
  }
  function checkActiveFilter(event: TEvent) {
    if (searchString !== '' && !event.name.toLowerCase().includes(searchString.toLowerCase()))
      return false;
    if (event.public_url === '' && loggedIn === false)
      return false;
    if (currentFilter == TFilterType.attending && attendingEvents.includes(event.id))
      return loggedIn;
    return currentFilter === TFilterType.all_events || event.event_type === TFilterType[currentFilter];
  }
  function onAttendClicked(val: number) {
    let updatedEvents = attendingEvents.filter((value) => value !== val);
    if (!attendingEvents.includes(val)) {
      updatedEvents.push(val);
    }
    setAttendingEvents(updatedEvents);
  }
  useEffect(() => {
    if (currentFilter === null && localStorage.getItem('activeTab') !== null) {
      setCurrentFilter(JSON.parse(localStorage.getItem('activeTab')));
    } else if (currentFilter === null) {
      setCurrentFilter(TFilterType.all_events);
    } else {
      localStorage.setItem('activeTab', JSON.stringify(currentFilter));
    }
  }, [currentFilter])
  useEffect(() => {
    if (attendingEvents === null && localStorage.getItem('attendingEvents') !== null) {
      setAttendingEvents(JSON.parse(localStorage.getItem('attendingEvents')));
    } else if (attendingEvents === null) {
      setAttendingEvents([]);
    } else {
      localStorage.setItem('attendingEvents', JSON.stringify(attendingEvents));
    }
  }, [attendingEvents])
  useEffect(() => {
    if (loggedIn === null && localStorage.getItem('loggedInStatus') !== null) {
      setLogInStatus(JSON.parse(localStorage.getItem('loggedInStatus')));
    } else if (attendingEvents === null) {
      setLogInStatus(false);
    } else {
      localStorage.setItem('loggedInStatus', JSON.stringify(loggedIn));
    }
  }, [loggedIn])
  return (
    <>
      <Flex marginY={3}>
        <Box p='2'>
          <HStack ml={{ base: '0', md: '1', lg: '30' }} >
            <Image src={useColorModeValue('/static/darkGlobeIcon.png', '/static/lightGlobeIcon.png')} alt='globe icon' borderRadius='full' boxSize={'80px'} />
            <Heading color={useColorModeValue('orange.600', 'white')} fontSize={{ base: 'xl', md: '3xl', lg: '5xl' }}>Global Hackathon Inc.</Heading>
          </HStack>
        </Box>
        <Spacer />
        <HStack marginTop={-19} marginRight={5}>
          <LoginModal logInStatus={loggedIn} setLogInStatus={setLogInStatus}>
            <Button
              leftIcon={loggedIn ? <UnlockIcon /> : <LockIcon />}
              colorScheme='orange'
              mr='1'
            >
              {loggedIn ? 'Log out' : 'Log in'}
            </Button>
          </LoginModal>
          <IconButton
            aria-label='Change color mode'
            size='md'
            mr={{ base: '0', md: '1', lg: '30' }}
            colorScheme={useColorModeValue('orange', 'gray')}
            variant={useColorModeValue('outline', 'solid')}
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
      <InputGroup size='sm' w='24%' color='white.700' ml={{ base: '1', md: '2', lg: '31' }} marginY={2} border={useColorModeValue('1px black solid', '1px white solid')}>
        <InputLeftAddon children={<SearchIcon />} />
        <Input
          value={searchString}
          onChange={handleChange}
          placeholder='Search for Event'
        />
      </InputGroup>
      <Tabs
        isFitted
        variant='enclosed'
        onChange={(index) => setActiveFilter(index)}
        colorScheme={useColorModeValue('orange', 'gray')}
        index={currentFilter}
      >
        <TabList mb='1em'>
          <Tab fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>All Events</Tab>
          <Tab fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>Workshops</Tab>
          <Tab fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>Activities</Tab>
          <Tab fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>Tech Talks</Tab>
          <Tab fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>Attending</Tab>
        </TabList>
      </Tabs>
      <SimpleGrid spacing={2} marginX={10} marginY={3}>
        {events.map((element, i) =>
          checkActiveFilter(element) &&
          <EventListItem key={i} eventEntry={element} permission={loggedIn ? 'private' : 'public'} attending={attendingEvents ? attendingEvents.includes(element.id) : false} onAttendClicked={onAttendClicked} allEvents={idEventMap} />
        )}
      </SimpleGrid>
    </>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.hackthenorth.com/v3/graphql',
    cache: new InMemoryCache
  });
  const { data } = await client.query({
    query: GET_ALL_EVENTS_QUERY
  });
  const sorted = data.sampleEvents.slice().sort((a, b) => a.start_time - b.start_time)
  return {
    props: {
      events: sorted
    }
  };
}