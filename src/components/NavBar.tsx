'use client'

import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa'

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
                    <Button variant={'solid'} colorScheme={'teal'} size={'sm'} mr={4} leftIcon={<FaGithub />}>{'View on GitHub'}</Button>
                </Flex>
            </Flex>
        </Box>
    )
}