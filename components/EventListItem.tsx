import { GridItem, Box, Text, Grid, Button, useColorModeValue } from '@chakra-ui/react';
import { TEvent, TPermission } from '../lib/types'
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { formatDateVerbose, formatTimeVerbose } from '../lib/utils/format';
import { useState } from 'react';
import EventDisplayModal from '../components/EventDisplayModal';

type EventListItemProps = {
    eventEntry: TEvent,
    allEvents: Map<number, TEvent>,
    permission: TPermission,
    attending: boolean,
    onAttendClicked: (id: number) => void;
};

export default function EventListItem(props: EventListItemProps) {
    const { eventEntry, allEvents, permission, attending, onAttendClicked } = props;
    const [buttonHoverState, setButtonHoverState] = useState<boolean>(false);
    const urlLink = permission === 'public' ? eventEntry.public_url : eventEntry.private_url;
    const startTime = new Date(eventEntry.start_time);
    const endTime = new Date(eventEntry.end_time);
    let borderCol = '';
    let borderFill = '';
    if (eventEntry.event_type == 'activity') {
        borderCol = useColorModeValue('blue', 'lightblue');
        borderFill = 'lightblue';
    } else if (eventEntry.event_type == 'tech_talk') {
        borderCol = useColorModeValue('orange', 'lightyellow')
        borderFill = 'lightyellow';
    } else {
        borderCol = useColorModeValue('purple', 'pink')
        borderFill = 'purple.100';
    }
    return (
        <EventDisplayModal event={eventEntry} permission={permission} buttonHover={buttonHoverState} urlLink={urlLink} allEvents={allEvents}>
            <GridItem
                display="flex"
                flexDirection="column"
                alignItems={'flex-start'}
                padding="20px 24px 24px"
                border={useColorModeValue('1px white solid', '1px ' + borderCol + ' solid')}
                boxSizing="border-box"
                borderRadius="8px"
                bg={useColorModeValue(borderFill, '')}
                _hover={{
                    background: useColorModeValue("blue.50", "blue.900"),
                    border: useColorModeValue('1px black solid', '1px white solid')
                }}
                onClick={() => { if (!buttonHoverState) console.log("CLICKED") }}
            >
                <Grid templateColumns='repeat(4, 1fr)' gap={6} w="100%" alignItems={'center'} justifyItems={'flex-end'}>
                    <Text as="h5" fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} textStyle="display-small-semibold" justifySelf={'flex-start'}>
                        {eventEntry.name}
                    </Text>
                    <Box>
                        <CalendarIcon marginTop={-1} /> {formatDateVerbose(startTime)}
                    </Box>
                    <Box>
                        <TimeIcon marginTop={-1} /> {formatTimeVerbose(startTime) + ' - ' + formatTimeVerbose(endTime)}
                    </Box>
                    {permission == 'private' &&
                        <Button w={{ base: '90%', md: '80%', lg: '50%' }} colorScheme={attending ? 'red' : 'green'} variant={attending ? 'solid' : 'outline'} onClick={() => onAttendClicked(eventEntry.id)} onMouseEnter={() => setButtonHoverState(true)} onMouseLeave={() => setButtonHoverState(false)}>
                            {attending ? 'Stop Attending' : 'Attend'}
                        </Button>}
                    {permission == 'public' &&
                        <Button w={{ base: '90%', md: '80%', lg: '50%' }} colorScheme={useColorModeValue('orange', 'white')} variant={'outline'}>
                            {'Go To Event'}
                        </Button>
                    }
                </Grid>
            </GridItem >
        </EventDisplayModal>
    );
}