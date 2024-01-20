'use client'

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

interface Props {
    children: React.ReactNode
}

const Links: string[] = [];

const NavLink = (props: Props) => {
    const { children } = props
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function WithAction() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    <Box>SwiftPlot</Box>
                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (<NavLink key={link}>{link}</NavLink>))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<FaGithub />}>{'View on GitHub'}</Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    )
}