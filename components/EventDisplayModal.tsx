import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    Box,
    HStack,
    SimpleGrid,
    Image,
    Center,
    VStack,
    Heading,
    Flex,
    Tag,
    ModalCloseButton,
    useColorModeValue,
} from '@chakra-ui/react'; // Chakra UI
import { useState } from 'react'; // React JSX Type
import { TEvent, TPermission, TEventType } from '../lib/types';
import { formatDateTimeVerbose, formatTimeVerbose } from '../lib/utils/format';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
type EventDisplayModal = {
    readonly event: TEvent;
    readonly allEvents: Map<number, TEvent>;
    readonly permission: TPermission;
    readonly urlLink: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;

};
/**
 * Modal for Cancel Create Request
 * @param type Whether modal is being used for replacement or renewal form
 * @param children ReactNode children elements in component
 */
export default function EventDisplayModal({ event, permission, urlLink, isOpen, onClose, allEvents }: EventDisplayModal) {
    const [displayEvent, setDisplayEvent] = useState<TEvent>(event);
    const [displayLink, setDisplayLink] = useState(urlLink);
    const [relatedEvents, setRelatedEvents] = useState<number[]>([]);
    // useEffect(() => updateRelatedEvents(), [displayEvent]);
    const verboseTypes = new Map<TEventType, string>([
        ['workshop', 'Workshop'],
        ['activity', 'Activity'],
        ['tech_talk', 'Tech Talk']
    ]);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    function updateRelatedEvents() {
        let relEvents = [];
        displayEvent.related_events.forEach((relatedId: number) => {
            if (permission !== 'public' || allEvents.get(relatedId).public_url !== '')
                relEvents.push(relatedId)
        })
        setRelatedEvents(relEvents);
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { setDisplayEvent(event); setDisplayLink(urlLink); onClose(); }} isCentered size='full'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader marginX={{ base: 5, md: 20, lg: 40 }}>
                        <Text fontWeight={'extrabold'} fontSize={'3xl'}> {displayEvent.name} ({verboseTypes.get(displayEvent.event_type)})</Text>
                        <Text fontSize={'xl'}> {formatDateTimeVerbose(new Date(displayEvent.start_time))} - {formatTimeVerbose(new Date(displayEvent.end_time))}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textStyle="body-regular" paddingBottom="39px" marginX={{ base: 5, md: 20, lg: 40 }}>
                            {displayEvent.description}
                        </Text>
                        {displayEvent.speakers.length > 0 &&
                            <>
                                <Text textAlign={'center'} marginTop={-4} marginBottom={7} fontWeight={'bold'} fontSize={'3xl'}> 🤝 Meet The Speakers 🤝 </Text>
                                <VStack justifyItems={'center'}>
                                    <SimpleGrid spacing='40px'>
                                        {displayEvent.speakers.map((speaker, index) =>
                                            <Box key={index}>
                                                <Center>
                                                    <VStack>
                                                        <Image
                                                            align={'center'}
                                                            src={speaker.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                                            alt={speaker.name + ' picture'}
                                                            borderRadius='full'
                                                            boxSize='150'
                                                        />
                                                        <Text fontSize={'xl'}>{speaker.name}</Text>
                                                    </VStack>
                                                </Center>

                                            </Box>
                                        )}
                                    </SimpleGrid>
                                </VStack>
                            </>
                        }
                        {displayEvent.related_events.filter(relatedId => permission !== 'public' || allEvents.get(relatedId).public_url !== '').length > 0 && (
                            <>
                                <Text textAlign={'center'} marginTop={8} fontWeight={'bold'} fontSize={'3xl'}> 📆 Related Events 📆 </Text>
                                <Carousel responsive={responsive}>
                                    {displayEvent.related_events.filter(relatedId => permission !== 'public' || allEvents.get(relatedId).public_url !== '').map((relatedId: number) => {
                                        const relatedEvent = allEvents.get(relatedId);
                                        const shadowCol = useColorModeValue('rgba(0,0,0,0.23)', 'rgba(255,255,255,0.23)');
                                        const newLink = permission == 'public' ? relatedEvent.public_url : relatedEvent.private_url;
                                        return (
                                            <Flex
                                                key={relatedId}
                                                boxShadow={shadowCol + " 0px 3px 6px, " + shadowCol + " 0px 3px 6px"}
                                                justifyContent="space-between"
                                                flexDirection="column"
                                                overflow="hidden"
                                                rounded={5}
                                                flex={1}
                                                p={5}
                                                marginX={{ base: 20, md: 100, lg: 200 }}
                                                marginY={10}
                                            >
                                                <VStack mb={6}>
                                                    <Heading
                                                        fontSize={{ base: "xl", md: "2xl" }}
                                                        textAlign="left"
                                                        w="full"
                                                        mb={2}
                                                    >
                                                        {relatedEvent.name}
                                                    </Heading>
                                                    <Text w="full">{relatedEvent.description}</Text>
                                                </VStack>

                                                <Flex justifyContent="space-between">
                                                    <HStack spacing={2}>
                                                        <Tag size="sm" variant="outline" colorScheme="orange">
                                                            {verboseTypes.get(relatedEvent.event_type)}
                                                        </Tag>
                                                        <Tag size="sm" variant="outline" colorScheme="orange">
                                                            <Text isTruncated maxWidth={{ base: 20, md: 100, lg: 500 }} size="sm" variant="outline" colorScheme="orange">
                                                                {formatDateTimeVerbose(new Date(relatedEvent.start_time))} - {formatTimeVerbose(new Date(relatedEvent.end_time))}
                                                            </Text>
                                                        </Tag>
                                                    </HStack>
                                                    <Button
                                                        colorScheme="orange"
                                                        fontWeight="bold"
                                                        size="sm"
                                                        onClick={() => {
                                                            setDisplayEvent(relatedEvent);
                                                            setDisplayLink(newLink);
                                                            updateRelatedEvents();
                                                        }}
                                                    >
                                                        Go To Event
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        );
                                    })}

                                </Carousel>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={'orange'}
                            variant={'outline'}
                            marginRight={3}
                            onClick={() => { setDisplayEvent(event); setDisplayLink(urlLink); onClose(); }}
                        >
                            <Text textStyle="button-semibold">Close</Text>
                        </Button>
                        <a target={'_blank'} href={displayLink}>
                            <Button
                                colorScheme={'orange'}
                                onClick={() => { onClose }}
                            >
                                <Text textStyle="button-semibold">Join Event</Text>
                            </Button>
                        </a>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
