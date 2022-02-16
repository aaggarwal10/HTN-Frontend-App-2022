import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Text,
    Box,
    useDisclosure,
    Flex,
    Input,
    FormControl,
    FormLabel,
    ModalCloseButton,
    FormErrorMessage
} from '@chakra-ui/react'; // Chakra UI
import { Formik, Field, Form } from 'formik';
import { ReactNode, useState } from 'react'; // React JSX Type

type EventDisplayModal = {
    readonly logInStatus: boolean;
    readonly setLogInStatus: (status: boolean) => void;
    readonly children: ReactNode;
};
/**
 * Modal for Cancel Create Request
 * @param type Whether modal is being used for replacement or renewal form
 * @param children ReactNode children elements in component
 */
export default function EventDisplayModal({ logInStatus, setLogInStatus, children }: EventDisplayModal) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [errorMessage, setErrorMessage] = useState('');
    function validateCredentials(values: { username: string, password: string }) {
        if (values.username === 'hacker123' && values.password === 'abcd1234') {
            onClose();
            setLogInStatus(true);
        } else {
            setErrorMessage('Invalid Credentials.');
        }
    }
    function handleOpen() {
        if (logInStatus == true) {
            setLogInStatus(false);
        } else {
            onOpen();
        }
    }
    return (
        <>
            <Box onClick={() => handleOpen()}>{children}</Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text fontWeight={'extrabold'} fontSize={'xl'} marginLeft={1} marginBottom={-3}>Sign In With Your Hacker Account 🔓</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={(values, actions) => {
                                validateCredentials(values);
                                actions.setSubmitting(false);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Box marginX={5}>
                                        <Field name='username' validate={() => { if (errorMessage !== '') setErrorMessage('') }}>
                                            {({ field, form }) => (
                                                <FormControl isRequired isInvalid={errorMessage !== ''}>
                                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                                    <Input {...field} id='username' placeholder='Enter Username (Correct: hacker123)' />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Box marginTop={2}>
                                            <Field name='password' validate={() => { if (errorMessage !== '') setErrorMessage('') }}>
                                                {({ field, form }) => (
                                                    <FormControl isRequired isInvalid={errorMessage !== ''}>
                                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                                        <Input {...field} type='password' id='password' placeholder='Enter Password (Correct: abcd1234)' />
                                                        <FormErrorMessage>{errorMessage}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Box>
                                        <Flex justifyContent={'flex-end'} marginBottom={1}>
                                            <Button
                                                mt={3}
                                                colorScheme='orange'
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                            >
                                                Log in
                                            </Button>
                                        </Flex>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
